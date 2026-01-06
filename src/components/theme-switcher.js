import BaseComponent from "./base-component.js";
import themeStore from "../utils/theme-store.js";

export default class ThemeSwitcher extends HTMLSelectElement {
	constructor() {
		super();
		this.themes = ["excel", "vscode", "pdf", "figma", "notion"];
		// this.unsubscribe = null;
	}

	// connectedCallback() {
	// 	this.render();
	// 	this.unsubscribe = themeStore.subscribe((newTheme) => {
	// 		this.value = newTheme.name;
	// 	});
	// }

	// disconnectedCallback() {
	// 	if (this.unsubscribe) {
	// 		this.unsubscribe();
	// 	}
	// }

	render() {
		const style = this.getAttribute("style") || "";

		this.style.cssText = `opacity: 0; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; appearance: none; ${style}`;

		this.innerHTML = `
			${this.themes.map(theme => `
				<option value="${theme}" ${theme == themeStore.currentTheme ? "selected" : ""}>
					${theme.toUpperCase()}
				</option>
			`).join("")}
		`;

		this.addEventListener("change", (e) => {
			themeStore.setTheme(e.target.value);
		});
	}
}

customElements.define("theme-switcher", ThemeSwitcher, { extends: "select" });
