import BaseComponent from "../../../components/base-component.js";
import { authService } from "../../../api/firebase.js";
import router from "../../../utils/router.js";

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
		this.history = [];
		this.historyIndex = 0;
		this.historyDraft = "";
		this.connectionId = 0;
		this.isComposing = false;
	}

	connectedCallback() {
		this.connectionId += 1;
		this.user = authService.getCurrentUser();
		super.connectedCallback();
		this.authUnsubscribe = authService.onUserChange((user) => {
			this.user = user;
			this.updateSession();
		});
	}

	disconnectedCallback() {
		this.connectionId += 1;
		super.disconnectedCallback();
		this.authUnsubscribe?.();
		this.authUnsubscribe = null;
	}

	render() {
		if (this.querySelector(".vim-cli-form")) {
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
			'<span class="vim-token-comment">" Sign in from the command line below.</span>',
			'<span class="vim-token-comment">" :login anonymous  — anonymous session</span>',
			'<span class="vim-token-comment">" :login google     — Google sign-in</span>',
			'<span class="vim-token-comment">" :join daily-scrum — open a room</span>',
			"",
			'<span class="vim-token-command">function!</span> <span class="vim-token-function">StartSession</span>(room) <span class="vim-token-command">abort</span>',
			'  <span class="vim-token-comment">" Enter :help for all available commands.</span>',
			'<span class="vim-token-command">endfunction</span>'
		];

		this.innerHTML = `
			<vim-workbench filename=".vimrc" mode="NORMAL" position="1,1" command=":help — login and room commands">
				<div class="vim-editor vim-login-editor" aria-label="Vim configuration">
					${lines.map((line, index) => `
						<div class="vim-code-line">
							<span class="vim-line-number" aria-hidden="true">${index + 1}</span>
							<span class="vim-line-content">${line || " "}</span>
						</div>
					`).join("")}
					<div class="vim-filler" aria-hidden="true">${"<span>~</span>".repeat(12)}</div>
				</div>
				<section class="vim-login-cli" aria-label="Login command line">
					<div class="vim-cli-output" role="log" aria-live="polite" aria-relevant="additions text"></div>
					<form class="vim-cli-form">
						<label class="vim-cli-prompt" for="vim-command-input">:</label>
						<input class="vim-cli-input" id="vim-command-input" type="text" placeholder="login anonymous" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Vim command" aria-describedby="vim-command-help" maxlength="240" />
						<button class="vim-cli-submit" type="submit">Enter ↵</button>
					</form>
					<span id="vim-command-help" class="vim-command-help">:login anonymous · :login google · :join room-name · :help</span>
				</section>
			</vim-workbench>
		`;

		const form = this.querySelector(".vim-cli-form");
		const input = this.querySelector(".vim-cli-input");
		form.addEventListener("submit", (event) => this.runCommand(event));
		input.addEventListener("compositionstart", () => this.isComposing = true);
		input.addEventListener("compositionend", () => this.isComposing = false);
		input.addEventListener("keydown", (event) => {
			if (event.isComposing || this.isComposing || event.keyCode == 229) return;
			if (event.key == "Enter") {
				event.preventDefault();
				if (!event.repeat) form.requestSubmit();
			} else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
				if (!this.history.length) return;
				event.preventDefault();
				if (this.historyIndex == this.history.length) this.historyDraft = input.value;
				this.historyIndex = Math.max(0, Math.min(this.history.length, this.historyIndex + (event.key == "ArrowUp" ? -1 : 1)));
				input.value = this.history[this.historyIndex] ?? this.historyDraft;
				input.setSelectionRange(input.value.length, input.value.length);
			}
		});
		input.addEventListener("focus", () => this.querySelector("vim-workbench")?.setAttribute("mode", "COMMAND"));
		input.addEventListener("blur", () => this.querySelector("vim-workbench")?.setAttribute("mode", "NORMAL"));
		this.appendOutput("Vim / Retrobox — type :help to get started.");
		this.updateSession();
	}

	updateSession() {
		const userName = this.user ? this.user.displayName || "Anonymous" : "not authenticated";
		const session = this.querySelector("[data-vim-session]");
		if (session) session.textContent = `'${userName.replaceAll("'", "''")}'`;
		this.querySelector("vim-workbench")?.setAttribute("status", this.user ? `signed in: ${userName}` : "not authenticated");
	}

	appendOutput(text, type = "") {
		const output = this.querySelector(".vim-cli-output");
		if (!output) return;
		const line = document.createElement("div");
		line.className = `vim-cli-line${type ? ` vim-cli-${type}` : ""}`;
		line.textContent = text;
		output.appendChild(line);
		while (output.children.length > 80) output.firstElementChild.remove();
		output.scrollTop = output.scrollHeight;
	}

	setBusy(busy) {
		this.busy = busy;
		this.querySelector(".vim-cli-form")?.setAttribute("aria-busy", String(busy));
		const input = this.querySelector(".vim-cli-input");
		const button = this.querySelector(".vim-cli-submit");
		if (input) input.disabled = busy;
		if (button) {
			button.disabled = busy;
			button.textContent = busy ? "Working…" : "Enter ↵";
		}
	}

	async runCommand(event) {
		event.preventDefault();
		if (this.busy || this.isComposing) return;
		const input = this.querySelector(".vim-cli-input");
		const value = input.value.trim().replace(/^:/, "").trim();
		if (!value) return;
		const [command, ...args] = value.split(/\s+/);
		const connectionId = this.connectionId;
		const isActive = () => this.isConnected && this.connectionId == connectionId;

		this.history.push(value);
		if (this.history.length > 50) this.history.shift();
		this.historyIndex = this.history.length;
		this.historyDraft = "";
		input.value = "";
		this.appendOutput(`:${value}`);

		try {
			if ((command == "login" && args.length <= 1) || (command == "anon" && !args.length)) {
				const provider = command == "anon" ? "anonymous" : args[0] || "anonymous";
				if (provider != "anonymous" && provider != "anon" && provider != "google") {
					this.appendOutput("Usage: :login anonymous | :login google", "error");
					return;
				}
				this.setBusy(true);
				this.appendOutput(provider == "google" ? "Opening Google sign-in…" : "Starting anonymous session…");
				const credential = await (provider == "google" ? authService.loginGoogle() : authService.loginAnonymously());
				if (!isActive()) return;
				this.user = credential.user;
				this.updateSession();
				this.appendOutput(`Signed in as ${this.user.displayName || "Anonymous"}. Enter :join room-name to continue.`, "success");
			} else if (command == "logout" && !args.length) {
				this.setBusy(true);
				await authService.logout();
				if (!isActive()) return;
				this.user = null;
				this.updateSession();
				this.appendOutput("Signed out. Enter :login anonymous or :login google.", "success");
			} else if (command == "join") {
				const roomName = args[0];
				if (args.length != 1 || !roomName || /[/?#\\%\u0000-\u0020\u007f]/.test(roomName) || roomName == "." || roomName == "..") {
					this.appendOutput("Usage: :join room-name (one name without spaces, /, ?, # or %)", "error");
					return;
				}
				this.setBusy(true);
				this.appendOutput(`Opening ${roomName}/.vimrc…`);
				await authService.ensureAnonymousUser();
				if (isActive()) router.navigateTo(`/${roomName}`);
			} else if (command == "help" && !args.length) {
				this.appendOutput(":login anonymous  Start an anonymous session");
				this.appendOutput(":login google     Sign in with Google");
				this.appendOutput(":join room-name   Open a room (signs in anonymously if needed)");
				this.appendOutput(":logout           Sign out");
				this.appendOutput(":clear            Clear command output");
				this.appendOutput("↑ / ↓             Previous / next command");
			} else if (command == "clear" && !args.length) {
				this.querySelector(".vim-cli-output").replaceChildren();
			} else {
				this.appendOutput(`E492: Not an editor command: ${value}. Type :help.`, "error");
			}
		} catch (error) {
			if (isActive()) this.appendOutput(loginErrors[error.code] || error.message || "Command failed. Try again.", "error");
		} finally {
			if (isActive()) {
				this.setBusy(false);
				input.focus();
			}
		}
	}
}

customElements.define("vim-login", VimLogin);
