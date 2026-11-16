import "../../../components/theme-switcher.js";

export default class VimWorkbench extends HTMLElement {
	static get observedAttributes() {
		return ["filename", "mode", "status", "position", "command"];
	}

	constructor() {
		super();
		this.treeMedia = window.matchMedia("(min-width: 768px)");
		this.handleTreeResize = () => this.updateTreeState();
	}

	connectedCallback() {
		if (!this.querySelector(".vim-workbench")) {
			const children = Array.from(this.childNodes);
			this.render();
			this.querySelector(".vim-buffer").append(...children);
		}

		this.treeMedia.addEventListener("change", this.handleTreeResize);
		this.updateTreeState();
		this.updateStatus();
	}

	disconnectedCallback() {
		this.treeMedia.removeEventListener("change", this.handleTreeResize);
	}

	attributeChangedCallback() {
		this.updateStatus();
	}

	updateTreeState() {
		const tree = this.querySelector(".vim-tree");
		if (!tree) return;
		const isExpanded = !tree.classList.contains("vim-tree-hidden") && (tree.classList.contains("vim-tree-open") || this.treeMedia.matches);
		this.querySelector(".vim-tree-toggle").setAttribute("aria-expanded", String(isExpanded));
	}

	updateStatus() {
		const values = {
			filename: this.getAttribute("filename") || ".vimrc",
			mode: this.getAttribute("mode") || "NORMAL",
			status: this.getAttribute("status") || "vim",
			position: this.getAttribute("position") || "1,1",
			command: this.getAttribute("command") || ":help  |  Enter to send · Shift+Enter for a new line"
		};
		Object.entries(values).forEach(([name, value]) => {
			this.querySelectorAll(`[data-vim-${name}]`).forEach(element => {
				element.textContent = value;
			});
		});
		this.dataset.mode = values.mode.toLowerCase();
	}

	render() {
		this.innerHTML = `
			<div class="vim-workbench">
				<header class="vim-tabline">
					<button type="button" class="vim-tree-toggle" aria-label="Toggle NERDTree" aria-controls="vim-nerdtree" aria-expanded="true">NERDTree</button>
					<span class="vim-active-tab"><span class="vim-tab-number">1</span> <span data-vim-filename>.vimrc</span></span>
					<span class="vim-tabline-fill">vim</span>
					<theme-switcher style="position: static; display: block; width: 94px; height: 100%;"></theme-switcher>
				</header>
				<div class="vim-layout">
					<aside class="vim-tree" id="vim-nerdtree" aria-label="NERDTree file explorer">
						<div class="vim-tree-help">" Press ? for help</div>
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
					<main class="vim-buffer" aria-label="Vim editor"></main>
				</div>
				<footer class="vim-statusline">
					<span class="vim-mode" data-vim-mode>NORMAL</span>
					<span class="vim-status-filename" data-vim-filename>.vimrc</span>
					<span class="vim-status-detail" data-vim-status>vim</span>
					<span class="vim-status-encoding">utf-8[unix]</span>
					<span class="vim-status-filetype">vim</span>
					<span class="vim-status-position" data-vim-position>1,1</span>
				</footer>
				<div class="vim-commandline" data-vim-command></div>
			</div>
		`;

		const tree = this.querySelector(".vim-tree");
		const toggle = this.querySelector(".vim-tree-toggle");
		toggle.addEventListener("click", () => {
			const isHidden = getComputedStyle(tree).display == "none";
			tree.classList.toggle("vim-tree-open", isHidden);
			tree.classList.toggle("vim-tree-hidden", !isHidden);
			this.updateTreeState();
		});

		this.querySelector(".vim-tree-root").addEventListener("click", (event) => {
			const isExpanded = event.currentTarget.getAttribute("aria-expanded") == "true";
			event.currentTarget.setAttribute("aria-expanded", String(!isExpanded));
			event.currentTarget.textContent = `${isExpanded ? "▸" : "▾"} ~/workspace/`;
			this.querySelector(".vim-tree-entries").hidden = isExpanded;
		});

		this.querySelector(".vim-tree-current").addEventListener("click", () => {
			this.querySelector("textarea, .vim-cli-input")?.focus();
		});
	}
}

customElements.define("vim-workbench", VimWorkbench);
