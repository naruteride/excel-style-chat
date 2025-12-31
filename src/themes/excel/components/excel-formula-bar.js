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
		`;
	}
}

customElements.define("excel-formula-bar", ExcelFormulaBar);
export default ExcelFormulaBar;