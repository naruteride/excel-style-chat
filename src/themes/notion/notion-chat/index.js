import BaseComponent from "/src/components/base-component.js";

export default class NotionChat extends BaseComponent {
	constructor() {
		super();
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		super.connectedCallback();
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";
		this.innerHTML = "";
	}
}

customElements.define("notion-chat", NotionChat);
