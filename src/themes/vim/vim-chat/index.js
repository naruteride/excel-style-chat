import ChatPaginationController from "../../../utils/chat-pagination-controller.js";
import setupChatInput from "../../../utils/chat-input.js";
import chatOutbox from "../../../utils/chat-outbox.js";
import router from "../../../utils/router.js";

const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

const token = (className, value) => `<span class="${className}">${escapeHtml(value)}</span>`;
const comment = (value) => token("vim-token-comment", value);
const command = (value) => token("vim-token-command", value);
const vimString = (value) => token("vim-token-string", `'${String(value ?? "").replaceAll("'", "''")}'`);

const formatTimestamp = (timestamp) => {
	const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
	if (Number.isNaN(date.getTime())) return "--:--:--";
	return [date.getHours(), date.getMinutes(), date.getSeconds()]
		.map(value => String(value).padStart(2, "0"))
		.join(":");
};

const messageKey = (message) => {
	const value = String(message.id || `${message.uid}:${message.timestamp}:${message.text}`);
	let hash = 0;
	for (const character of value) hash = (hash * 31 + character.codePointAt(0)) >>> 0;
	return hash;
};

const renderDeliveryStatus = (message) => {
	if (message.status == "sending") {
		return `<span role="status" class="vim-message-status">${comment('" 전송 중…')}</span>`;
	}
	if (message.status == "failed") {
		return `<span role="status" class="vim-message-status vim-message-failed">${escapeHtml('" 전송 실패')}</span> <button type="button" class="vim-retry-button" data-retry-message="${escapeHtml(message.id)}">재시도</button>`;
	}
	return "";
};

const renderMessageLines = (message) => {
	const author = String(message.displayName || "Anonymous").replace(/[\r\n]+/gu, " ");
	const text = String(message.text ?? "");
	const key = messageKey(message);
	const lines = [comment(`" ${author} · ${formatTimestamp(message.timestamp)}`)];

	if (/[\r\n]/u.test(text)) {
		lines.push(...text.split(/\r\n?|\n/u).map(line => comment(`" ${line}`)));
	} else if (key % 4 == 0) {
		lines.push(comment(`" ${text}`));
	} else if (key % 4 == 1) {
		lines.push(`${command("let")} s:note_${key.toString(16)} = ${vimString(text)}`);
	} else if (key % 4 == 2) {
		lines.push(
			`${command("function!")} ${token("vim-token-function", `s:Sync${key.toString(16)}`)}() ${command("abort")}`,
			`  ${command("let")} l:note = ${vimString(text)}`,
			`  ${command("return")} l:note`,
			command("endfunction")
		);
	} else {
		lines.push(`${command("call")} ${token("vim-token-function", "append")}(${token("vim-token-function", "line")}(${vimString("$")}), ${vimString(text)})`);
	}

	const status = renderDeliveryStatus(message);
	if (status) lines.push(status);
	lines.push("");
	return lines;
};

export default class VimChat extends HTMLElement {
	constructor() {
		super();
		this.messages = [];
		this.mode = "NORMAL";
		this.handleKeydown = (event) => this.handleEditorKeydown(event);
		this.paginationController = new ChatPaginationController({
			getScrollElement: () => this.querySelector(".vim-editor"),
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
		this.addEventListener("keydown", this.handleKeydown);
		this.unsubscribeOutbox = chatOutbox.subscribe(this.roomName, () => {
			const shouldScrollToBottom = this.paginationController.isNearBottom();
			this.updateMessageList();
			if (shouldScrollToBottom) this.paginationController.scrollToBottom();
		});
		this.paginationController.connect(this.roomName);
	}

	disconnectedCallback() {
		this.removeEventListener("keydown", this.handleKeydown);
		this.unsubscribeOutbox?.();
		this.unsubscribeOutbox = null;
		this.paginationController.disconnect();
	}

	render() {
		this.innerHTML = `
			<vim-workbench filename=".vimrc" mode="NORMAL" status="vim" position="1,1" room="${escapeHtml(this.roomName)}" command="i: insert · Enter: send · Shift+Enter: new line · Esc: normal · :q + Enter: leave room">
				<div class="vim-editor" tabindex="0" role="region" aria-label="Vim configuration buffer">
					<div id="message-list"></div>
					<form class="vim-code-line vim-chat-input-line" id="form-input">
						<span class="vim-line-number" id="input-line-number" aria-hidden="true">1</span>
						<span class="vim-chat-input-prefix"><span class="vim-token-command">let</span> g:note = <span class="vim-token-string">'</span></span>
						<textarea class="vim-chat-input" id="message-input" rows="1" autocomplete="off" spellcheck="false" aria-label="메시지" placeholder="메시지 작성" title="Enter로 전송, Shift+Enter로 줄바꿈"></textarea>
						<span class="vim-chat-input-suffix vim-token-string">'</span>
					</form>
					<div class="vim-filler" aria-hidden="true">~<br>~<br>~<br>~<br>~<br>~<br>~<br>~</div>
				</div>
			</vim-workbench>
		`;

		const form = this.querySelector("#form-input");
		const input = this.querySelector("#message-input");
		form.addEventListener("submit", (event) => this.sendMessage(event));
		setupChatInput(input, () => form.requestSubmit());
		input.addEventListener("focus", () => this.setMode("INSERT"));
		input.addEventListener("blur", () => this.setMode("NORMAL"));
		input.addEventListener("input", () => this.updatePosition());
		input.addEventListener("keyup", () => this.updatePosition());
		input.addEventListener("click", () => this.updatePosition());
		this.querySelector("#message-list").addEventListener("click", (event) => {
			const button = event.target.closest("[data-retry-message]");
			if (button) chatOutbox.retryMessage(button.dataset.retryMessage);
		});
		this.updateMessageList();
	}

	setMode(mode) {
		this.mode = mode;
		this.querySelector("vim-workbench")?.setAttribute("mode", mode);
		this.updatePosition();
	}

	handleEditorKeydown(event) {
		if (event.defaultPrevented || event.isComposing || event.keyCode == 229) return;
		const input = this.querySelector("#message-input");
		if (event.key == "Escape" && event.target == input) {
			event.preventDefault();
			this.querySelector(".vim-editor").focus({ preventScroll: true });
			this.setMode("NORMAL");
			return;
		}

		if (
			this.mode == "NORMAL" && event.key == "i" &&
			!event.ctrlKey && !event.metaKey && !event.altKey &&
			!event.target.closest("input, textarea, select, button, a, [contenteditable]")
		) {
			event.preventDefault();
			input.focus();
		}
	}

	sendMessage(event) {
		event.preventDefault();
		const input = this.querySelector("#message-input");
		const text = input.value;
		if (!text.trim() || !this.roomName) return;

		if (text.trim() == ":q" && !/[\r\n]/u.test(text)) {
			router.navigateTo("/");
			return;
		}

		chatOutbox.sendMessage(this.roomName, text);
		input.value = "";
		input.dispatchEvent(new Event("input"));
		input.focus();
	}

	updatePosition() {
		const input = this.querySelector("#message-input");
		if (!input) return;
		const beforeCursor = input.value.slice(0, input.selectionStart);
		const lines = beforeCursor.split("\n");
		const row = this.lineCount + lines.length;
		const column = Array.from(lines[lines.length - 1]).length + 1;
		this.querySelector("vim-workbench")?.setAttribute("position", `${row},${column}`);
	}

	updateMessageList() {
		const messageList = this.querySelector("#message-list");
		if (!messageList) return;

		const messages = chatOutbox.getMessages(this.roomName, this.messages);
		const lines = [
			comment('" ~/.vimrc — workspace configuration'),
			`${command("set")} nocompatible`,
			`${command("set")} number`,
			`${command("set")} hidden`,
			`${command("set")} background=dark`,
			`${command("colorscheme")} ${token("vim-token-string", "retrobox")}`,
			`${command("filetype")} plugin indent on`,
			"",
			`${command("let")} g:workspace = ${vimString(this.roomName)}`,
			"",
			comment('" Runtime notes'),
			...messages.flatMap(message => renderMessageLines(message))
		];
		if (!messages.length) lines.push(comment('" 아래에 메시지를 작성하세요. Enter로 전송합니다.'), "");

		messageList.innerHTML = lines.map((line, index) => `
			<div class="vim-code-line">
				<span class="vim-line-number" aria-hidden="true">${index + 1}</span>
				<span class="vim-line-content">${line || " "}</span>
			</div>
		`).join("");
		this.lineCount = lines.length;
		this.querySelector("#input-line-number").textContent = String(this.lineCount + 1);
		this.updatePosition();
	}
}

customElements.define("vim-chat", VimChat);
