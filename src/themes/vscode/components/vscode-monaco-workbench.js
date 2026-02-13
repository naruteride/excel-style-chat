import VscodeSplitViewView from "./vscode-split-view-view.js";
import VscodePartBanner from "./vscode-part-banner.js";
import VscodePartTitlebar from "./vscode-part-titlebar.js";
import VscodePartStatusbar from "./vscode-part-statusbar.js";

export default class VscodeMonacoWorkbench extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.classList.add("monaco-enable-motion", "monaco-workbench", "windows", "web", "chromium", "nopanel", "noauxiliarybar", "file-icons-enabled", "vs-dark", "vscode-theme-defaults-themes-dark_plus-json");
		this.style.cssText = "display: block; width: 100%; height: 100%;";

		this.innerHTML = `
			<div class="split-view-container" style="overflow: hidden;">
				<vscode-split-view-view style="top: 0px; height: 26px;">
					<vscode-part-banner></vscode-part-banner>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: 26px; height: 35px;">
					<vscode-part-titlebar></vscode-part-titlebar>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: 61px; height: ${window.innerHeight - 83}px;">
					<slot></slot>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: ${window.innerHeight - 22}px; height: 22px;">
					<footer is="vscode-part-statusbar"></footer>
				</vscode-split-view-view>
			</div>
		`;
	}
}

customElements.define("vscode-monaco-workbench", VscodeMonacoWorkbench);