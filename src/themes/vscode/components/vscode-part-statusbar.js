const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

export default class VscodePartStatusbar extends HTMLElement {
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
		const workspaceItem = isChat
			? `<div class="statusbar-item left" id="status.workspace" aria-label="Workspace ${escapeHtml(roomName)}" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1">
						<span class="codicon codicon-source-control"></span> main
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>`
			: "";
		const rightItems = isChat
			? [
				["status.room", roomName],
				["status.language", "JavaScript"],
				["status.encoding", "UTF-8"],
				["status.position", "Ln 1, Col 1"],
				["status.spaces", "Spaces: 4"],
			]
			: [
				["status.workbench.keyboardLayout", "Keyboard Layout: US"],
			];

		this.id = "workbench.parts.statusbar";
		this.classList.add("part", "statusbar", "status-border-top");
		this.setAttribute("role", "status");
		this.setAttribute("aria-live", "off");
		this.setAttribute("data-keybinding-context", "5");
		this.setAttribute("tabindex", "0");
		this.style.cssText = "display: block; background-color: rgb(0, 122, 204); color: rgb(255, 255, 255); width: 100%; height: 22px;";
		this.innerHTML = `
			<div class="left-items items-container">
				<div class="statusbar-item left first-visible-item" id="status.host" aria-label="remote" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="remote">
						<span class="codicon codicon-remote"></span>
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
				<div class="statusbar-item left last-visible-item" id="status.problems" aria-label="Problems" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="Problems">
						<span class="codicon codicon-error"></span> 0 <span class="codicon codicon-warning"></span> 0
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
				${workspaceItem}
			</div>
			<div class="right-items items-container">
				<div class="statusbar-item right last-visible-item" id="status.notifications" aria-label="Notifications" custom-hover="true">
					<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="Notifications">
						<span class="codicon codicon-bell"></span>
					</a>
					<div class="status-bar-item-beak-container"></div>
				</div>
				${rightItems.map(([id, label], index) => `
					<div class="statusbar-item right ${index == rightItems.length - 1 ? "first-visible-item" : ""}" id="${escapeHtml(id)}" aria-label="${escapeHtml(label)}" custom-hover="true">
						<a class="statusbar-item-label" role="button" tabindex="-1" aria-label="${escapeHtml(label)}">${escapeHtml(label)}</a>
						<div class="status-bar-item-beak-container"></div>
					</div>
				`).join("")}
			</div>
			<style type="text/css" media="screen">
				.monaco-workbench .part.statusbar:focus {
					outline-color: #0078d4;
				}

				.monaco-workbench .part.statusbar > .items-container > .statusbar-item a:focus-visible {
					outline: 1px solid #0078d4;
					outline-offset: -2px;
				}

				.monaco-workbench .part.statusbar > .items-container > .statusbar-item.has-beak > .status-bar-item-beak-container:before {
					border-bottom-color: #2b2b2b;
				}
			</style>
		`;
	}
}

customElements.define("vscode-part-statusbar", VscodePartStatusbar);
