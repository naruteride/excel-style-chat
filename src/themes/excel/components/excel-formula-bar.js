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
		this.style.cssText = "display: flex; align-items: center; justify-content: space-between; height: 1.75rem; background-color: #fff;";
		this.innerHTML = `
			<button id="name-box" style="display: flex; align-items: center; padding: 0.125rem 0.375rem; font-size: 0.813rem; width: 6.625rem;">
				<span style="flex: 1; padding: 0.125rem 0.5rem; text-align: left;">C93</span>
				<excel-dropdown-icon style="margin: 0.5rem;"></excel-dropdown-icon>
			</button>
			<hr is="excel-formula-bar-hr">
			<div id="excel-formula-bar-separator" style="flex: 1; display: flex; align-items: center;">
				<div id="t-formula-bar-label" style="width: 35px; display: flex; justify-content: center; align-items: center; opacity: 0.55;">
					<excel-icon image-position-left="-746px" image-position-top="-1396px" style="width: 1.125rem; height: 1.125rem;"></excel-icon>
				</div>
			</div>
			<button style="display: flex; justify-content: center; align-items: center; width: 10rem; margin-right: 1rem; border-radius: 2rem; background: rgb(240, 244, 249); font-size: 0.813rem; line-height: 22px; color: rgb(31, 31, 31);">
				<svg style="margin-left: -0.25rem; margin-right: 0.25rem;" xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 -960 960 960" fill="none"><path d="M480-80q0-83-31.5-156T363-363q-54-54-127-85.5T80-480q83 0 156-31.5T363-597q54-54 85.5-127T480-880q0 83 31.5 156T597-597q54 54 127 85.5T880-480q-83 0-156 31.5T597-363q-54 54-85.5 127T480-80Z" fill="#1F1F1F"></path></svg>
				이 데이터 요약
			</button>
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
		this.style.cssText = "border: rgb(199, 199, 199) 1px solid; border-right: 0; margin-block: 0; width: 0; height: 17px;";
	}
}
customElements.define("excel-formula-bar-hr", ExcelFormulaBarHr, { extends: "hr" });