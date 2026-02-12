import BaseComponent from "../../../components/base-component.js";
import VscodeMonacoWorkbench from "../components/vscode-monaco-workbench.js";

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
		this.innerHTML = `
			<vscode-monaco-workbench></vscode-monaco-workbench>
		`;
	}
}

customElements.define("vscode-chat", VscodeChat);
