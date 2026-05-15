import VscodeSplitViewView from "./vscode-split-view-view.js";
import VscodePartBanner from "./vscode-part-banner.js";
import VscodePartTitlebar from "./vscode-part-titlebar.js";
import VscodePartStatusbar from "./vscode-part-statusbar.js";

const escapeAttribute = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll('"', "&quot;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;");

export default class VscodeMonacoWorkbench extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const children = Array.from(this.childNodes);
		this.render();
		this.querySelector(".slot").replaceWith(...children);
	}

	render() {
		this.classList.add("monaco-enable-motion", "monaco-workbench", "windows", "web", "chromium", "nopanel", "noauxiliarybar", "file-icons-enabled", "vs-dark", "vscode-theme-defaults-themes-dark_plus-json");
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		const contextAttributes = [
			["mode", this.getAttribute("mode") || "login"],
			["room", this.getAttribute("room") || ""],
			["user-name", this.getAttribute("user-name") || ""],
			["authenticated", this.getAttribute("authenticated") || "false"],
		]
			.map(([name, value]) => `${name}="${escapeAttribute(value)}"`)
			.join(" ");

		this.innerHTML = `
			<div class="split-view-container" style="overflow: hidden; height: 100%;">
				<vscode-split-view-view style="top: 0px; height: 26px;">
					<vscode-part-banner></vscode-part-banner>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: 26px; height: 35px;">
					<vscode-part-titlebar ${contextAttributes}></vscode-part-titlebar>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: 61px; height: calc(100% - 83px);">
					<div class="slot"></div>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: calc(100% - 22px); height: 22px;">
					<vscode-part-statusbar ${contextAttributes}></vscode-part-statusbar>
				</vscode-split-view-view>
			</div>
		`;
	}
}

customElements.define("vscode-monaco-workbench", VscodeMonacoWorkbench);
