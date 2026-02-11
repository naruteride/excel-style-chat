export default class VscodeSplitViewView extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.classList.add("split-view-view");
		this.style.cssText = this.getAttribute("style") || "";
	}
}

customElements.define("vscode-split-view-view", VscodeSplitViewView);