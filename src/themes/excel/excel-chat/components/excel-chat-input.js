import { authService, chatService } from "/src/api/firebase.js";

export default class ExcelChatInput extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; align-items: center; padding: 0.375rem 2.875rem 0;"
		this.innerHTML = `
			<button style="border-radius: 100px; font: 500 14px / 32px Google Sans, Roboto, sans-serif; color: #0b57d0; line-height: 2rem; padding: 0 0.75rem;">하단에</button>
			<input type="text" id="msg-input" placeholder="1000" style="border-radius: 0.25rem; min-width: 2.5rem; padding: 0.125rem 0.5rem; font-size: 14px; vertical-align: middle; border: 1px solid #d9d9d9;" />
			<button style="color: #444746; font-size: 14px; padding: 0.125rem 0.5rem;">개의 행 추가</button>
		`;

		const input = this.querySelector("#msg-input");
		const sendMessage = () => {
			const text = input.value;
			const user = authService.getCurrentUser();
			const roomName = this.getAttribute("room");

			if (text && user && roomName) {
				chatService.sendMessage(roomName, text, user);
				input.value = "";
			} else if (!user) {
				alert("로그인 후에 사용해주세요.");
			}
		};

		input.addEventListener("keypress", (e) => {
			if (e.key == "Enter") sendMessage();
		});
	}
}

customElements.define("excel-chat-input", ExcelChatInput);