import BaseComponent from "../../../components/base-component.js";
import VscodeSplitViewContainer from "../components/vscode-split-view-container.js";

export default class VscodeChat extends BaseComponent {
	constructor() {
		super();
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		super.connectedCallback();
	}

	render() {
		this.style.cssText = "width: 100%; height: 100%;";
		this.innerHTML = `
			<vscode-split-view-container></vscode-split-view-container>
		`;
	}
}

customElements.define("vscode-chat", VscodeChat);
