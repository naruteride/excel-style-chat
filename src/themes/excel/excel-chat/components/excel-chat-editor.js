import { chatService } from "/src/api/firebase.js";
import "./excel-chat-message.js";
import "../../components/excel-table.js";

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
			<table is="excel-table">
				<thead>
					<tr>
						<th style="min-width: 2.5em;"></th>
						<th style="padding-inline: 0.25em;">업무(그룹)</th>
						<th style="padding-inline: 0.25em;">채널</th>
						<th style="padding-inline: 0.25em;">채널</th>
						<th style="padding-inline: 0.25em;">작업</th>
						<th style="padding-inline: 0.25em;">진행 소요일</th>
						<th style="padding-inline: 0.25em;">월 구분</th>
						<th style="padding-inline: 0.25em;">진행 주</th>
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

		let currentIndex = 1;

		this.messages.forEach(msg => {
			const element = document.createElement("tr", { is: "excel-chat-message" });

			element.setAttribute("index", currentIndex);
			currentIndex += 1;
			if (currentIndex > 999) currentIndex = 1;

			element.setAttribute("text", msg.text);
			element.setAttribute("author", msg.displayName);
			element.setAttribute("uid", msg.uid);
			messageList.appendChild(element);
		});
		this.scrollTop = this.scrollHeight;
	}
}

customElements.define("excel-chat-editor", ExcelChatEditor, { extends: "main" });