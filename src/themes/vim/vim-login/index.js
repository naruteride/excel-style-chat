import BaseComponent from "../../../components/base-component.js";
import { authService } from "../../../api/firebase.js";
import router from "../../../utils/router.js";
import { getThemeCommandHelp } from "../utils/theme-commands.js";

const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

const loginErrors = {
	"auth/popup-closed-by-user": "Google sign-in cancelled. Try :login google again.",
	"auth/cancelled-popup-request": "Google sign-in cancelled. Try again.",
	"auth/popup-blocked": "The browser blocked the sign-in window. Allow popups and try again.",
	"auth/network-request-failed": "Unable to connect. Check your connection and try again.",
	"auth/operation-not-allowed": "This sign-in method is unavailable.",
	"auth/unauthorized-domain": "Google sign-in is unavailable on this domain."
};

export default class VimLogin extends BaseComponent {
	constructor() {
		super();
		this.user = null;
		this.busy = false;
		this.connectionId = 0;
		this.cursorRow = 0;
		this.cursorColumn = 0;
		this.desiredColumn = 0;
		this.pendingG = false;
		this.handleCommand = (event) => this.runCommand(event);
		this.handleKeydown = (event) => this.handleEditorKeydown(event);
		this.handleModeChange = (event) => this.applyMode(event.detail.mode);
	}

	connectedCallback() {
		this.connectionId += 1;
		this.user = authService.getCurrentUser();
		super.connectedCallback();
		this.setBusy(false);
		this.addEventListener("vim-command", this.handleCommand);
		this.addEventListener("keydown", this.handleKeydown);
		this.addEventListener("vim-mode-change", this.handleModeChange);
		this.authUnsubscribe = authService.onUserChange((user) => {
			this.user = user;
			this.updateSession();
		});
		this.querySelector("vim-workbench").focusOnEntry();
	}

	disconnectedCallback() {
		this.connectionId += 1;
		super.disconnectedCallback();
		this.removeEventListener("vim-command", this.handleCommand);
		this.removeEventListener("keydown", this.handleKeydown);
		this.removeEventListener("vim-mode-change", this.handleModeChange);
		this.authUnsubscribe?.();
		this.authUnsubscribe = null;
	}

	render() {
		if (this.querySelector(".vim-login-editor")) {
			this.updateSession();
			return;
		}

		const lines = [
			'<span class="vim-token-comment">" ~/.vimrc — development environment</span>',
			'<span class="vim-token-command">set</span> nocompatible',
			'<span class="vim-token-command">syntax</span> on',
			'<span class="vim-token-command">filetype</span> plugin indent on',
			"",
			'<span class="vim-token-command">set</span> number',
			'<span class="vim-token-command">set</span> cursorline',
			'<span class="vim-token-command">set</span> background=dark',
			'<span class="vim-token-command">colorscheme</span> retrobox',
			"",
			'<span class="vim-token-command">let</span> g:session_user = <span class="vim-token-string" data-vim-session></span>',
			"",
			'<span class="vim-token-comment">" Press : to enter a command.</span>',
			'<span class="vim-token-comment">" :login anonymous  — anonymous session</span>',
			'<span class="vim-token-comment">" :login google     — Google sign-in</span>',
			'<span class="vim-token-comment">" :join daily-scrum — open a room</span>',
			...getThemeCommandHelp().split("\n").map(line => `<span class="vim-token-comment">${escapeHtml(`" ${line}`)}</span>`),
			"",
			'<span class="vim-token-command">function!</span> <span class="vim-token-function">StartSession</span>(room) <span class="vim-token-command">abort</span>',
			'  <span class="vim-token-comment">" Enter :help for all available commands.</span>',
			'<span class="vim-token-command">endfunction</span>'
		];

		this.innerHTML = `
			<vim-workbench filename=".vimrc" mode="NORMAL" position="1,1">
				<div class="vim-editor vim-login-editor" tabindex="0" aria-label="Vim configuration">
					${lines.map((line, index) => `
						<div class="vim-code-line">
							<span class="vim-line-number" aria-hidden="true">${index + 1}</span>
							<span class="vim-line-content">${line || " "}</span>
						</div>
					`).join("")}
					<div class="vim-filler" aria-hidden="true">${"<span>~</span>".repeat(12)}</div>
				</div>
			</vim-workbench>
		`;

		this.querySelector(".vim-login-editor").addEventListener("click", (event) => {
			const row = event.target.closest(".vim-code-line");
			if (row) {
				this.cursorRow = this.getNormalRows().indexOf(row);
				this.cursorColumn = 0;
				this.desiredColumn = 0;
			}
			this.querySelector("vim-workbench").focusEditor();
			this.updateNormalCursor();
		});
		this.updateSession();
	}

	get mode() {
		return this.querySelector("vim-workbench")?.getAttribute("mode") || "NORMAL";
	}

	applyMode(mode) {
		if (mode == "NORMAL") this.updateNormalCursor();
		else {
			this.pendingG = false;
			this.clearNormalCursor();
		}
	}

	handleEditorKeydown(event) {
		if (
			event.defaultPrevented || event.isComposing || event.keyCode == 229 ||
			this.mode != "NORMAL" || event.ctrlKey || event.metaKey || event.altKey ||
			event.target.closest("input, textarea, select, button, a, [contenteditable]")
		) return;

		const workbench = this.querySelector("vim-workbench");
		const key = event.key;
		if (key == "g") {
			event.preventDefault();
			if (this.pendingG) this.goToLine(0);
			this.pendingG = !this.pendingG;
			return;
		}
		this.pendingG = false;
		if (key == ":") {
			event.preventDefault();
			if (!this.busy) workbench.openCommandLine(":");
		} else if (["i", "I", "a", "A", "o", "O"].includes(key)) {
			event.preventDefault();
			workbench.showMessage("E21: Cannot make changes, 'modifiable' is off", "error");
		} else if (key == "G") {
			event.preventDefault();
			this.goToLine(this.getNormalRows().length - 1);
		} else if (["0", "$", "Home", "End"].includes(key)) {
			event.preventDefault();
			this.desiredColumn = key == "0" || key == "Home" ? 0 : Number.MAX_SAFE_INTEGER;
			this.cursorColumn = this.desiredColumn;
			this.updateNormalCursor(true);
		} else {
			const movements = {
				h: [0, -1], ArrowLeft: [0, -1],
				j: [1, 0], ArrowDown: [1, 0],
				k: [-1, 0], ArrowUp: [-1, 0],
				l: [0, 1], ArrowRight: [0, 1]
			};
			const movement = movements[key];
			if (!movement) return;
			event.preventDefault();
			this.cursorRow += movement[0];
			if (movement[0]) this.cursorColumn = this.desiredColumn;
			else {
				this.cursorColumn = Math.max(0, this.cursorColumn + movement[1]);
				this.desiredColumn = this.cursorColumn;
			}
			this.updateNormalCursor(true);
			if (!movement[0]) this.desiredColumn = this.cursorColumn;
		}
	}

	goToLine(index) {
		const rows = this.getNormalRows();
		this.cursorRow = Math.max(0, Math.min(index, rows.length - 1));
		const text = rows[this.cursorRow]?.querySelector(".vim-line-content")?.textContent || "";
		this.cursorColumn = Array.from(text.match(/^\s*/u)[0]).length;
		this.desiredColumn = this.cursorColumn;
		this.updateNormalCursor(true);
		this.desiredColumn = this.cursorColumn;
	}

	getNormalRows() {
		return Array.from(this.querySelectorAll(".vim-login-editor .vim-code-line"));
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
		this.querySelector("vim-workbench")?.setAttribute("position", `${this.cursorRow + 1},${this.cursorColumn + 1}`);
	}

	updateSession() {
		this.clearNormalCursor();
		const userName = this.user ? this.user.displayName || "Anonymous" : "not authenticated";
		const session = this.querySelector("[data-vim-session]");
		if (session) session.textContent = `'${userName.replaceAll("'", "''")}'`;
		this.updateNormalCursor();
	}

	setBusy(busy) {
		this.busy = busy;
		this.querySelector("vim-workbench")?.setAttribute("busy", String(busy));
	}

	async runCommand(event) {
		if (this.busy) return;
		const workbench = this.querySelector("vim-workbench");
		const raw = String(event.detail?.command || "").trim();
		if (!raw.startsWith(":")) {
			workbench.showMessage("E492: Not an editor command. Commands must start with :", "error");
			return;
		}
		const value = raw.slice(1).trim();
		if (!value) {
			workbench.showMessage("");
			return;
		}
		const [command, ...args] = value.split(/\s+/);
		const connectionId = this.connectionId;
		const isActive = () => this.isConnected && this.connectionId == connectionId;

		try {
			if ((command == "login" && args.length <= 1) || (command == "anon" && !args.length)) {
				const provider = command == "anon" ? "anonymous" : args[0] || "anonymous";
				if (provider != "anonymous" && provider != "anon" && provider != "google") {
					workbench.showMessage("Usage: :login anonymous | :login google", "error");
					return;
				}
				this.setBusy(true);
				workbench.showMessage(provider == "google" ? "Opening Google sign-in…" : "Starting anonymous session…");
				const credential = await (provider == "google" ? authService.loginGoogle() : authService.loginAnonymously());
				if (!isActive()) return;
				this.user = credential.user;
				this.updateSession();
				workbench.showMessage(`Signed in as ${this.user.displayName || "Anonymous"}. Enter :join room-name to continue.`);
			} else if (command == "logout" && !args.length) {
				this.setBusy(true);
				await authService.logout();
				if (!isActive()) return;
				this.user = null;
				this.updateSession();
				workbench.showMessage("Signed out. Enter :login anonymous or :login google.");
			} else if (command == "join") {
				const roomName = args[0];
				if (args.length != 1 || !roomName || /[/?#\\%\u0000-\u0020\u007f]/.test(roomName) || roomName == "." || roomName == "..") {
					workbench.showMessage("Usage: :join room-name (one name without spaces, /, ?, # or %)", "error");
					return;
				}
				this.setBusy(true);
				workbench.showMessage(`Opening ${roomName}/.vimrc…`);
				await authService.ensureAnonymousUser();
				if (isActive()) router.navigateTo(`/${roomName}`);
			} else if (command == "help" && !args.length) {
				workbench.showMessage([
					":login anonymous  Start an anonymous session",
					":login google     Sign in with Google",
					":join room-name   Open a room (signs in anonymously if needed)",
					":logout           Sign out",
					":clear            Clear the last-line message",
					":NERDTreeToggle   Toggle the file explorer",
					getThemeCommandHelp()
				].join("\n"));
			} else if (command == "clear" && !args.length) {
				workbench.showMessage("");
			} else {
				workbench.showMessage(`E492: Not an editor command: ${value}. Type :help.`, "error");
			}
		} catch (error) {
			if (isActive()) workbench.showMessage(loginErrors[error.code] || error.message || "Command failed. Try again.", "error");
		} finally {
			if (isActive()) {
				this.setBusy(false);
				workbench.focusEditor();
			}
		}
	}
}

customElements.define("vim-login", VimLogin);
