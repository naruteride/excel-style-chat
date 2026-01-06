import { chatService } from "/src/api/firebase.js";
import ExcelChatMessage from "./excel-chat-message.js";
import ExcelTable, { ExcelThead, ExcelCrossedTh } from "../../components/excel-table.js";

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
		this.style.cssText = "flex: 1; overflow: auto;";
		this.innerHTML = `
			<table is="excel-table">
				<thead is="excel-thead">
					<tr>
						<th is="excel-crossed-th"></th>
						<th style="padding-inline: 0.25em;">A</th>
						<th style="padding-inline: 0.25em;">B</th>
						<th style="padding-inline: 0.25em;">C</th>
						<th style="padding-inline: 0.25em;">D</th>
						<th style="padding-inline: 0.25em;">E</th>
						<th style="padding-inline: 0.25em;">F</th>
						<th style="padding-inline: 0.25em;">G</th>
					</tr>
					<tr style="font-weight: bold;">
						<th style="min-width: 2.5em;">1</th>
						<td style="padding-inline: 0.25em;">업무(그룹)</td>
						<td style="padding-inline: 0.25em;">채널</td>
						<td style="padding-inline: 0.25em;">채널</td>
						<td style="padding-inline: 0.25em;">작업</td>
						<td style="padding-inline: 0.25em;">진행 소요일</td>
						<td style="padding-inline: 0.25em;">월 구분</td>
						<td style="padding-inline: 0.25em;">진행 주</td>
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

		let currentIndex = 2;

		this.messages.forEach(msg => {
			const element = document.createElement("tr", { is: "excel-chat-message" });

			element.setAttribute("index", currentIndex);
			currentIndex += 1;
			if (currentIndex > 999) currentIndex = 2;

			element.setAttribute("text", msg.text);
			element.setAttribute("author", msg.displayName);
			element.setAttribute("uid", msg.uid);
			messageList.appendChild(element);
		});
		this.scrollTop = this.scrollHeight;
	}
}

customElements.define("excel-chat-editor", ExcelChatEditor, { extends: "main" });