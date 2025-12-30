import ExcelDropdownButton from "./excel-dropdown-button.js";
import ExcelIcon, { ExcelIconButton } from "./excel-icon.js";

class ExcelToolbar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "display: flex; align-items: center; justify-content: space-between; background-color: #f0f4f9; border-radius: 1.5rem; margin: 6px 16px 8px 16px; min-height: 40px; padding: 0 8px; -webkit-font-smoothing: antialiased;";
		this.innerHTML = `
			<div style="display: flex; align-items: center; gap: 0.125rem">
				
			</div>
			<div style="display: flex; align-items: center; gap: 0.125rem">
				<button is="excel-icon-button" image-position-left="-0px" image-position-top="-236px" style="width: 1.125rem; height: 1.125rem;"></button>
			</div>
		`;
	}
}

customElements.define("excel-toolbar", ExcelToolbar);
export default ExcelToolbar;