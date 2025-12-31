import { authService, chatService } from "/src/api/firebase.js";
import "./excel-chat-message.js";

// ExcelChatMessage is defined here or imported. Since it was in the index file, 
// and logic is moved here, we should probably define it here or import it if separated.
// For now, I'll rely on it being defined or define it here if needed. 
// However, the user asked to move "functionalities", so I will include the message rendering logic here.
// And since ExcelChatMessage was defined in index.js, I should probably move its definition here or to a separate file.
// The user didn't explicitly ask for a separate file for ExcelChatMessage, but it's used by Editor.
// I will assume ExcelChatMessage is available or I should move it. 
// The prompt said: "move chat related functionalities to editor and input".
// I'll render the logic here.

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
		this.innerHTML = ""; // Initial empty state, updated by subscription
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