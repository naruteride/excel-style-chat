import BaseComponent from "../../../components/base-component.js";
import VscodeMonacoWorkbench from "../components/vscode-monaco-workbench.js";
import VscodePartMain from "../components/vscode-part-main.js";

const escapeAttribute = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll('"', "&quot;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;");

export default class VscodeChat extends BaseComponent {
	constructor() {
		super();
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		super.connectedCallback();
	}

	render() {
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		const roomName = escapeAttribute(this.roomName);

		this.innerHTML = `
			<vscode-monaco-workbench mode="chat" room="${roomName}">
				<vscode-part-main mode="chat" room="${roomName}"></vscode-part-main>
			</vscode-monaco-workbench>
		`;
	}
}

customElements.define("vscode-chat", VscodeChat);
