import { renderIconButtons } from "./excel-icon.js";
import ExcelDropdownIcon from "./excel-dropdown-icon.js";

export default class ExcelToolbar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "overflow-x: auto; scrollbar-width: thin; display: flex; align-items: center; justify-content: space-between; background-color: #f0f4f9; border-radius: 1.5rem; margin: 6px 16px 8px 16px; min-height: 40px; padding: 0 8px; -webkit-font-smoothing: antialiased;";
		this.innerHTML = `
			<div style="display: flex; align-items: center; gap: 0.25rem;">
				<button class="excel-icon-button" image-position-left="-670px" image-position-top="-62px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-680px" image-position-top="-1304px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-236px" image-position-top="-264px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-1168px" image-position-top="-976px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-130px" image-position-top="-152px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button type="button" class="excel-toolbar-dropdown-menu">
					100%
					<excel-dropdown-icon></excel-dropdown-icon>
				</button>

				<hr class="excel-toolbar-separator">

				<button type="button" class="excel-toolbar-text-button">$</button>
				<button type="button" class="excel-toolbar-text-button">%</button>
				<button class="excel-icon-button" image-position-left="-218px" image-position-top="-68px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-906px" image-position-top="-22px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button type="button" class="excel-toolbar-text-button" style="font-size: 12px;">123</button>

				<hr class="excel-toolbar-separator">

				<button type="button" class="excel-toolbar-dropdown-menu">
					Roboto
					<excel-dropdown-icon></excel-dropdown-icon>
				</button>

				<hr class="excel-toolbar-separator">

				<button class="excel-icon-button" image-position-left="-427px" image-position-top="-526px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button type="button" class="excel-toolbar-dropdown-menu" style="border: 1px solid rgb(116, 119, 117); padding: 0.25rem 0.5rem;">10</button>
				<button class="excel-icon-button" image-position-left="-536px" image-position-top="-394px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>

				<hr class="excel-toolbar-separator">

				<button class="excel-icon-button" image-position-left="-350px" image-position-top="-106px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-872px" image-position-top="-2060px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-464px" image-position-top="-1500px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-626px" image-position-top="-1938px" style="width: 1.5rem; height: 1.625rem; padding: 0.25rem 0.125rem 0px; border-bottom: 4px solid rgb(67, 67, 67); border-bottom-style: double; border-radius: 0; margin: 0 0.125rem 0.25rem;"></button>

				<hr class="excel-toolbar-separator">

				<button class="excel-icon-button" image-position-left="-764px" image-position-top="-330px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-1198px" image-position-top="-1164px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button class="excel-icon-button" image-position-left="-388px" image-position-top="-898px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem; opacity: 0.55;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>

				<hr class="excel-toolbar-separator">

				<button class="excel-icon-button" image-position-left="-864px" image-position-top="-808px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>
				<button class="excel-icon-button" image-position-left="-1278px" image-position-top="-572px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>
				<button class="excel-icon-button" image-position-left="-304px" image-position-top="-284px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>
				<button class="excel-icon-button" image-position-left="-376px" image-position-top="-1338px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>

				<hr class="excel-toolbar-separator">

				<button class="excel-icon-button" image-position-left="-162px" image-position-top="-1878px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
			</div>

			<div style="display: flex; align-items: center; gap: 0.125rem; margin-inline: 0.75rem;">
				<button class="excel-icon-button" image-position-left="-756px" image-position-top="-1110px" style="width: 1.25rem; height: 1.25rem;"></button>
			</div>
		`;

		renderIconButtons(this);
	}
}

customElements.define("excel-toolbar", ExcelToolbar);
