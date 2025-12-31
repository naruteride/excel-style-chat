import ExcelIcon, { ExcelIconButton } from "./excel-icon.js";
import ExcelDropdownIcon from "./excel-dropdown-icon.js";

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
			<div style="display: flex; align-items: center; gap: 0.25rem;">
				<button is="excel-icon-button" image-position-left="-670px" image-position-top="-62px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-680px" image-position-top="-1304px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-236px" image-position-top="-264px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-1168px" image-position-top="-976px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-130px" image-position-top="-152px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-toolbar-dropdown-menu">
					100%
					<excel-dropdown-icon></excel-dropdown-icon>
				</button>

				<hr is="excel-toolbar-hr">

				<button is="excel-toolbar-text-button">
					₩
				</button>
				<button is="excel-toolbar-text-button">
					%
				</button>
				<button is="excel-icon-button" image-position-left="-218px" image-position-top="-68px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-906px" image-position-top="-22px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-toolbar-text-button" style="font-size: 12px;">
					123
				</button>

				<hr is="excel-toolbar-hr">

				<button is="excel-toolbar-dropdown-menu">
					Roboto
					<excel-dropdown-icon></excel-dropdown-icon>
				</button>

				<hr is="excel-toolbar-hr">

				<button is="excel-icon-button" image-position-left="-427px" image-position-top="-526px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-toolbar-dropdown-menu" style="border: 1px solid rgb(116, 119, 117); padding: 0.25rem 0.5rem;">
					10
				</button>
				<button is="excel-icon-button" image-position-left="-536px" image-position-top="-394px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>

				<hr is="excel-toolbar-hr">

				<button is="excel-icon-button" image-position-left="-350px" image-position-top="-106px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-872px" image-position-top="-2060px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-464px" image-position-top="-1500px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-626px" image-position-top="-1938px" style="width: 1.5rem; height: 1.625rem; padding: 0.25rem 0.125rem 0px; border-bottom: 4px solid rgb(67, 67, 67); border-bottom-style: double; border-radius: 0; margin: 0 0.125rem 0.25rem;"></button>

				<hr is="excel-toolbar-hr">

				<button is="excel-icon-button" image-position-left="-764px" image-position-top="-330px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-1198px" image-position-top="-1164px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<button is="excel-icon-button" image-position-left="-388px" image-position-top="-898px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>

				<hr is="excel-toolbar-hr">

				<button is="excel-icon-button" image-position-left="-864px" image-position-top="-808px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>
				<button is="excel-icon-button" image-position-left="-1278px" image-position-top="-572px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>
				<button is="excel-icon-button" image-position-left="-304px" image-position-top="-284px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>
				<button is="excel-icon-button" image-position-left="-376px" image-position-top="-1338px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
				<excel-dropdown-icon></excel-dropdown-icon>

				<hr is="excel-toolbar-hr">

				<button is="excel-icon-button" image-position-left="-162px" image-position-top="-1878px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
			</div>

			<div style="display: flex; align-items: center; gap: 0.125rem; margin-inline: 0.75rem;">
				<button is="excel-icon-button" image-position-left="-756px" image-position-top="-1110px" style="width: 1.25rem; height: 1.25rem;"></button>
			</div>
		`;
	}
}

customElements.define("excel-toolbar", ExcelToolbar);
export default ExcelToolbar;

class ExcelToolbarHr extends HTMLHRElement {
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
customElements.define("excel-toolbar-hr", ExcelToolbarHr, { extends: "hr" });

class ExcelToolbarTextButton extends HTMLButtonElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const style = this.getAttribute("style");
		this.style.cssText = `display: flex; justify-content: center; align-items: center; width: 1.75rem; height: 1.75rem; padding: none; border: none; background-color: transparent; text-align: center; font-size: 13px; font-weight: 500; color: rgba(0, 0, 0, 0.7); ${style}`;
	}
}
customElements.define("excel-toolbar-text-button", ExcelToolbarTextButton, { extends: "button" });

class ExcelToolbarDropdownMenu extends HTMLButtonElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const style = this.getAttribute("style");
		this.style.cssText = `display: flex; align-items: center; gap: 0.625rem; border: 0; padding: 0.325rem 0.25rem; background: none; ${style}`;
	}
}
customElements.define("excel-toolbar-dropdown-menu", ExcelToolbarDropdownMenu, { extends: "button" });