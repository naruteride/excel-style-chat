import BaseComponent from "/src/components/base-component.js";

export default class NotionLogin extends BaseComponent {
	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";
		this.innerHTML = "";
	}
}

customElements.define("notion-login", NotionLogin);
