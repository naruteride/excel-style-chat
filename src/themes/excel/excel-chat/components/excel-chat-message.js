import BaseComponent from "/src/components/base-component.js";
import { authService } from "/src/api/firebase.js";

export default class ExcelChatMessage extends BaseComponent {
	static get observedAttributes() { return ["text", "author", "uid", "timestamp"]; }

	render() {
		const text = this.getAttribute("text") || "";
		const author = this.getAttribute("author") || "Unknown";
		const uid = this.getAttribute("uid");
		const index = this.getAttribute("index") || "0";
		const currentUser = authService.getCurrentUser();
		const isMe = currentUser && currentUser.uid == uid;

		this.style.cssText = "display: table-row; background-color: #fff;";
		if (isMe) {
			// Optional: subtle highlight for own messages if needed, 
			// though Excel usually doesn't highlight rows based on user unless filters are on.
			// Let's keep it clean white or very subtle.
			this.style.backgroundColor = "rgba(44, 44, 44, 0.02)";
		}

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


		// Common Cell Style
		const cellStyle = "display: table-cell; border: 1px solid #e0e0e0; vertical-align: middle; padding: 4px 8px; color: #333;";
		const indexStyle = "display: table-cell; border: 1px solid #e0e0e0; vertical-align: middle; text-align: center; background-color: #f3f3f3; color: #666; font-weight: bold;";

		this.innerHTML = `
			<!-- 1. Index -->
			<div style="${indexStyle}">${index}</div>
			
			<!-- 2. Group -->
			<div style="${cellStyle} ${isBoldGroup ? 'font-weight: bold;' : ''}">${group}</div>
			
			<!-- 3. Channel (User Name) -->
			<div style="${cellStyle} text-align: center;">${author}</div>
			
			<!-- 4. Channel (Message) -->
			<div style="${cellStyle} text-align: left;">${text}</div>
			
			<!-- 5. Task -->
			<div style="${cellStyle}">${taskStr}</div>
			
			<!-- 6. Duration -->
			<div style="${cellStyle} text-align: center;">${duration}</div>
			
			<!-- 7. Month -->
			<div style="${cellStyle} text-align: center;">${month}</div>
			
			<!-- 8. Week -->
			<div style="${cellStyle}">${weekStr}</div>
		`;
	}
}
customElements.define("excel-chat-message", ExcelChatMessage);
