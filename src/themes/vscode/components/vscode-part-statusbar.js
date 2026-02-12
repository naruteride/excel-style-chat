export default class VscodePartStatusbar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.id = "workbench.parts.statusbar";
		this.classList.add("part", "statusbar", "status-border-top");
		this.setAttribute("role", "status");
		this.setAttribute("aria-live", "off");
		this.setAttribute("data-keybinding-context", "5");
		this.setAttribute("tabindex", "0");
		this.style.cssText = "background-color: rgb(0, 122, 204); color: rgb(255, 255, 255); width: 100%; height: 22px;";
		this.innerHTML = `
			<div class="left-items items-container">
				<div class="statusbar-item left first-visible-item" id="status.host" aria-label="remote" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="remote">
						<span class="codicon codicon-remote"></span>
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
				<div class="statusbar-item left last-visible-item" id="status.problems" aria-label="문제없음" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="문제없음">
						<span class="codicon codicon-error"></span> 0 <span class="codicon codicon-warning"></span> 0
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
			</div>
			<div class="right-items items-container">
				<div class="statusbar-item right last-visible-item" id="status.notifications" aria-label="알림" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="알림">
						<span class="codicon codicon-bell"></span>
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
				<div class="statusbar-item right first-visible-item" id="status.workbench.keyboardLayout" aria-label="배열: US" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="배열: US">
						배열: US
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
			</div>
			<style type="text/css" media="screen">

				/* Status bar focus outline */
				.monaco-workbench .part.statusbar:focus {
					outline-color: #0078d4;
				}

				/* Status bar item focus outline */
				.monaco-workbench .part.statusbar > .items-container > .statusbar-item a:focus-visible {
					outline: 1px solid #0078d4;
					outline-offset: -2px;
				}

				/* Notification Beak */
				.monaco-workbench .part.statusbar > .items-container > .statusbar-item.has-beak > .status-bar-item-beak-container:before {
					border-bottom-color: #2b2b2b;
				}
			</style>
		`;
	}
}

customElements.define("vscode-part-statusbar", VscodePartStatusbar, {extends: "footer"});