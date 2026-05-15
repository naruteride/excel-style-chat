import { authService, chatService } from "/src/api/firebase.js";

export default class ExcelChatInput extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; align-items: center; padding: 0.375rem 2.875rem 0;"
		this.innerHTML = `
			<form id="form-input" style="display: contents;">
				<button type="submit" style="border-radius: 100px; font: 500 14px / 32px Google Sans, Roboto, sans-serif; color: #0b57d0; line-height: 2rem; padding: 0 0.75rem;">하단에</button>
				<input type="text" id="msg-input" placeholder="1000" autocomplete="off" style="field-sizing: content; border-radius: 0.25rem; min-width: 2.5rem; padding: 0.125rem 0.5rem; font-size: 14px; vertical-align: middle; border: 1px solid #d9d9d9; line-height: 25px;" />
				<button type="submit" style="color: #444746; font-size: 14px; padding: 0.125rem 0.5rem;">개의 행 추가</button>
			</form>`;

		const input = this.querySelector("#msg-input");
		const sendMessage = async () => {
			const text = input.value;
			const roomName = this.getAttribute("room");
			if (!text.trim() || !roomName) return;

			let user;
			try {
				user = await authService.ensureAnonymousUser();
			} catch (error) {
				console.error("Unable to sign in anonymously: ", error);
				alert("Unable to join anonymously. Please try again.");
				return;
			}

			try {
				await chatService.sendMessage(roomName, text, user);
				input.value = "";
			} catch (error) {
				console.error("Unable to send message: ", error);
			}
		};

		this.querySelector("#form-input")?.addEventListener("submit", (e) => {
			e.preventDefault();
			sendMessage();
		});
	}
}

customElements.define("excel-chat-input", ExcelChatInput);
