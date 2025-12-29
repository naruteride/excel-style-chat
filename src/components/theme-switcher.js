import BaseComponent from "./base-component.js";
import themeStore from "../utils/theme-store.js";

export default class ThemeSwitcher extends BaseComponent {
	constructor() {
		super();
		this.themes = ["vscode", "excel", "pdf", "figma", "notion"];
	}

	render() {
		// We can apply some inline styles from the current theme if defined,
		// or just default ones.
		const style = this.theme.components?.themeSwitcher || "position: fixed; top: 10px; right: 10px; z-index: 9999;";

		this.innerHTML = `
			<div style="${style}">
				<select id="theme-select">
					${this.themes.map(t => `
						<option value="${t}" ${t == themeStore.currentTheme ? "selected" : ""}>
							${t.toUpperCase()}
						</option>
					`).join("")}
				</select>
			</div>
		`;

		this.querySelector("#theme-select").addEventListener("change", (e) => {
			themeStore.setTheme(e.target.value);
		});
	}
}

customElements.define("theme-switcher", ThemeSwitcher);
