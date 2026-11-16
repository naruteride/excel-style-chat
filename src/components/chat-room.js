import BaseComponent from "./base-component.js";
import { chatService } from "../api/firebase.js";
import setupChatInput from "../utils/chat-input.js";
import chatOutbox from "../utils/chat-outbox.js";
import "./chat-message.js";

export default class ChatRoom extends BaseComponent {
	constructor() {
		super();
		this.messages = [];
		this.roomName = null;
		this.unsubscribeMessages = null;
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		super.connectedCallback();

		if (this.roomName) {
			this.unsubscribeOutbox = chatOutbox.subscribe(this.roomName, () => this.updateMessageList());
			this.unsubscribeMessages = chatService.subscribeToRoom(this.roomName, (msgs) => {
				this.messages = msgs;
				chatOutbox.confirmMessages(this.roomName, msgs);
				this.updateMessageList();
			});
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.unsubscribeMessages) {
			this.unsubscribeMessages();
		}
		this.unsubscribeOutbox?.();
		this.unsubscribeOutbox = null;
	}

	render() {
		// Main container style
		const containerStyle = this.theme.components?.chatRoomContainer || "display: flex; flex-direction: column; height: 100%;";
		const listStyle = this.theme.components?.messageList || "flex: 1; overflow-y: auto; padding: 10px;";
		const inputAreaStyle = this.theme.components?.inputArea || "padding: 10px; border-top: 1px solid #ccc; display: flex;";
		const inputStyle = this.theme.components?.inputField || "flex: 1; padding: 5px;";
		const btnStyle = this.theme.components?.sendButton || "margin-left: 5px; padding: 5px 10px;";

		this.innerHTML = `
			<div style="${containerStyle}">
				<div id="message-list" style="${listStyle}">
					<!-- Messages go here -->
				</div>
				<div style="${inputAreaStyle}">
					<textarea id="msg-input" rows="1" placeholder="Type a message..." aria-label="Message" title="Enter to send, Shift+Enter for a new line" style="${inputStyle} min-width: 0; box-sizing: border-box; font: inherit; resize: none;"></textarea>
					<button id="btn-send" style="${btnStyle}">Send</button>
				</div>
			</div>
        `;

		// Attach event listeners
		const btnSend = this.querySelector("#btn-send");
		const input = this.querySelector("#msg-input");
		this.querySelector("#message-list").addEventListener("click", (event) => {
			const button = event.target.closest("[data-retry-message]");
			if (button) chatOutbox.retryMessage(button.dataset.retryMessage);
		});

		const sendMessage = () => {
			const text = input.value;
			if (!text.trim() || !this.roomName) return;

			chatOutbox.sendMessage(this.roomName, text);
			input.value = "";
			input.dispatchEvent(new Event("input"));
		};

		btnSend.addEventListener("click", sendMessage);
		setupChatInput(input, sendMessage);

		// Initial populate if we already have messages (re-render case)
		this.updateMessageList();
	}

	updateMessageList() {
		const list = this.querySelector("#message-list");
		if (!list) return;

		list.innerHTML = ""; // Full redraw is simple but expensive. optimization later if needed.

		chatOutbox.getMessages(this.roomName, this.messages).forEach(msg => {
			const row = document.createElement("div");
			row.dataset.messageId = msg.id;
			const el = document.createElement("chat-message");
			el.setAttribute("text", msg.text);
			el.setAttribute("author", msg.displayName);
			el.setAttribute("uid", msg.uid);
			row.appendChild(el);
			if (msg.status == "sending" || msg.status == "failed") {
				const status = document.createElement("span");
				status.setAttribute("role", "status");
				status.style.cssText = "margin-left: 0.5rem; font-size: 12px;";
				status.textContent = msg.status == "sending" ? "전송 중…" : "전송 실패";
				row.appendChild(status);
				if (msg.status == "failed") {
					const button = document.createElement("button");
					button.type = "button";
					button.dataset.retryMessage = msg.id;
					button.style.cssText = "margin-left: 0.5rem; padding: 0; font-size: 12px; text-decoration: underline;";
					button.textContent = "재시도";
					row.appendChild(button);
				}
			}
			list.appendChild(row);
		});

		// Auto scroll
		list.scrollTop = list.scrollHeight;
	}
}

customElements.define("chat-room", ChatRoom);
