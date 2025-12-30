// Shared rendering logic
const renderIcon = (element) => {
	const image = element.getAttribute("image") || "material_common_sprite908_gm3_grey_medium.svg";
	const left = element.getAttribute("image-position-left");
	const top = element.getAttribute("image-position-top");
	const style = element.getAttribute("style");
	element.style.cssText = `background: content-box url(/src/themes/excel/images/${image}) no-repeat ${left} ${top}; display: inline-block; width: 1rem; height: 1rem; padding: 0; border: none; border-radius: 0.25rem; ${style}`;
};

// Autonomous Custom Element: <excel-icon>
export default class ExcelIcon extends HTMLElement {
	constructor() { super(); }
	static get observedAttributes() { return ["image", "image-position-left", "image-position-top", "style"]; }
	connectedCallback() { renderIcon(this); }
	attributeChangedCallback() { renderIcon(this); }
}

// Customized Built-in Element: <button is="excel-icon-button">
// Note: We use a different registry name 'excel-icon-button' because names must be unique.
// Usage: <button is="excel-icon-button"></button>
export class ExcelIconButton extends HTMLButtonElement {
	constructor() { super(); }
	static get observedAttributes() { return ["image", "image-position-left", "image-position-top", "style"]; }
	connectedCallback() { renderIcon(this); }
	attributeChangedCallback() { renderIcon(this); }
}

// Register both
if (!customElements.get("excel-icon")) {
	customElements.define("excel-icon", ExcelIcon);
}
if (!customElements.get("excel-icon-button")) {
	customElements.define("excel-icon-button", ExcelIconButton, { extends: "button" });
}