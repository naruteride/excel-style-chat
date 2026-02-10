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

		// --- 가짜 데이터 생성 ---

		// 1. 업무(그룹): "컨텐츠", "기획", "개발", "" (공백은 높은 확률)
		const groups = ["", "", "", "", "", "컨텐츠", "기획", "개발"];
		const group = groups[Math.floor(Math.random() * groups.length)];
		const isBoldGroup = group && Math.random() < 0.2; // 가끔 bold

		// 2. 작업: 0~3개 랜덤
		const taskOptions = ["기획", "UI/UX", "디자인", "프론트", "백엔드"];
		const taskCount = Math.floor(Math.random() * 4); // 0~3
		const tasks = [];
		for (let i = 0; i < taskCount; i++) {
			tasks.push(taskOptions[Math.floor(Math.random() * taskOptions.length)]);
		}
		const taskStr = [...new Set(tasks)].join(", "); // 중복 제거

		// 3. 진행 소요일: 1/8 확률
		const durationOptions = ["1일", "2일", "3일", "4일", "5일", "1주일", "2주일"];
		let duration = "";
		if (Math.random() < 0.125) {
			duration = durationOptions[Math.floor(Math.random() * durationOptions.length)];
		}

		// 4. 월 구분: 현재 월
		const month = new Date().getMonth() + 1 + "월";

		// 5. 진행 주: 1~5주 중 0~2개
		const weekOptions = ["1주차", "2주차", "3주차", "4주차", "5주차"];
		const weekCount = Math.floor(Math.random() * 3); // 0~2
		const weeks = [];
		for (let i = 0; i < weekCount; i++) {
			weeks.push(weekOptions[Math.floor(Math.random() * weekOptions.length)]);
		}
		const weekStr = [...new Set(weeks)].sort().join(", ");

		this.innerHTML = `
			<!-- 1. Index -->
			<th>${index}</th>

			<!-- 2. ID (Timestamp) -->
			<td style="text-align: right;">${formatTimestamp(timestamp)}</td>
			
			<!-- 3. 업무(그룹) -->
			<td style="${isBoldGroup ? 'font-weight: bold;' : ''}">${group}</td>
			
			<!-- 4. 채널 (유저 이름) -->
			<td style="padding-right: 1rem;">${author}</td>
			
			<!-- 5. 채널 (메시지) -->
			<td style="padding-right: 1rem; white-space: normal; word-break: keep-all;">${text}</td>
			
			<!-- 6. 작업 -->
			<td style="padding-right: 1rem;">${taskStr}</td>
			
			<!-- 7. 진행 소요일 -->
			<td style="padding-right: 1rem;">${duration}</td>
			
			<!-- 8. 월 구분 -->
			<td style="text-align: center;">${month}</td>
			
			<!-- 9. 진행 주 -->
			<td style="padding-right: 1rem;">${weekStr}</td>
		`;
	}
}
customElements.define("excel-chat-message", ExcelChatMessage, { extends: "tr" });

function formatTimestamp(timestamp) {
	timestamp = new Date(timestamp);
	const yy = String(timestamp.getFullYear()).slice(-2);
	const MM = String(timestamp.getMonth() + 1).padStart(2, '0');
	const dd = String(timestamp.getDate()).padStart(2, '0');
	const HH = String(timestamp.getHours()).padStart(2, '0');
	const mm = String(timestamp.getMinutes()).padStart(2, '0');
	const ss = String(timestamp.getSeconds()).padStart(2, '0');

	return `${yy}${MM}${dd}${HH}${mm}${ss}`;
}