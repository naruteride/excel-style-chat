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
		const isExcel = themeStore.currentTheme == "excel";
		const isVscode = themeStore.currentTheme == "vscode";
		const style = this.getAttribute("style") || "";

		this.style.cssText = `position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; ${isExcel ? "opacity: 0;" : "top: 10px; right: 10px; bottom: unset; left: unset;"} ${style}`;
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

		// 접근성 요소: 엑셀 테마일 때만 탭키로 접근하면 보임
		if (isExcel) {
			this.addEventListener("focus", () => {
				this.style.opacity = "1";
			});

			this.addEventListener("blur", () => {
				this.style.opacity = "0";
			});
		}
	}
}

customElements.define("theme-switcher", ThemeSwitcher, { extends: "select" });
