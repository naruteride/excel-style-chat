export default class ExcelDropdownIcon extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const style = this.getAttribute("style");
		this.style.cssText = `border-style: solid; border-width: 4px 4px 0 4px; border-color: #444746 transparent; height: 0; width: 0; background: none; ${style}`;
	}
}
customElements.define("excel-dropdown-icon", ExcelDropdownIcon);