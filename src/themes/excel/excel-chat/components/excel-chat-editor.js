import { chatService } from "/src/api/firebase.js";
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
		this.style.cssText = "flex: 1; overflow: hidden scroll;";
		this.innerHTML = `
			<table style="width: 100%;">
				<thead>
					<tr>
						<th></th>
						<th>업무(그룹)</th>
						<th>채널</th>
						<th>채널</th>
						<th>작업</th>
						<th>진행 소요일</th>
						<th>월 구분</th>
						<th>진행 주</th>
					</tr>
				</thead>
				<tbody id="message-list">
				</tbody>
			</table>
		`;
	}

	updateMessageList() {
		const messageList = this.querySelector("#message-list");
		messageList.innerHTML = "";
		this.messages.forEach(msg => {
			const element = document.createElement("tr", { is: "excel-chat-message" });
			element.setAttribute("index", msg.index);
			element.setAttribute("text", msg.text);
			element.setAttribute("author", msg.displayName);
			element.setAttribute("uid", msg.uid);
			messageList.appendChild(element);
		});
		this.scrollTop = this.scrollHeight;
	}
}

customElements.define("excel-chat-editor", ExcelChatEditor, { extends: "main" });