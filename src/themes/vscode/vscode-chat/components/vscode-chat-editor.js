import ChatPaginationController from "/src/utils/chat-pagination-controller.js";
import setupChatInput from "/src/utils/chat-input.js";
import chatOutbox from "/src/utils/chat-outbox.js";

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
	.replace(/[\r\n]+/g, " ");

const toBlockCommentText = (value) => toLineCommentText(value).replaceAll("*/", "* /");

const toDisplayName = (value) => String(value ?? "").trim() || "Anonymous";

const toIdentifierPart = (value) => {
	const raw = toDisplayName(value);
	const normalized = raw
		.normalize("NFKC")
		.replace(/[^\p{L}\p{N}_$]+/gu, " ")
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => part[0].toUpperCase() + part.slice(1))
		.join("");

	const identifier = normalized || "Anonymous";
	return /^[$_\p{L}]/u.test(identifier) ? identifier : `_${identifier}`;
};

const renderJsLine = (segments) => segments.map(([className, value]) => token(className, value)).join("");

const renderDeliveryStatus = (message) => {
	if (message.status == "sending") {
		return `<span role="status" class="vscode-token-comment">// 전송 중…</span>`;
	}
	if (message.status == "failed") {
		return `<span role="status" style="color: #f48771;">// 전송 실패</span> <button type="button" data-retry-message="${escapeHtml(message.id)}" style="padding: 0; border: none; background: transparent; color: #4fc1ff; font: inherit; text-decoration: underline; cursor: pointer;">재시도</button>`;
	}
	return "";
};

const renderMessageLines = (message, index) => {
	const authorName = toDisplayName(message.displayName);
	const author = toIdentifierPart(authorName);
	const timeToken = formatTimeToken(message.timestamp);
	const text = String(message.text ?? "");
	const variant = index % 8;
	const lines = [];

	if (/^ |[\r\n\t]/u.test(text)) {
		lines.push(
			jsComment(`// ${authorName}:${timeToken}`),
			...text.split(/\r\n?|\n/u).map((line) => jsComment("// ") + token("vscode-token-comment vscode-message-text", line)),
			""
		);
		return lines;
	}

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
				["vscode-token-string", JSON.stringify(authorName)],
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
				["", `(${authorName.length}, payload${author});`],
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
				["vscode-token-string", JSON.stringify(authorName)],
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
			jsComment(`// TODO(${authorName}:${timeToken}) ${toLineCommentText(text)}`)
		);
	} else if (variant == 6) {
		lines.push(
			jsComment(`// await runTask("task:${timeToken}", () => ${JSON.stringify(String(text ?? ""))});`)
		);
	} else {
		lines.push(
			jsComment("/*"),
			jsComment(` * rollback ${authorName} ${timeToken}: ${toBlockCommentText(text)}`),
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
		this.paginationController = new ChatPaginationController({
			getScrollElement: () => this.querySelector(".vscode-code-editor"),
			onMessagesChange: (messages) => {
				this.messages = messages;
				chatOutbox.confirmMessages(this.roomName, messages);
				this.updateMessageList();
			}
		});
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		this.render();
		this.unsubscribeOutbox = chatOutbox.subscribe(this.roomName, () => {
			const shouldScrollToBottom = this.paginationController.isNearBottom();
			this.updateMessageList();
			if (shouldScrollToBottom) this.paginationController.scrollToBottom();
		});
		this.paginationController.connect(this.roomName);
	}

	disconnectedCallback() {
		this.unsubscribeOutbox?.();
		this.unsubscribeOutbox = null;
		this.paginationController.disconnect();
	}

	render() {
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		this.innerHTML = `
			<div class="vscode-code-editor" role="textbox" aria-label="automation.js" aria-multiline="true" style="scrollbar-width: thin;">
				<div class="vscode-editor-lines" id="message-list"></div>
				<form class="vscode-editor-input-line" id="form-input">
					<span class="vscode-line-number" id="input-line-number">1</span>
					<span class="vscode-token-property">console</span><span class="vscode-token-operator">.</span><span class="vscode-token-function">log</span><span>(</span><span class="vscode-token-string">"</span><textarea id="message-input" rows="1" autocomplete="off" aria-label="Append runtime log" placeholder="append runtime log" title="Enter to send, Shift+Enter for a new line"></textarea><span class="vscode-token-string">"</span><span>);</span>
				</form>
			</div>
		`;

		const form = this.querySelector("#form-input");
		const input = this.querySelector("#message-input");
		this.querySelector("#message-list").addEventListener("click", (event) => {
			const button = event.target.closest("[data-retry-message]");
			if (button) chatOutbox.retryMessage(button.dataset.retryMessage);
		});
		form.addEventListener("submit", (event) => this.sendMessage(event));
		setupChatInput(input, () => form.requestSubmit());
		this.updateMessageList();
	}

	sendMessage(event) {
		event.preventDefault();
		const input = this.querySelector("#message-input");
		const text = input?.value;
		if (!text?.trim() || !this.roomName) return;

		chatOutbox.sendMessage(this.roomName, text);
		input.value = "";
		input.dispatchEvent(new Event("input"));
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
			...chatOutbox.getMessages(this.roomName, this.messages).flatMap((message, index) => {
				const messageLines = renderMessageLines(message, index);
				const status = renderDeliveryStatus(message);
				if (status) messageLines.push(status);
				return messageLines;
			}),
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
	}
}

customElements.define("vscode-chat-editor", VscodeChatEditor);
