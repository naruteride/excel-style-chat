import ThemeSwitcher from "/src/components/theme-switcher.js";

const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

export default class VscodePartTitlebar extends HTMLElement {
	static get observedAttributes() {
		return ["mode", "room"];
	}

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.isConnected) this.render();
	}

	render() {
		const isChat = this.getAttribute("mode") == "chat";
		const roomName = this.getAttribute("room") || "workspace";
		const commandLabel = isChat ? roomName : "Search";
		const windowLabel = isChat ? `${roomName} - daily-log.md - Visual Studio Code` : "Visual Studio Code";

		this.id = "workbench.parts.titlebar";
		this.classList.add("part", "titlebar");
		this.setAttribute("role", "none");
		this.style.cssText = "background-color: rgb(31, 31, 31); color: rgb(157, 157, 157); border-bottom: 1px solid rgb(43, 43, 43); --zoom-factor: 1; width: 100%; height: 35px;";
		this.innerHTML = `
			<div class="titlebar-container has-center">
				<div class="titlebar-left">
					<a class="window-appicon"></a>
					<div class="window-controls-container"></div>
				</div>
				<div class="titlebar-center">
					<div class="window-title">
						<div class="command-center">
							<div class="monaco-toolbar">
								<div class="monaco-action-bar">
									<ul class="actions-container" role="toolbar">
										<li class="action-item disabled menu-entry" role="presentation" custom-hover="true">
											<a class="action-label disabled codicon codicon-arrow-left" role="button" aria-label="Go Back (Alt+LeftArrow)" aria-disabled="true" tabindex="0"></a>
										</li>
										<li class="action-item disabled menu-entry" role="presentation" custom-hover="true">
											<a class="action-label disabled codicon codicon-arrow-right" role="button" aria-label="Go Forward (Alt+RightArrow)" aria-disabled="true" tabindex="-1"></a>
										</li>
										<li style="position: relative;" class="action-item command-center-center" role="presentation" custom-hover="true" tabindex="-1">
											<div class="monaco-toolbar">
												<div class="monaco-action-bar">
													<ul class="actions-container" role="toolbar">
														<li class="action-item command-center-quick-pick" role="button" aria-description="${escapeHtml(windowLabel)}" custom-hover="true" tabindex="0">
															<span aria-hidden="true" class="codicon codicon-search search-icon"></span>
															<span class="search-label">${escapeHtml(commandLabel)}</span>
														</li>
													</ul>
												</div>
											</div>
											<theme-switcher></theme-switcher>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="titlebar-right">
					<div class="action-toolbar-container">
						<div class="monaco-toolbar">
							<div class="monaco-action-bar">
								<ul class="actions-container" role="toolbar" aria-label="Layout controls">
									<li class="action-item menu-entry" role="presentation" custom-hover="true">
										<a class="action-label codicon codicon-configure-layout-icon" role="button" aria-label="Customize Layout" tabindex="0"></a>
									</li>
									<li class="action-item menu-entry" role="presentation" custom-hover="true">
										<a class="action-label checked codicon codicon-panel-left" role="checkbox" aria-label="Toggle Primary Side Bar (Ctrl+B)" aria-checked="true" tabindex="-1"></a>
									</li>
									<li class="action-item menu-entry" role="presentation" custom-hover="true">
										<a class="action-label codicon codicon-panel-layout-icon-off" role="checkbox" aria-label="Toggle Panel (Ctrl+J)" aria-checked="false" tabindex="-1"></a>
									</li>
									<li class="action-item menu-entry" role="presentation" custom-hover="true">
										<a class="action-label codicon codicon-auxiliarybar-right-off-layout-icon" role="checkbox" aria-label="Toggle Secondary Side Bar (Ctrl+Alt+B)" aria-checked="false" tabindex="-1"></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="window-controls-container"></div>
				</div>
			</div>
		`;
	}
}

customElements.define("vscode-part-titlebar", VscodePartTitlebar);
