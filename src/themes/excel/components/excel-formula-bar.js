import ExcelDropdownIcon from "./excel-dropdown-icon";

class ExcelFormulaBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; align-items: center; justify-content: space-between; background-color: #fff;";
		this.innerHTML = `
			<button id="name-box" style="display: flex; align-items: center; margin: 0.125rem 0.375rem; font-size: 0.813rem;>
				<span style="padding: 0.375rem;">C93</span>
				<excel-dropdown-icon></excel-dropdown-icon>
			</button>
		`;
	}
}

customElements.define("excel-formula-bar", ExcelFormulaBar);
export default ExcelFormulaBar;