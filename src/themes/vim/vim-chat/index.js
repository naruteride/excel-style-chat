import ChatPaginationController from "../../../utils/chat-pagination-controller.js";
import setupChatInput from "../../../utils/chat-input.js";
import chatOutbox from "../../../utils/chat-outbox.js";
import router from "../../../utils/router.js";
import { getThemeCommandHelp } from "../utils/theme-commands.js";

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
const COMPOSER_PREFIX = "let g:note = '";

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

	if (/^ |[\r\n\t]/u.test(text)) {
		lines.push(...text.split(/\r\n?|\n/u).map(line => comment('" ') + token("vim-token-comment vim-message-text", line)));
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
		this.cursorRow = 0;
		this.cursorColumn = 0;
		this.desiredColumn = null;
		this.lineCount = 0;
		this.pendingG = false;
		this.handleKeydown = (event) => this.handleEditorKeydown(event);
		this.handleModeChange = (event) => this.applyMode(event.detail.mode);
		this.handleCommand = (event) => this.executeCommand(event);
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
		this.addEventListener("vim-mode-change", this.handleModeChange);
		this.addEventListener("vim-command", this.handleCommand);
		this.unsubscribeOutbox = chatOutbox.subscribe(this.roomName, () => {
			const shouldScrollToBottom = this.paginationController.isNearBottom();
			this.updateMessageList();
			if (shouldScrollToBottom) this.paginationController.scrollToBottom();
		});
		this.paginationController.connect(this.roomName);
		this.querySelector("vim-workbench").openCommandLine();
	}

	disconnectedCallback() {
		this.removeEventListener("keydown", this.handleKeydown);
		this.removeEventListener("vim-mode-change", this.handleModeChange);
		this.removeEventListener("vim-command", this.handleCommand);
		this.unsubscribeOutbox?.();
		this.unsubscribeOutbox = null;
		this.paginationController.disconnect();
	}

	render() {
		this.innerHTML = `
			<vim-workbench filename=".vimrc" mode="NORMAL" position="1,1" room="${escapeHtml(this.roomName)}">
				<div class="vim-editor" tabindex="0" role="region" aria-label="Vim configuration buffer">
					<div id="message-list"></div>
					<form class="vim-code-line vim-chat-input-line" id="form-input" data-vim-line-key="draft:0" data-mode="normal">
						<span class="vim-line-number" id="input-line-number" aria-hidden="true">1</span>
						<span class="vim-line-content vim-composer-preview"></span>
						<span class="vim-composer-insert" hidden>
							<span class="vim-chat-input-prefix"><span class="vim-token-command">let</span> g:note = <span class="vim-token-string">'</span></span>
							<textarea class="vim-chat-input" id="message-input" rows="1" autocomplete="off" spellcheck="false" aria-label="메시지" readonly></textarea>
							<span class="vim-chat-input-suffix vim-token-string">'</span>
						</span>
					</form>
					<div id="draft-continuations"></div>
					<div class="vim-filler" aria-hidden="true">~<br>~<br>~<br>~<br>~<br>~<br>~<br>~</div>
				</div>
			</vim-workbench>
		`;

		const form = this.querySelector("#form-input");
		const input = this.querySelector("#message-input");
		form.addEventListener("submit", (event) => this.sendMessage(event));
		setupChatInput(input, () => {
			if (this.mode == "INSERT") form.requestSubmit();
		});
		input.addEventListener("blur", () => {
			if (this.mode == "INSERT") this.leaveInsert(false);
		});
		input.addEventListener("input", () => {
			this.updateComposerPreview();
			this.updatePosition();
		});
		input.addEventListener("keyup", () => this.updatePosition());
		input.addEventListener("click", () => this.updatePosition());
		form.addEventListener("click", () => {
			if (this.mode != "NORMAL") return;
			this.cursorRow = this.lineCount;
			this.enterInsert("A");
		});
		this.querySelector("#draft-continuations").addEventListener("click", (event) => {
			const row = event.target.closest(".vim-draft-line");
			if (!row || this.mode != "NORMAL") return;
			this.cursorRow = this.getNormalRows().indexOf(row);
			this.enterInsert("A");
		});
		this.querySelector("#message-list").addEventListener("click", (event) => {
			const button = event.target.closest("[data-retry-message]");
			if (button) {
				chatOutbox.retryMessage(button.dataset.retryMessage);
				this.querySelector("vim-workbench").focusEditor();
				return;
			}
			const row = event.target.closest(".vim-code-line");
			if (!row || this.mode != "NORMAL") return;
			this.cursorRow = this.getNormalRows().indexOf(row);
			this.cursorColumn = 0;
			this.desiredColumn = null;
			this.updateNormalCursor();
			this.querySelector("vim-workbench").focusEditor();
		});
		this.updateComposerPreview();
		this.updateMessageList();
		this.applyMode("NORMAL");
	}

	get mode() {
		return this.querySelector("vim-workbench")?.getAttribute("mode") || "NORMAL";
	}

	setMode(mode) {
		this.querySelector("vim-workbench")?.setAttribute("mode", mode);
		this.applyMode(mode);
	}

	applyMode(mode) {
		const input = this.querySelector("#message-input");
		if (!input) return;
		const isInsert = mode == "INSERT";
		if (mode != "NORMAL") this.pendingG = false;
		input.readOnly = !isInsert;
		this.querySelector("#form-input").dataset.mode = isInsert ? "insert" : "normal";
		this.querySelector(".vim-composer-preview").hidden = isInsert;
		this.querySelector(".vim-composer-insert").hidden = !isInsert;
		this.querySelector("#draft-continuations").hidden = isInsert;
		if (mode == "NORMAL") this.updateNormalCursor();
		else this.clearNormalCursor();
		this.updatePosition();
	}

	handleEditorKeydown(event) {
		if (event.defaultPrevented || event.isComposing || event.keyCode == 229) return;
		const input = this.querySelector("#message-input");
		const isEscape = event.key == "Escape" || (event.ctrlKey && event.key == "[");
		if (isEscape && this.mode == "INSERT") {
			event.preventDefault();
			this.leaveInsert();
			return;
		}

		if (
			this.mode != "NORMAL" || event.ctrlKey || event.metaKey || event.altKey ||
			(event.target != input && event.target.closest("input, textarea, select, button, a, [contenteditable]"))
		) return;

		const key = event.key;
		if (key == ":") {
			event.preventDefault();
			this.pendingG = false;
			this.querySelector("vim-workbench").openCommandLine(":");
			return;
		}
		if (key == "g") {
			event.preventDefault();
			if (this.pendingG) {
				this.cursorRow = 0;
				this.moveToFirstCharacter();
				this.updateNormalCursor(true);
			}
			this.pendingG = !this.pendingG;
			return;
		}
		this.pendingG = false;
		if (["i", "a", "I", "A", "o", "O"].includes(key)) {
			event.preventDefault();
			this.enterInsert(key);
			return;
		}

		const movements = {
			h: [0, -1], ArrowLeft: [0, -1],
			j: [1, 0], ArrowDown: [1, 0],
			k: [-1, 0], ArrowUp: [-1, 0],
			l: [0, 1], ArrowRight: [0, 1]
		};
		if (movements[key]) {
			event.preventDefault();
			if (movements[key][0]) {
				if (this.desiredColumn == null) this.desiredColumn = this.cursorColumn;
				this.cursorColumn = this.desiredColumn;
			} else {
				this.desiredColumn = null;
			}
			this.cursorRow += movements[key][0];
			this.cursorColumn += movements[key][1];
			this.updateNormalCursor(true);
		} else if (["0", "$", "Home", "End", "G"].includes(key)) {
			event.preventDefault();
			if (key == "G") {
				this.cursorRow = this.getNormalRows().length - 1;
				this.moveToFirstCharacter();
			} else {
				this.cursorColumn = key == "0" || key == "Home" ? 0 : Number.MAX_SAFE_INTEGER;
				this.desiredColumn = this.cursorColumn;
			}
			this.updateNormalCursor(true);
		}
	}

	moveToFirstCharacter() {
		const text = this.getNormalRows()[this.cursorRow]?.querySelector(".vim-line-content")?.textContent || "";
		const firstCharacter = text.search(/\S/u);
		this.cursorColumn = firstCharacter == -1 ? 0 : Array.from(text.slice(0, firstCharacter)).length;
		this.desiredColumn = this.cursorColumn;
	}

	enterInsert(key) {
		const input = this.querySelector("#message-input");
		const isDraft = this.cursorRow >= this.lineCount;
		const draftLines = input.value.split("\n");
		let position = input.value.length;
		if (isDraft) {
			const draftLine = Math.min(this.cursorRow - this.lineCount, draftLines.length - 1);
			const prefixLength = draftLine == 0 ? COMPOSER_PREFIX.length : 0;
			let column = Math.max(0, this.cursorColumn - prefixLength);
			position = draftLines.slice(0, draftLine).reduce((offset, line) => offset + line.length + 1, 0);
			for (const character of draftLines[draftLine]) {
				const width = character == "'" ? 2 : 1;
				if (column < width) break;
				column -= width;
				position += character.length;
			}
			if (key == "a" && this.cursorColumn >= prefixLength && input.value[position] != "\n") {
				position += Array.from(input.value.slice(position))[0]?.length || 0;
			}
		}
		const lineStart = input.value.slice(0, position).lastIndexOf("\n") + 1;
		const nextBreak = input.value.indexOf("\n", position);
		const lineEnd = nextBreak == -1 ? input.value.length : nextBreak;

		if (key == "I") {
			const firstCharacter = input.value.slice(lineStart, lineEnd).search(/\S/u);
			position = lineStart + Math.max(0, firstCharacter);
		} else if (key == "A") {
			position = lineEnd;
		} else if ((key == "o" || key == "O") && input.value) {
			const offset = key == "o" ? lineEnd : lineStart;
			input.value = `${input.value.slice(0, offset)}\n${input.value.slice(offset)}`;
			position = offset + (key == "o" ? 1 : 0);
		}

		this.cursorRow = this.lineCount + input.value.slice(0, position).split("\n").length - 1;
		this.desiredColumn = null;
		this.setMode("INSERT");
		input.focus({ preventScroll: true });
		input.setSelectionRange(position, position);
		input.dispatchEvent(new Event("input"));
		input.scrollIntoView({ block: "nearest" });
	}

	leaveInsert(shouldFocus = true) {
		const input = this.querySelector("#message-input");
		const linesBeforeCursor = input.value.slice(0, input.selectionStart).split("\n");
		const draftLine = linesBeforeCursor.length - 1;
		this.cursorRow = this.lineCount + draftLine;
		const beforeCursor = Array.from(linesBeforeCursor[draftLine]);
		beforeCursor.pop();
		this.cursorColumn = (draftLine == 0 ? COMPOSER_PREFIX.length : 0) + Array.from(beforeCursor.join("").replaceAll("'", "''")).length;
		this.desiredColumn = null;
		this.updateComposerPreview();
		this.setMode("NORMAL");
		if (shouldFocus) this.querySelector("vim-workbench").focusEditor();
	}

	executeCommand(event) {
		const value = event.detail.command.trim();
		const workbench = this.querySelector("vim-workbench");
		if ([":q", ":q!", ":wq", ":wq!"].includes(value)) {
			router.navigateTo("/");
		} else if (value == ":help") {
			workbench.showMessage([
				"i a I A o O: insert | Esc: normal | hjkl / arrows: move | gg / G: top / bottom | Enter: send | :q / :q! / :wq / :wq!: quit",
				getThemeCommandHelp()
			].join("\n"));
		} else {
			workbench.showMessage(`E492: Not an editor command: ${value.slice(1)}`, "error");
		}
	}

	sendMessage(event) {
		event.preventDefault();
		if (this.mode != "INSERT") return;
		const input = this.querySelector("#message-input");
		const text = input.value;
		if (!text.trim() || !this.roomName) return;

		chatOutbox.sendMessage(this.roomName, text);
		input.value = "";
		input.dispatchEvent(new Event("input"));
		input.focus();
	}

	updatePosition() {
		const input = this.querySelector("#message-input");
		if (!input) return;
		if (this.mode != "INSERT") {
			this.querySelector("vim-workbench")?.setAttribute("position", `${this.cursorRow + 1},${this.cursorColumn + 1}`);
			return;
		}
		const beforeCursor = input.value.slice(0, input.selectionStart);
		const lines = beforeCursor.split("\n");
		const row = this.lineCount + lines.length;
		const column = Array.from(lines[lines.length - 1]).length + 1 + (lines.length == 1 ? COMPOSER_PREFIX.length : 0);
		this.querySelector("vim-workbench")?.setAttribute("position", `${row},${column}`);
	}

	updateComposerPreview() {
		const preview = this.querySelector(".vim-composer-preview");
		if (!preview) return;
		const lines = this.querySelector("#message-input").value.split("\n");
		preview.innerHTML = `${command("let")} g:note = ${token("vim-token-string", `'${lines[0].replaceAll("'", "''")}${lines.length == 1 ? "'" : ""}`)}`;
		const continuations = this.querySelector("#draft-continuations");
		continuations.innerHTML = lines.slice(1).map((line, index) => `
			<div class="vim-code-line vim-draft-line" data-vim-line-key="draft:${index + 1}">
				<span class="vim-line-number" aria-hidden="true">${this.lineCount + index + 2}</span>
				<span class="vim-line-content">${token("vim-token-string", line.replaceAll("'", "''") + (index == lines.length - 2 ? "'" : ""))}</span>
			</div>
		`).join("");
		continuations.hidden = this.mode == "INSERT";
	}

	getNormalRows() {
		return Array.from(this.querySelectorAll(".vim-editor .vim-code-line"));
	}

	clearNormalCursor() {
		this.querySelectorAll(".vim-normal-cursor").forEach(cursor => {
			const parent = cursor.parentNode;
			if (cursor.dataset.empty) cursor.remove();
			else cursor.replaceWith(...cursor.childNodes);
			parent.normalize();
		});
		this.querySelector(".vim-normal-line")?.classList.remove("vim-normal-line");
	}

	updateNormalCursor(shouldScroll = false) {
		this.clearNormalCursor();
		if (this.mode != "NORMAL") return;
		const rows = this.getNormalRows();
		this.cursorRow = Math.max(0, Math.min(this.cursorRow, rows.length - 1));
		const row = rows[this.cursorRow];
		const content = row?.querySelector(".vim-line-content");
		if (!content) return;
		row.classList.add("vim-normal-line");
		this.cursorColumn = Math.max(0, Math.min(this.cursorColumn, Array.from(content.textContent).length - 1));
		const cursor = document.createElement("span");
		cursor.className = "vim-normal-cursor";
		const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
		let offset = this.cursorColumn;
		let textNode = walker.nextNode();
		while (textNode && offset >= Array.from(textNode.data).length) {
			offset -= Array.from(textNode.data).length;
			textNode = walker.nextNode();
		}
		if (textNode) {
			const characters = Array.from(textNode.data);
			const start = characters.slice(0, offset).join("").length;
			const range = document.createRange();
			range.setStart(textNode, start);
			range.setEnd(textNode, start + characters[offset].length);
			range.surroundContents(cursor);
		} else {
			cursor.dataset.empty = "true";
			cursor.textContent = " ";
			content.appendChild(cursor);
		}
		if (shouldScroll) row.scrollIntoView({ block: "nearest", inline: "nearest" });
		this.updatePosition();
	}

	updateMessageList() {
		const messageList = this.querySelector("#message-list");
		if (!messageList) return;
		const cursorKey = this.getNormalRows()[this.cursorRow]?.dataset.vimLineKey;
		this.clearNormalCursor();

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
			""
		].map((html, index) => ({ html, key: `config:${index}` }));
		messages.forEach(message => {
			renderMessageLines(message).forEach((html, index) => {
				lines.push({ html, key: `message:${message.id || messageKey(message)}:${index}` });
			});
		});

		messageList.innerHTML = lines.map((line, index) => `
			<div class="vim-code-line" data-vim-line-key="${escapeHtml(line.key)}">
				<span class="vim-line-number" aria-hidden="true">${index + 1}</span>
				<span class="vim-line-content">${line.html || " "}</span>
			</div>
		`).join("");
		this.lineCount = lines.length;
		this.querySelector("#input-line-number").textContent = String(this.lineCount + 1);
		this.updateComposerPreview();
		const cursorRow = this.getNormalRows().findIndex(row => row.dataset.vimLineKey == cursorKey);
		this.cursorRow = cursorRow == -1 ? this.lineCount : cursorRow;
		this.updateNormalCursor();
		this.updatePosition();
	}
}

customElements.define("vim-chat", VimChat);
