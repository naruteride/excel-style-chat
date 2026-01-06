import BaseComponent from "./base-component.js";
import themeStore from "../utils/theme-store.js";

export default class ThemeSwitcher extends HTMLSelectElement {
	constructor() {
		super();
		this.themes = ["excel", "vscode", "pdf", "figma", "notion"];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const style = this.getAttribute("style") || "";
		this.style.cssText = `opacity: 0; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; ${style}`;
		this.id = "theme-switcher";

		this.innerHTML = `
			<!-- 테마 스위처를 인식함 -->
			${this.themes.map(theme => `
				<option value="${theme}" ${theme == themeStore.currentTheme ? "selected" : ""}>
					${theme.toUpperCase()}
				</option>
			`).join("")}
		`;

		this.addEventListener("change", (e) => {
			themeStore.setTheme(e.target.value);
		});

		// 접근성 요소: 탭키로 접근하면 보임
		this.addEventListener("focus", () => {
			this.style.opacity = "1";
		});

		this.addEventListener("blur", () => {
			this.style.opacity = "0";
		});
	}
}

customElements.define("theme-switcher", ThemeSwitcher, { extends: "select" });
