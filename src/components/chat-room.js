import BaseComponent from "./base-component.js";
import { chatService, authService } from "../api/firebase.js";
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
			this.unsubscribeMessages = chatService.subscribeToRoom(this.roomName, (msgs) => {
				this.messages = msgs;
				this.updateMessageList();
			});
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.unsubscribeMessages) {
			this.unsubscribeMessages();
		}
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
					<input type="text" id="msg-input" placeholder="Type a message..." style="${inputStyle}" />
					<button id="btn-send" style="${btnStyle}">Send</button>
				</div>
			</div>
        `;

		// Attach event listeners
		const btnSend = this.querySelector("#btn-send");
		const input = this.querySelector("#msg-input");

		const sendMessage = () => {
			const text = input.value;
			const user = authService.getCurrentUser();
			if (text && user) {
				chatService.sendMessage(this.roomName, text, user);
				input.value = "";
			} else if (!user) {
				alert("Please login first!");
				// Optionally redirect or show login
			}
		};

		btnSend.addEventListener("click", sendMessage);
		input.addEventListener("keypress", (e) => {
			if (e.key == "Enter") sendMessage();
		});

		// Initial populate if we already have messages (re-render case)
		this.updateMessageList();
	}

	updateMessageList() {
		const list = this.querySelector("#message-list");
		if (!list) return;

		list.innerHTML = ""; // Full redraw is simple but expensive. optimization later if needed.

		this.messages.forEach(msg => {
			const el = document.createElement("chat-message");
			el.setAttribute("text", msg.text);
			el.setAttribute("author", msg.displayName);
			el.setAttribute("uid", msg.uid);
			list.appendChild(el);
		});

		// Auto scroll
		list.scrollTop = list.scrollHeight;
	}
}

customElements.define("chat-room", ChatRoom);
