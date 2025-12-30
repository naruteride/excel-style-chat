class ExcelDropdownButton extends HTMLButtonElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "border-style: solid; border-width: 4px 4px 0 4px; border-color: #444746 transparent; height: 0; width: 0; background: none;";
	}
}
customElements.define("excel-dropdown-button", ExcelDropdownButton, { extends: "button" });
export default ExcelDropdownButton;