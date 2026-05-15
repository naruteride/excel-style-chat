import { authService, chatService } from "/src/api/firebase.js";

const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

const pad = (value) => String(value).padStart(2, "0");

const formatTimestamp = (timestamp) => {
	const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
	if (Number.isNaN(date.getTime())) return "--:--";
	return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export default class VscodeChatEditor extends HTMLElement {
	constructor() {
		super();
		this.messages = [];
		this.unsubscribeMessages = null;
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		this.render();

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
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		this.innerHTML = `
			<div class="vscode-markdown-editor" role="textbox" aria-label="daily-log.md" aria-multiline="true" style="scrollbar-width: thin;">
				<div class="vscode-editor-lines" id="message-list"></div>
				<form class="vscode-editor-input-line" id="form-input">
					<span class="vscode-line-number" id="input-line-number">1</span>
					<span class="vscode-token-comment">//</span>
					<input id="message-input" autocomplete="off" aria-label="Append daily note" placeholder="append daily note" />
				</form>
			</div>
		`;

		this.querySelector("#form-input")?.addEventListener("submit", (event) => this.sendMessage(event));
		this.updateMessageList();
	}

	async sendMessage(event) {
		event.preventDefault();
		const input = this.querySelector("#message-input");
		const text = input?.value.trim();
		if (!text) return;

		const user = authService.getCurrentUser();
		if (!user) {
			alert("Please login first!");
			return;
		}

		await chatService.sendMessage(this.roomName, text, user);
		input.value = "";
		input.focus();
	}

	updateMessageList() {
		const messageList = this.querySelector("#message-list");
		if (!messageList) return;

		const lines = [
			{
				className: "vscode-line-content vscode-token-heading",
				content: `# ${escapeHtml(this.roomName || "workspace")} daily log`,
			},
			{
				className: "vscode-line-content vscode-token-comment",
				content: "<!-- meeting notes are appended below -->",
			},
			{
				className: "vscode-line-content",
				content: "",
			},
			...this.messages.map((message) => ({
				className: "vscode-line-content",
				content: `<span class="vscode-token-list">-</span> <span class="vscode-token-time">[${formatTimestamp(message.timestamp)}]</span> <span class="vscode-token-author">${escapeHtml(message.displayName || "Anonymous")}</span>: ${escapeHtml(message.text)}`,
			})),
		];

		messageList.innerHTML = lines.map((line, index) => `
			<div class="vscode-editor-line">
				<span class="vscode-line-number">${index + 1}</span>
				<span class="${line.className}">${line.content}</span>
			</div>
		`).join("");

		const inputLineNumber = this.querySelector("#input-line-number");
		if (inputLineNumber) inputLineNumber.textContent = String(lines.length + 1);

		const editor = this.querySelector(".vscode-markdown-editor");
		editor?.scrollTo({ top: editor.scrollHeight });
	}
}

customElements.define("vscode-chat-editor", VscodeChatEditor);
