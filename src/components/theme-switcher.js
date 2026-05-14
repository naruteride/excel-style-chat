import themeStore from "../utils/theme-store.js";

export default class ThemeSwitcher extends HTMLElement {
	constructor() {
		super();
		this.themes = ["excel", "vscode", "pdf", "figma", "notion"];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const isOverlay = themeStore.currentTheme == "excel" || themeStore.currentTheme == "vscode";
		const style = this.getAttribute("style") || "";

		this.id = "theme-switcher";
		this.style.cssText = `position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; ${isOverlay ? "" : "top: 10px; right: 10px; bottom: unset; left: unset;"} ${style}`;
		this.innerHTML = `
			<select aria-label="Theme">
				${this.themes.map(theme => `
					<option value="${theme}" ${theme == themeStore.currentTheme ? "selected" : ""}>
						${theme.toUpperCase()}
					</option>
				`).join("")}
			</select>
		`;

		const select = this.querySelector("select");
		select.style.cssText = `width: 100%; height: 100%; ${isOverlay ? "opacity: 0;" : ""}`;

		select.addEventListener("change", (e) => {
			themeStore.setTheme(e.target.value);
		});

		if (isOverlay) {
			select.addEventListener("focus", () => {
				select.style.opacity = "1";
			});

			select.addEventListener("blur", () => {
				select.style.opacity = "0";
			});
		}
	}
}

customElements.define("theme-switcher", ThemeSwitcher);
