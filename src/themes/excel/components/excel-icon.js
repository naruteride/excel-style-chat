const getInlineStyle = (element) => {
	if (element.dataset.excelIconInlineStyle == null) {
		element.dataset.excelIconInlineStyle = element.getAttribute("style") || "";
	}
	return element.dataset.excelIconInlineStyle;
};

export const renderIcon = (element) => {
	const image = element.getAttribute("image") || "material_common_sprite908_gm3_grey_medium.svg";
	const left = element.getAttribute("image-position-left");
	const top = element.getAttribute("image-position-top");
	const style = getInlineStyle(element);

	if (element instanceof HTMLButtonElement && !element.hasAttribute("type")) {
		element.type = "button";
	}

	element.style.cssText = `background: content-box url(/src/themes/excel/images/${image}) no-repeat ${left} ${top}; display: inline-block; width: 1rem; height: 1rem; padding: 0; border: none; border-radius: 0.25rem; user-select: none; ${style}`;
};

export const renderIconButtons = (root) => {
	root.querySelectorAll(".excel-icon-button").forEach(renderIcon);
};

export default class ExcelIcon extends HTMLElement {
	constructor() { super(); }
	static get observedAttributes() { return ["image", "image-position-left", "image-position-top"]; }
	connectedCallback() { renderIcon(this); }
	attributeChangedCallback() { renderIcon(this); }
}

if (!customElements.get("excel-icon")) {
	customElements.define("excel-icon", ExcelIcon);
}
