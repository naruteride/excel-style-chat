import ExcelMenu from "./excel-menu.js";
import ExcelToolbar from "./excel-toolbar.js";
import ExcelFormulaBar from "./excel-formula-bar.js";

class ExcelHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; background: #f9fbfd; border-bottom: 1px solid #f9fbfd; margin-bottom: -1px; white-space: nowrap; overflow: hidden;";
		this.innerHTML = `
			<!-- Menu -->
			<menu is="excel-menu" room="${this.getAttribute("room")}"></menu>

			<!-- Toolbar -->
			<excel-toolbar></excel-toolbar>

			<!-- Formula Bar -->
			<excel-formula-bar></excel-formula-bar>
		`;
	}
}

customElements.define("excel-header", ExcelHeader, { extends: "header" });
export default ExcelHeader;