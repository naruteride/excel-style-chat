export default class NotionMenu extends HTMLMenuElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; white-space: nowrap; overflow: auto hidden;";
        this.innerHTML = `
		`;
    }
}

customElements.define("notion-menu", NotionMenu, { extends: "menu" });