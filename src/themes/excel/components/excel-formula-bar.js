class ExcelFormulaBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "";
		this.innerHTML = `
		`;
	}
}

customElements.define("excel-formula-bar", ExcelFormulaBar);
export default ExcelFormulaBar;