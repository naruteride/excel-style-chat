import VscodeSplitViewView from "./vscode-split-view-view.js";
import VscodePartBanner from "./vscode-part-banner.js";
import VscodePartTitlebar from "./vscode-part-titlebar.js";
import VscodePartStatusbar from "./vscode-part-statusbar.js";

export default class VscodeMonacoWorkbench extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// 쉐도우 돔 형식으로 진행하려 했는데, 그러면 글로벌 CSS 영향을 받지 못 해서 그냥 라이트 돔으로 진행함.
		// 렌더링 전 자식 엘리먼트들을 저장
		const children = Array.from(this.childNodes);

		this.render();

		// 렌더링 후 자식 엘리먼트들을 slot에 추가
		this.querySelector(".slot").replaceWith(...children);
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
					<div class="slot"></div>
				</vscode-split-view-view>

				<vscode-split-view-view style="top: ${window.innerHeight - 22}px; height: 22px;">
					<footer is="vscode-part-statusbar"></footer>
				</vscode-split-view-view>
			</div>
		`;
	}
}

customElements.define("vscode-monaco-workbench", VscodeMonacoWorkbench);