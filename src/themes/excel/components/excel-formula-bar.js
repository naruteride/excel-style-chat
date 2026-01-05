import ExcelDropdownIcon from "./excel-dropdown-icon.js";
import ExcelIcon from "./excel-icon.js";

export default class ExcelFormulaBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; align-items: center; justify-content: space-between; background-color: #fff;";
		this.innerHTML = `
			<button id="name-box" style="display: flex; align-items: center; padding: 0.125rem 0.375rem; font-size: 0.813rem; width: 6.625rem;">
				<span style="flex: 1; padding: 0.125rem 0.5rem; text-align: left;">C93</span>
				<excel-dropdown-icon></excel-dropdown-icon>
			</button>
			<hr is="excel-formula-bar-hr">
			<div id="excel-formula-bar-separator" style="flex: 1; display: flex; align-items: center;">
				<div id="t-formula-bar-label" style="width: 35px; display: flex; justify-content: center; align-items: center; opacity: 0.55;">
					<excel-icon image-position-left="-746px" image-position-top="-1396px" style="width: 1.125rem; height: 1.125rem;"></excel-icon>
				</div>
			</div>
		`;
	}
}

customElements.define("excel-formula-bar", ExcelFormulaBar);

class ExcelFormulaBarHr extends HTMLHRElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "border: rgb(199, 199, 199) 1px solid; border-right: 0; margin-inline: 3px; width: 0; height: 20px;";
	}
}
customElements.define("excel-formula-bar-hr", ExcelFormulaBarHr, { extends: "hr" });