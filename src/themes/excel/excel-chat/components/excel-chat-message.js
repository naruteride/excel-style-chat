import { authService } from "/src/api/firebase.js";

export default class ExcelChatMessage extends HTMLTableRowElement {
	static get observedAttributes() { return ["text", "author", "uid", "timestamp"]; }

	connectedCallback() {
		this.render();
	}

	render() {
		const index = this.getAttribute("index") || "0";
		const text = this.getAttribute("text") || "";
		const author = this.getAttribute("author") || "Unknown";
		const uid = this.getAttribute("uid");
		const timestamp = this.getAttribute("timestamp");
		const currentUser = authService.getCurrentUser();
		const isMe = currentUser && currentUser.uid == uid;

		// --- Fake Data Generation ---

		// 1. Group: "컨텐츠", "기획", "개발", "" (High chance)
		const groups = ["", "", "", "", "", "컨텐츠", "기획", "개발"];
		const group = groups[Math.floor(Math.random() * groups.length)];
		const isBoldGroup = group && Math.random() < 0.2; // Rare bold

		// 2. Tasks: 0~3 random items from set
		const taskOptions = ["기획", "UI/UX", "디자인", "프론트", "백엔드"];
		const taskCount = Math.floor(Math.random() * 4); // 0 to 3
		const tasks = [];
		for (let i = 0; i < taskCount; i++) {
			tasks.push(taskOptions[Math.floor(Math.random() * taskOptions.length)]);
		}
		const taskStr = [...new Set(tasks)].join(", "); // Remove duplicates

		// 3. Duration: 1/8 chance
		const durationOptions = ["1일", "2일", "3일", "4일", "5일", "1주일", "2주일"];
		let duration = "";
		if (Math.random() < 0.125) {
			duration = durationOptions[Math.floor(Math.random() * durationOptions.length)];
		}

		// 4. Month: Current Month
		const month = new Date().getMonth() + 1 + "월";

		// 5. Week: 0~2 items from 1~5 weeks
		const weekOptions = ["1주차", "2주차", "3주차", "4주차", "5주차"];
		const weekCount = Math.floor(Math.random() * 3); // 0 to 2
		const weeks = [];
		for (let i = 0; i < weekCount; i++) {
			weeks.push(weekOptions[Math.floor(Math.random() * weekOptions.length)]);
		}
		const weekStr = [...new Set(weeks)].sort().join(", ");

		this.innerHTML = `
			<!-- 1. Index -->
			<th>${index}</th>

			<!-- 2. ID (Timestamp) -->
			<th>${formatTimestamp(timestamp)}</th>
			
			<!-- 3. Group -->
			<td style="${isBoldGroup ? 'font-weight: bold;' : ''}">${group}</td>
			
			<!-- 4. Channel (User Name) -->
			<td style="padding-right: 1rem;">${author}</td>
			
			<!-- 5. Channel (Message) -->
			<td style="padding-right: 1rem; white-space: normal; word-break: keep-all;">${text}</td>
			
			<!-- 6. Task -->
			<td style="padding-right: 1rem;">${taskStr}</td>
			
			<!-- 7. Duration -->
			<td style="padding-right: 1rem;">${duration}</td>
			
			<!-- 8. Month -->
			<td style="text-align: center;">${month}</td>
			
			<!-- 9. Week -->
			<td style="padding-right: 1rem;">${weekStr}</td>
		`;
	}
}
customElements.define("excel-chat-message", ExcelChatMessage, { extends: "tr" });

function formatTimestamp(firestoreTimestamp) {
	const date = firestoreTimestamp.toDate();
	const yy = String(date.getFullYear()).slice(-2);
	const MM = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const HH = String(date.getHours()).padStart(2, '0');
	const mm = String(date.getMinutes()).padStart(2, '0');
	const ss = String(date.getSeconds()).padStart(2, '0');

	return `${yy}${MM}${dd}${HH}${mm}${ss}`;
}