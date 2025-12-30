import BaseComponent from "../../../components/base-component.js";
import { chatService, authService } from "../../../api/firebase.js";
import ExcelHeader from "../components/excel-header.js";

export default class ExcelChat extends BaseComponent {
	constructor() {
		super();
		this.messages = [];
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
		if (this.unsubscribeMessages) this.unsubscribeMessages();
	}

	render() {
		// Excel Editor Layout
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; height: 100%; width: 100%;";
		this.innerHTML = `
			<header is="excel-header" room="${this.roomName}"></header>

			<!-- Editor Area (Messages) -->
			<div id="message-list" style="flex: 1; overflow-y: auto; padding: 10px 0;">
				<!-- Messages injected here -->
			</div>

			<!-- Terminal / Input Area -->
			<div style="border-top: 1px solid #3c3c3c;">
				<div style="background: #1e1e1e; padding: 5px 15px; font-size: 11px; color: #d4d4d4; text-transform: uppercase; font-weight: bold; display: flex; gap: 15px;">
					<span style="border-bottom: 1px solid white;">Terminal</span>
					<span style="opacity: 0.5;">Output</span>
					<span style="opacity: 0.5;">Debug Console</span>
				</div>
				<div style="padding: 10px; background: #1e1e1e; display: flex; align-items: center;">
					<span style="color: #00ff00; margin-right: 10px;">➜  ~</span>
					<input type="text" id="msg-input" placeholder="console.log('your message')..." 
						style="flex: 1; background: transparent; border: none; color: #d4d4d4; font-family: Consolas, monospace; outline: none;" />
				</div>
			</div>
        `;

		const input = this.querySelector("#msg-input");
		const sendMessage = () => {
			const text = input.value;
			const user = authService.getCurrentUser();
			if (text && user) {
				chatService.sendMessage(this.roomName, text, user);
				input.value = "";
			} else if (!user) {
				alert("Please login first needed for terminal access.");
			}
		};

		input.addEventListener("keypress", (e) => {
			if (e.key == "Enter") sendMessage();
		});

		this.updateMessageList();
	}

	updateMessageList() {
		const list = this.querySelector("#message-list");
		if (!list) return;
		list.innerHTML = "";

		this.messages.forEach(msg => {
			const element = document.createElement("excel-chat-message");
			element.setAttribute("text", msg.text);
			element.setAttribute("author", msg.displayName);
			element.setAttribute("uid", msg.uid);
			list.appendChild(element);
		});
		list.scrollTop = list.scrollHeight;
	}
}

customElements.define("excel-chat", ExcelChat);


class ExcelChatMessage extends BaseComponent {
	static get observedAttributes() { return ["text", "author", "uid", "timestamp"]; }

	render() {
		const text = this.getAttribute("text") || "";
		const author = this.getAttribute("author") || "Unknown";
		const uid = this.getAttribute("uid");
		const currentUser = authService.getCurrentUser();
		const isMe = currentUser && currentUser.uid == uid;

		// Excel style: Line numbers + Code look
		const lineNumber = Math.floor(Math.random() * 1000); // Fake line number for effect


		this.style.cssText = "display: flex; font-family: Consolas, monospace; font-size: 14px; line-height: 1.5; color: #d4d4d4; padding: 0 5px;";
		if (isMe) this.style.backgroundColor = "#2c2c2c"; // Highlight my lines slightly

		this.innerHTML = `
			<span style="color: #858585; width: 40px; text-align: right; margin-right: 15px; user-select: none;">${lineNumber}</span>
			<span style="color: #569cd6; margin-right: 10px;">${author}:</span>
			<span style="color: #ce9178;">"${text}"</span> 
        `;
	}
}
customElements.define("excel-chat-message", ExcelChatMessage);