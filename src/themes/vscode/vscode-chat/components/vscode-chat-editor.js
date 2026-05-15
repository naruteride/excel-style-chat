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

const formatTimeToken = (timestamp) => {
	const value = formatTimestamp(timestamp).replaceAll(":", "");
	return /^\d+$/u.test(value) ? value : "000000";
};

const token = (className, value) => {
	const content = escapeHtml(value);
	return className ? `<span class="${className}">${content}</span>` : `<span>${content}</span>`;
};

const jsComment = (value) => token("vscode-token-comment", value);

const toLineCommentText = (value) => String(value ?? "")
	.replace(/[\r\n]+/g, " ")
	.trim();

const toBlockCommentText = (value) => toLineCommentText(value).replaceAll("*/", "* /");

const hashIdentifier = (value) => {
	const hash = Array.from(String(value ?? "")).reduce((result, char) => {
		return ((result * 31) + char.charCodeAt(0)) >>> 0;
	}, 0);
	return hash.toString(36).toUpperCase();
};

const toIdentifierPart = (value, fallback = "anonymous") => {
	const raw = String(value ?? "");
	const normalized = raw
		.normalize("NFKD")
		.replace(/[^\w]+/g, " ")
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => part[0].toUpperCase() + part.slice(1))
		.join("");

	const identifier = normalized || (raw ? `User${hashIdentifier(raw)}` : fallback[0].toUpperCase() + fallback.slice(1));
	return /^[A-Za-z_$]/u.test(identifier) ? identifier : `User${identifier}`;
};

const renderJsLine = (segments) => segments.map(([className, value]) => token(className, value)).join("");

const renderMessageLines = (message, index) => {
	const author = toIdentifierPart(message.displayName, "anonymous");
	const timeToken = formatTimeToken(message.timestamp);
	const text = message.text;
	const variant = index % 8;
	const lines = [];

	if (variant == 0) {
		lines.push(
			renderJsLine([
				["vscode-token-keyword", "async"],
				["", " "],
				["vscode-token-keyword", "function"],
				["", " "],
				["vscode-token-function", `sync${author}State${timeToken}`],
				["", "() {"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-property", "console"],
				["vscode-token-operator", "."],
				["vscode-token-function", "log"],
				["", "("],
				["vscode-token-string", JSON.stringify(String(text ?? ""))],
				["", ");"],
			]),
			"}"
		);
	} else if (variant == 1) {
		lines.push(
			renderJsLine([
				["vscode-token-keyword", "if"],
				["", " ("],
				["vscode-token-property", "queue"],
				["vscode-token-operator", "."],
				["vscode-token-function", "has"],
				["", "("],
				["vscode-token-string", JSON.stringify(author)],
				["", ")) {"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-keyword", "throw"],
				["", " "],
				["vscode-token-keyword", "new"],
				["", " "],
				["vscode-token-function", "Error"],
				["", "("],
				["vscode-token-string", JSON.stringify(String(text ?? ""))],
				["", ");"],
			]),
			"}"
		);
	} else if (variant == 2) {
		lines.push(
			renderJsLine([
				["vscode-token-keyword", "for"],
				["", " ("],
				["vscode-token-keyword", "let"],
				["", ` retry${timeToken} = `],
				["vscode-token-number", "0"],
				["", `; retry${timeToken} < `],
				["vscode-token-number", "1"],
				["", `; retry${timeToken}++) {`],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-keyword", "const"],
				["", ` payload${author} = `],
				["vscode-token-string", JSON.stringify(String(text ?? ""))],
				["", ";"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-keyword", "await"],
				["", " "],
				["vscode-token-function", "flushQueue"],
				["", `(${author.length}, payload${author});`],
			]),
			"}"
		);
	} else if (variant == 3) {
		lines.push(
			renderJsLine([
				["vscode-token-keyword", "try"],
				["", " {"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-keyword", "await"],
				["", " "],
				["vscode-token-function", "runTask"],
				["", "("],
				["vscode-token-string", JSON.stringify(`task:${timeToken}`)],
				["", ", () => "],
				["vscode-token-string", JSON.stringify(String(text ?? ""))],
				["", ");"],
			]),
			renderJsLine([
				["", "} "],
				["vscode-token-keyword", "catch"],
				["", " (error) {"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-property", "console"],
				["vscode-token-operator", "."],
				["vscode-token-function", "warn"],
				["", "(error.message);"],
			]),
			"}"
		);
	} else if (variant == 4) {
		lines.push(
			renderJsLine([
				["vscode-token-keyword", "const"],
				["", ` snapshot${author}${timeToken} = `],
				["vscode-token-function", "Object"],
				["vscode-token-operator", "."],
				["vscode-token-function", "freeze"],
				["", "({"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-property", "owner"],
				["", ": "],
				["vscode-token-string", JSON.stringify(author)],
				["", ","],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-property", "reason"],
				["", ": "],
				["vscode-token-string", JSON.stringify(String(text ?? ""))],
				["", ","],
			]),
			"});"
		);
	} else if (variant == 5) {
		lines.push(
			jsComment(`// TODO(${author}:${timeToken}) ${toLineCommentText(text)}`)
		);
	} else if (variant == 6) {
		lines.push(
			jsComment(`// await runTask("task:${timeToken}", () => ${JSON.stringify(String(text ?? ""))});`)
		);
	} else {
		lines.push(
			jsComment("/*"),
			jsComment(` * rollback${author}${timeToken}: ${toBlockCommentText(text)}`),
			jsComment(` * console.log(${JSON.stringify(String(text ?? ""))});`),
			jsComment(" */")
		);
	}

	lines.push("");
	return lines;
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
			<div class="vscode-code-editor" role="textbox" aria-label="automation.js" aria-multiline="true" style="scrollbar-width: thin;">
				<div class="vscode-editor-lines" id="message-list"></div>
				<form class="vscode-editor-input-line" id="form-input">
					<span class="vscode-line-number" id="input-line-number">1</span>
					<span class="vscode-token-property">console</span><span class="vscode-token-operator">.</span><span class="vscode-token-function">log</span><span>(</span><span class="vscode-token-string">"</span><input id="message-input" autocomplete="off" aria-label="Append runtime log" placeholder="append runtime log" /><span class="vscode-token-string">"</span><span>);</span>
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
			renderJsLine([
				["vscode-token-keyword", "import"],
				["", " "],
				["vscode-token-property", "fs"],
				["", " "],
				["vscode-token-keyword", "from"],
				["", " "],
				["vscode-token-string", "\"node:fs/promises\""],
				["", ";"],
			]),
			renderJsLine([
				["vscode-token-keyword", "const"],
				["", " WORKSPACE_ID = "],
				["vscode-token-string", JSON.stringify(String(this.roomName || "workspace"))],
				["", ";"],
			]),
			renderJsLine([
				["vscode-token-keyword", "const"],
				["", " SHORT_TIMEOUT = "],
				["vscode-token-number", "5_000"],
				["", ";"],
			]),
			"",
			renderJsLine([
				["vscode-token-keyword", "export"],
				["", " "],
				["vscode-token-keyword", "async"],
				["", " "],
				["vscode-token-keyword", "function"],
				["", " "],
				["vscode-token-function", "runAutomationFlow"],
				["", "({ signal, log }) {"],
			]),
			renderJsLine([
				["", "\t"],
				["vscode-token-keyword", "const"],
				["", " queue = "],
				["vscode-token-keyword", "new"],
				["", " "],
				["vscode-token-function", "Set"],
				["", "();"],
			]),
			...this.messages.flatMap(renderMessageLines).map((line) => line ? `\t${line}` : ""),
			"}",
		];

		messageList.innerHTML = lines.map((line, index) => `
			<div class="vscode-editor-line">
				<span class="vscode-line-number">${index + 1}</span>
				<span class="vscode-line-content">${line}</span>
			</div>
		`).join("");

		const inputLineNumber = this.querySelector("#input-line-number");
		if (inputLineNumber) inputLineNumber.textContent = String(lines.length + 1);

		const editor = this.querySelector(".vscode-code-editor");
		editor?.scrollTo({ top: editor.scrollHeight });
	}
}

customElements.define("vscode-chat-editor", VscodeChatEditor);
