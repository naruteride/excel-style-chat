import "../vscode-chat/components/vscode-chat-editor.js";

const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

export default class VscodePartMain extends HTMLElement {
	static get observedAttributes() {
		return ["mode", "room", "user-name", "authenticated"];
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

	get mode() {
		return this.getAttribute("mode") || "login";
	}

	get roomName() {
		return this.getAttribute("room") || "workspace";
	}

	render() {
		const isChat = this.mode == "chat";
		const roomName = escapeHtml(this.roomName);

		this.classList.add("monaco-grid-branch-node");
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		this.innerHTML = `
			<div class="monaco-split-view2 horizontal vscode-stealth-main">
				<div class="sash-container">
					<div class="monaco-sash vertical disabled" style="left: 48px;"></div>
					<div class="monaco-sash vertical" style="left: 348px;"></div>
				</div>
				<div class="monaco-scrollable-element" role="presentation" style="position: relative; overflow: hidden;">
					<div class="split-view-container" style="overflow: hidden;">
						${this.renderActivityBar()}
						${this.renderSidebar(isChat, roomName)}
						${this.renderEditor(isChat, roomName)}
					</div>
				</div>
			</div>
		`;
	}

	renderActivityBar() {
		const topIcons = [
			["codicon-explorer-view-icon", "Explorer", true],
			["codicon-search-view-icon", "Search", false],
			["codicon-source-control-view-icon", "Source Control", false],
			["codicon-run-view-icon", "Run and Debug", false],
			["codicon-extensions-view-icon", "Extensions", false],
		];

		return `
			<div class="split-view-view visible" style="left: 0px; width: 48px;">
				<div class="part activitybar left" id="workbench.parts.activitybar" role="none" style="background-color: rgb(51, 51, 51);">
					<div class="content vscode-activitybar-content">
						<div class="menubar compact inactive overflow-menu-only" role="menubar">
							<div class="menubar-menu-button" role="menuitem" tabindex="0" aria-label="Application Menu" aria-haspopup="true">
								<div class="menubar-menu-title toolbar-toggle-more codicon codicon-menubar-more" role="none" aria-hidden="true"></div>
							</div>
						</div>
						<div class="composite-bar">
							<div class="monaco-action-bar vertical">
								<ul class="actions-container" role="tablist" aria-label="Active View Switcher">
									${topIcons.map(([icon, label, checked]) => `
										<li class="action-item icon ${checked ? "checked" : ""}" role="tab" aria-selected="${checked}" tabindex="${checked ? "0" : "-1"}">
											<a class="action-label codicon ${icon}" aria-label="${label}" style="color: ${checked ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.4)"};"></a>
											<div class="active-item-indicator"></div>
										</li>
									`).join("")}
								</ul>
							</div>
						</div>
						<div class="vscode-activitybar-bottom">
							<div class="monaco-action-bar vertical">
								<ul class="actions-container" role="toolbar" aria-label="Manage">
									<li class="action-item icon" role="button" tabindex="0">
										<a class="action-label codicon codicon-accounts-view-bar-icon" aria-label="Accounts" style="color: rgba(255, 255, 255, 0.4);"></a>
									</li>
									<li class="action-item icon" role="button" tabindex="-1">
										<a class="action-label codicon codicon-settings-view-bar-icon" aria-label="Manage" style="color: rgba(255, 255, 255, 0.4);"></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderSidebar(isChat, roomName) {
		return `
			<div class="split-view-view visible" style="left: 48px; width: 300px;">
				<div class="part sidebar left pane-composite-part" id="workbench.parts.sidebar" role="none" style="background-color: rgb(37, 37, 38); outline-color: rgba(83, 89, 93, 0.5); height: 100%;">
					<div class="composite title has-actions">
						<div class="title-label">
							<h2 custom-hover="true" draggable="true" style="color: rgb(187, 187, 187);">Explorer</h2>
						</div>
						<div class="title-actions">
							<div class="monaco-toolbar">
								<div class="monaco-action-bar has-overflow">
									<ul class="actions-container" role="toolbar" aria-label="Explorer actions">
										<li class="action-item" role="presentation">
											<div class="monaco-dropdown">
												<div class="dropdown-label">
													<a class="action-label codicon codicon-toolbar-more" role="button" aria-haspopup="true" aria-expanded="false" aria-label="More actions" tabindex="0"></a>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="content vscode-sidebar-content">
						<div class="composite viewlet explorer-viewlet" id="workbench.view.explorer" style="display: flex; flex-direction: column;">
							<div class="pane expanded vertical" style="flex: 1;">
								<div class="pane-header expanded" tabindex="0" role="button" aria-label="${isChat ? roomName : "No folder opened"} section" aria-expanded="true" style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
									<div class="twisty-container codicon-view-pane-container-expanded codicon"></div>
									<h3 class="title">${isChat ? roomName.toUpperCase() : "NO FOLDER OPENED"}</h3>
								</div>
								<div class="pane-body ${isChat ? "" : "welcome"} vscode-explorer-body">
									${isChat ? this.renderWorkspaceTree(roomName) : this.renderNoFolder()}
								</div>
							</div>
							<div class="pane vertical">
								<div class="pane-header" tabindex="0" role="button" aria-expanded="false" style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
									<div class="twisty-container codicon-view-pane-container-collapsed codicon"></div>
									<h3 class="title">Outline</h3>
								</div>
							</div>
							<div class="pane vertical">
								<div class="pane-header" tabindex="0" role="button" aria-expanded="false" style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
									<div class="twisty-container codicon-view-pane-container-collapsed codicon"></div>
									<h3 class="title">Timeline</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderNoFolder() {
		return `
			<div class="welcome-view">
				<div class="welcome-view-content">
					<p>You have not yet opened a folder.</p>
					<div class="button-container">
						<a class="monaco-button monaco-text-button" tabindex="0" role="button" aria-disabled="false">Open Folder</a>
					</div>
					<div class="button-container">
						<a class="monaco-button monaco-text-button" tabindex="0" role="button" aria-disabled="false">Open Recent</a>
					</div>
					<p>Use the editor to open a workspace and continue work.</p>
				</div>
			</div>
		`;
	}

	renderWorkspaceTree(roomName) {
		return `
			<div class="vscode-file-tree" role="tree" aria-label="Files">
				<div class="vscode-file-row folder-row" role="treeitem" aria-expanded="true">
					<span class="codicon codicon-folder-opened"></span>
					<span>${roomName}</span>
				</div>
				<div class="vscode-file-row file-row selected" role="treeitem" aria-selected="true">
					<span class="codicon codicon-markdown"></span>
					<span>daily-log.md</span>
				</div>
				<div class="vscode-file-row file-row" role="treeitem">
					<span class="codicon codicon-json"></span>
					<span>settings.json</span>
				</div>
			</div>
		`;
	}

	renderEditor(isChat, roomName) {
		return `
			<div class="split-view-view visible" style="left: 348px; width: calc(100% - 348px);">
				<div class="monaco-grid-branch-node vscode-editor-branch">
					<div class="part editor" id="workbench.parts.editor" role="main">
						<div class="content" data-keybinding-context="1" style="overflow: hidden; background-color: rgb(30, 30, 30); width: 100%; height: 100%;">
							<div class="editor-group-container active">
								${this.renderTabs(isChat)}
								<div class="editor-container" style="background-color: rgb(30, 30, 30);">
									<div class="editor-instance">
										${isChat ? this.renderChatEditor(roomName) : this.renderLoginEditor()}
									</div>
								</div>
							</div>
						</div>
					</div>
					${this.renderPanel()}
				</div>
			</div>
		`;
	}

	renderTabs(isChat) {
		const label = isChat ? "daily-log.md" : "Start";
		const iconClass = isChat ? "markdown-name-file-icon" : "vscode_getting_started_page-name-file-icon";

		return `
			<div class="title tabs show-file-icons" style="--editor-group-tab-height: 35px; background-color: rgb(37, 37, 38);">
				<div class="tabs-and-actions-container">
					<div class="monaco-scrollable-element" role="presentation" style="position: relative; overflow: hidden;">
						<div class="tabs-container" role="tablist" draggable="true" style="overflow: hidden;">
							<div class="tab tab-actions-right sizing-fit active selected has-icon" draggable="true" role="tab" aria-label="${label}, Preview" aria-selected="true" tabindex="0" style="left: auto; border-right: 1px solid rgb(37, 37, 38);">
								<div class="tab-border-top-container"></div>
								<div class="monaco-icon-label file-icon ${iconClass} tab-label tab-label-has-badge italic" aria-label="${label}">
									<div class="monaco-icon-label-container">
										<span class="monaco-icon-name-container">
											<a class="label-name">${label}</a>
										</span>
									</div>
								</div>
								<div class="tab-actions">
									<div class="monaco-action-bar">
										<ul class="actions-container" role="toolbar" aria-label="Tab actions">
											<li class="action-item" role="presentation">
												<a class="action-label codicon codicon-close" role="button" aria-label="Close" tabindex="0"></a>
											</li>
										</ul>
									</div>
								</div>
								<div class="tab-border-bottom-container"></div>
							</div>
						</div>
					</div>
					<div class="editor-actions">
						<div class="monaco-toolbar">
							<div class="monaco-action-bar has-overflow">
								<ul class="actions-container highlight-toggled" role="toolbar" aria-label="Editor actions">
									<li class="action-item menu-entry" role="presentation">
										<a class="action-label codicon codicon-split-horizontal" role="button" aria-label="Split Editor" tabindex="0"></a>
									</li>
									<li class="action-item" role="presentation">
										<div class="monaco-dropdown">
											<div class="dropdown-label">
												<a class="action-label codicon codicon-toolbar-more" role="button" aria-haspopup="true" aria-expanded="false" aria-label="More actions" tabindex="-1"></a>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderLoginEditor() {
		const userName = this.getAttribute("user-name") || "Anonymous";
		const authenticated = this.getAttribute("authenticated") == "true";

		return `
			<div class="gettingStartedContainer animatable width-semi-constrained vscode-login-editor" role="document" tabindex="0" aria-label="Getting Started">
				<div class="gettingStarted showCategories">
					<div class="gettingStartedSlideCategories gettingStartedSlide">
						<div class="gettingStartedCategoriesContainer">
							<div class="header">
								<h1 class="product-name caption">Visual Studio Code</h1>
								<p class="subtitle description">Editing evolved</p>
							</div>
							<div class="categories-column categories-column-left">
								<div class="index-list start-container">
									<h2>Start</h2>
									<ul>
										<li>
											<button type="button" class="button-link" id="btn-anonymous">
												<div class="codicon codicon-account icon-widget"></div>
												<span>Sign in anonymously</span>
											</button>
										</li>
										<li>
											<button type="button" class="button-link" id="btn-google">
												<div class="codicon codicon-github icon-widget"></div>
												<span>Sign in with Google</span>
											</button>
										</li>
										${authenticated ? `
											<li>
												<button type="button" class="button-link" id="btn-logout">
													<div class="codicon codicon-sign-out icon-widget"></div>
													<span>Sign out ${escapeHtml(userName)}</span>
												</button>
											</li>
										` : ""}
									</ul>
								</div>
							</div>
							<div class="categories-column categories-column-right">
								<div class="index-list getting-started">
									<h2>Recent</h2>
									<form id="form-join" class="vscode-open-workspace-form">
										<label for="room-input">Open workspace</label>
										<div class="vscode-command-input">
											<span class="codicon codicon-search"></span>
											<input id="room-input" autocomplete="off" placeholder="project-alpha" />
										</div>
										<button type="submit" class="monaco-button monaco-text-button">Open Workspace</button>
									</form>
									<p class="vscode-login-state">${authenticated ? `Signed in as ${escapeHtml(userName)}` : "No account is currently signed in."}</p>
								</div>
							</div>
							<div class="footer">
								<p class="telemetry-notice">Code collects usage data. Read the privacy statement and learn how to opt out.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderChatEditor(roomName) {
		return `<vscode-chat-editor room="${roomName}"></vscode-chat-editor>`;
	}

	renderPanel() {
		return `
			<div class="part panel basepanel bottom pane-composite-part" id="workbench.parts.panel" role="none" style="display: none; background-color: rgb(30, 30, 30);">
				<div class="content"></div>
			</div>
		`;
	}
}

customElements.define("vscode-part-main", VscodePartMain);
