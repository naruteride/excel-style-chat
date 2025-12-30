class ExcelToolbar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "background-color: #f0f4f9; border-radius: 1.5rem; font-family: Google Sans, Roboto, sans-serif; margin: 6px 16px 8px 16px; min-height: 40px; padding: 0 8px; -webkit-font-smoothing: antialiased;";
		this.innerHTML = `
			
		`;
	}
}

customElements.define("excel-toolbar", ExcelToolbar);
export default ExcelToolbar;