import { chatService } from "/src/api/firebase.js";
import setupChatInput from "/src/utils/chat-input.js";

export default class ExcelChatInput extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; align-items: center; padding: 0.375rem 2.875rem 0;"
		this.innerHTML = `
			<form id="form-input" style="display: contents;">
				<button type="submit" style="border-radius: 100px; font: 500 14px / 32px Google Sans, Roboto, sans-serif; color: #0b57d0; line-height: 2rem; padding: 0 0.75rem;">하단에</button>
				<textarea id="msg-input" rows="1" cols="4" placeholder="1000" autocomplete="off" aria-label="메시지" title="Enter로 전송, Shift+Enter로 줄바꿈" style="field-sizing: content; box-sizing: border-box; border-radius: 0.25rem; min-width: 2.5rem; max-width: min(50vw, 40rem); padding: 0.125rem 0.5rem; font: inherit; font-size: 14px; vertical-align: middle; border: 1px solid #d9d9d9; line-height: 25px; resize: none;"></textarea>
				<button type="submit" style="color: #444746; font-size: 14px; padding: 0.125rem 0.5rem;">개의 행 추가</button>
			</form>`;

		const input = this.querySelector("#msg-input");
		const sendMessage = async () => {
			const text = input.value;
			const roomName = this.getAttribute("room");
			if (!text.trim() || !roomName) return;

			try {
				await chatService.sendMessage(roomName, text);
				input.value = "";
				input.dispatchEvent(new Event("input"));
			} catch (error) {
				console.error("Unable to send message: ", error);
				alert("Unable to send message. Please try again.");
			}
		};

		const form = this.querySelector("#form-input");
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			sendMessage();
		});
		setupChatInput(input, () => form.requestSubmit());
	}
}

customElements.define("excel-chat-input", ExcelChatInput);
