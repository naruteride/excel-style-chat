export default class NotionPath extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; background: #f9fbfd; border-bottom: 1px solid #f9fbfd; margin-bottom: -1px; white-space: nowrap; overflow: hidden;";
		this.innerHTML = `
		`;
	}
}

customElements.define("notion-path", NotionPath, { extends: "nav" });