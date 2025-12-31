import BaseComponent from "/src/components/base-component.js";
import { authService } from "/src/api/firebase.js";

export default class ExcelChatMessage extends BaseComponent {
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
		if (isMe) this.style.backgroundColor = "rgba(44, 44, 44, 0.02)"; // Highlight my lines slightly

		this.innerHTML = `
			<span style="color: #858585; width: 40px; text-align: right; margin-right: 15px; user-select: none;">${lineNumber}</span>
			<span style="color: #569cd6; margin-right: 10px;">${author}:</span>
			<span style="color: #ce9178;">"${text}"</span> 
		`;
	}
}
customElements.define("excel-chat-message", ExcelChatMessage);
