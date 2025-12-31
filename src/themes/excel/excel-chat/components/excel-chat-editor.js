import { authService, chatService } from "/src/api/firebase.js";
import "./excel-chat-message.js";

export default class ExcelChatEditor extends HTMLElement {
	constructor() {
		super();
		this.messages = [];
		this.unsubscribeMessages = null;
	}

	connectedCallback() {
		this.render();
		this.roomName = this.getAttribute("room");
		if (this.roomName) {
			this.unsubscribeMessages = chatService.subscribeToRoom(this.roomName, (msgs) => {
				this.messages = msgs;
				this.updateMessageList();
			});
		}
	}

	disconnectedCallback() {
		if (this.unsubscribeMessages) this.unsubscribeMessages();
	}

	render() {
		this.id = "message-list";
		this.style.cssText = "flex: 1; overflow: hidden scroll;";
		this.innerHTML = "";
	}

	updateMessageList() {
		this.innerHTML = "";
		this.messages.forEach(msg => {
			const element = document.createElement("excel-chat-message");
			element.setAttribute("text", msg.text);
			element.setAttribute("author", msg.displayName);
			element.setAttribute("uid", msg.uid);
			this.appendChild(element);
		});
		this.scrollTop = this.scrollHeight;
	}
}

customElements.define("excel-chat-editor", ExcelChatEditor, { extends: "main" });