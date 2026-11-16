import "../../../components/theme-switcher.js";

export default class VimWorkbench extends HTMLElement {
	static get observedAttributes() {
		return ["filename", "mode", "position", "busy"];
	}

	constructor() {
		super();
		this.treeMedia = window.matchMedia("(min-width: 768px)");
		this.handleTreeResize = () => this.updateTreeState();
		this.handleKeydown = (event) => this.handleCommandKeydown(event);
		this.handleScroll = () => this.updateStatus();
		this.commandHistory = [];
		this.historyIndex = 0;
		this.historyDraft = "";
		this.message = "";
		this.messageType = "";
		this.isComposing = false;
	}

	connectedCallback() {
		if (!this.querySelector(".vim-workbench")) {
			const children = Array.from(this.childNodes);
			this.render();
			this.querySelector(".vim-buffer").append(...children);
		}

		this.treeMedia.addEventListener("change", this.handleTreeResize);
		this.addEventListener("keydown", this.handleKeydown);
		this.querySelector(".vim-editor")?.addEventListener("scroll", this.handleScroll, { passive: true });
		this.updateTreeState();
		this.updateStatus();
	}

	disconnectedCallback() {
		this.treeMedia.removeEventListener("change", this.handleTreeResize);
		this.removeEventListener("keydown", this.handleKeydown);
		this.querySelector(".vim-editor")?.removeEventListener("scroll", this.handleScroll);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == "mode" && oldValue != newValue) {
			this.message = "";
			this.messageType = "";
		}
		this.updateStatus();
		if (name == "mode" && oldValue != newValue && this.isConnected) {
			this.dispatchEvent(new CustomEvent("vim-mode-change", {
				bubbles: true,
				detail: { mode: newValue || "NORMAL" }
			}));
		}
	}

	updateTreeState() {
		const tree = this.querySelector(".vim-tree");
		if (!tree) return;
		const isExpanded = !tree.classList.contains("vim-tree-hidden") && (tree.classList.contains("vim-tree-open") || this.treeMedia.matches);
		this.dataset.treeOpen = String(isExpanded);
		this.updateStatus();
	}

	setTreeVisibility(visible) {
		const tree = this.querySelector(".vim-tree");
		tree.classList.toggle("vim-tree-open", visible);
		tree.classList.toggle("vim-tree-hidden", !visible);
		this.updateTreeState();
	}

	updateStatus() {
		const mode = this.getAttribute("mode") || "NORMAL";
		const editor = this.querySelector(".vim-editor");
		let progress = "All";
		if (editor && editor.scrollHeight > editor.clientHeight + 1) {
			if (editor.scrollTop <= 1) progress = "Top";
			else if (editor.scrollTop + editor.clientHeight >= editor.scrollHeight - 1) progress = "Bot";
			else progress = `${Math.round(editor.scrollTop / (editor.scrollHeight - editor.clientHeight) * 100)}%`;
		}
		const values = {
			filename: this.getAttribute("filename") || ".vimrc",
			position: `${this.getAttribute("position") || "1,1"}    ${progress}`
		};
		Object.entries(values).forEach(([name, value]) => {
			this.querySelectorAll(`[data-vim-${name}]`).forEach(element => element.textContent = value);
		});
		this.dataset.mode = mode.toLowerCase();
		const input = this.querySelector(".vim-command-input");
		const display = this.querySelector(".vim-command-display");
		if (!input || !display) return;
		input.hidden = mode != "COMMAND";
		input.disabled = this.getAttribute("busy") == "true";
		display.hidden = mode == "COMMAND";
		display.textContent = this.message || (mode == "INSERT" ? "-- INSERT --" : "");
		display.classList.toggle("vim-command-error", this.messageType == "error");
		this.querySelector(".vim-commandline").setAttribute("aria-busy", String(input.disabled));
	}

	showMessage(text, type = "") {
		this.message = String(text);
		this.messageType = type;
		this.updateStatus();
	}

	focusEditor() {
		this.querySelector(".vim-editor")?.focus({ preventScroll: true });
	}

	openCommandLine(value = "") {
		if (this.getAttribute("busy") == "true") return;
		this.setAttribute("mode", "COMMAND");
		const input = this.querySelector(".vim-command-input");
		input.value = value;
		this.historyIndex = this.commandHistory.length;
		this.historyDraft = value;
		input.focus({ preventScroll: true });
		input.setSelectionRange(value.length, value.length);
	}

	closeCommandLine() {
		this.querySelector(".vim-command-input").value = "";
		this.setAttribute("mode", "NORMAL");
		this.focusEditor();
	}

	handleCommandKeydown(event) {
		if (event.defaultPrevented || event.isComposing || this.isComposing || event.keyCode == 229) return;
		const input = this.querySelector(".vim-command-input");
		if (event.target == input) {
			if (event.key == "Escape" || (event.ctrlKey && (event.key == "[" || event.key.toLowerCase() == "c"))) {
				event.preventDefault();
				this.closeCommandLine();
			} else if (event.key == "Enter") {
				event.preventDefault();
				if (!event.repeat) this.executeCommand();
			} else if (event.key == "Backspace" && (!input.value || (input.value == ":" && input.selectionStart == 1 && input.selectionEnd == 1))) {
				event.preventDefault();
				this.closeCommandLine();
			} else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
				if (!this.commandHistory.length) return;
				event.preventDefault();
				if (this.historyIndex == this.commandHistory.length) this.historyDraft = input.value;
				this.historyIndex = Math.max(0, Math.min(this.commandHistory.length, this.historyIndex + (event.key == "ArrowUp" ? -1 : 1)));
				input.value = this.commandHistory[this.historyIndex] ?? this.historyDraft;
				input.setSelectionRange(input.value.length, input.value.length);
			}
			return;
		}

		if (
			(this.getAttribute("mode") || "NORMAL") == "NORMAL" && event.key == ":" &&
			!event.ctrlKey && !event.metaKey && !event.altKey &&
			!event.target.closest("input, textarea, select, button, a, [contenteditable]")
		) {
			event.preventDefault();
			this.openCommandLine(":");
		}
	}

	executeCommand() {
		if (this.isComposing || this.getAttribute("busy") == "true") return;
		const value = this.querySelector(".vim-command-input").value.trim();
		this.closeCommandLine();
		if (!value || value == ":") return;
		if (!value.startsWith(":")) {
			this.showMessage(`E492: Not an editor command: ${value}`, "error");
			return;
		}

		this.commandHistory.push(value);
		if (this.commandHistory.length > 50) this.commandHistory.shift();
		const command = value.slice(1).trim();
		if (command == "NERDTreeToggle") this.setTreeVisibility(this.dataset.treeOpen != "true");
		else if (command == "NERDTree") this.setTreeVisibility(true);
		else if (command == "NERDTreeClose") this.setTreeVisibility(false);
		else if (command.startsWith("colorscheme ")) {
			const scheme = command.slice("colorscheme ".length).trim();
			if (scheme != "retrobox") this.showMessage(`E185: Cannot find color scheme '${scheme}'`, "error");
		} else {
			this.dispatchEvent(new CustomEvent("vim-command", {
				bubbles: true,
				detail: { command: value }
			}));
		}
	}

	render() {
		this.innerHTML = `
			<div class="vim-workbench">
				<div class="vim-theme-control">
					<theme-switcher style="position: static; display: block; width: 80px; height: 24px;"></theme-switcher>
				</div>
				<div class="vim-layout">
					<aside class="vim-tree" id="vim-nerdtree" aria-label="NERDTree file explorer">
						<div class="vim-tree-help">" NERDTree (1)</div>
						<div class="vim-tree-up">.. (up a dir)</div>
						<button type="button" class="vim-tree-root" aria-expanded="true">▾ ~/workspace/</button>
						<div class="vim-tree-entries">
							<details open>
								<summary class="vim-tree-directory">.vim/</summary>
								<details open>
									<summary class="vim-tree-directory">colors/</summary>
									<div class="vim-tree-file">retrobox.vim</div>
								</details>
								<details>
									<summary class="vim-tree-directory">plugged/</summary>
									<div class="vim-tree-file">nerdtree/</div>
								</details>
							</details>
							<button type="button" class="vim-tree-current" aria-label="Focus .vimrc editor">  .vimrc</button>
						</div>
						<div class="vim-tree-spacer"></div>
						<div class="vim-tree-status">NERD_tree_1</div>
					</aside>
					<div class="vim-buffer-pane">
						<main class="vim-buffer" aria-label="Vim editor"></main>
						<div class="vim-window-status"><span data-vim-filename>.vimrc</span><span data-vim-position>1,1    All</span></div>
					</div>
				</div>
				<form class="vim-commandline" tabindex="0" aria-label="Vim command line">
					<span class="vim-command-display" role="status" aria-live="polite"></span>
					<input class="vim-command-input" type="text" aria-label="Vim command" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="240" hidden />
					<span class="vim-ruler" data-vim-position>1,1    All</span>
				</form>
			</div>
		`;

		this.querySelector(".vim-tree-root").addEventListener("click", (event) => {
			const isExpanded = event.currentTarget.getAttribute("aria-expanded") == "true";
			event.currentTarget.setAttribute("aria-expanded", String(!isExpanded));
			event.currentTarget.textContent = `${isExpanded ? "▸" : "▾"} ~/workspace/`;
			this.querySelector(".vim-tree-entries").hidden = isExpanded;
		});
		this.querySelector(".vim-tree-current").addEventListener("click", () => this.focusEditor());
		const form = this.querySelector(".vim-commandline");
		const input = this.querySelector(".vim-command-input");
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.executeCommand();
		});
		form.addEventListener("pointerdown", (event) => {
			if (event.target == input) return;
			event.preventDefault();
			this.openCommandLine();
		});
		input.addEventListener("compositionstart", () => this.isComposing = true);
		input.addEventListener("compositionend", () => this.isComposing = false);
	}
}

customElements.define("vim-workbench", VimWorkbench);
