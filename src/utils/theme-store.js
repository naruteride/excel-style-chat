class ThemeStore {
	constructor() {
		this.listeners = [];
		this.currentTheme = localStorage.getItem("stealth-chat-theme") || "excel";
		this.themes = {};
		this._updateFavicon(this.currentTheme);
	}

	// Register a theme object
	registerTheme(name, themeObject) {
		this.themes[name] = themeObject;
		// If we just registered the current theme, notify listeners so they can re-render with the new data
		if (this.currentTheme == name) {
			this.notify();
		}
	}

	getTheme() {
		return this.themes[this.currentTheme] || {};
	}

	setTheme(themeName) {
		if (this.currentTheme == themeName) return;

		this.currentTheme = themeName;
		localStorage.setItem("stealth-chat-theme", themeName);
		this._updateFavicon(themeName);
		this.notify();
	}

	_updateFavicon(themeName) {
		const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		if (!link.parentNode) {
			document.head.appendChild(link);
		}

		if (themeName == "excel") {
			link.href = "/public/spreadsheets_2023q4.ico";
			document.title = "최종 로직 정리_0903_쿠폰TEST번호.xlsx";
		} else {
			// Default or empty for other themes to be stealthy or generic
			link.href = "data:,";
			document.title = "Home"; // Fallback title
		}
	}

	subscribe(listener) {
		this.listeners.push(listener);
		// Return unsubscribe function
		return () => {
			this.listeners = this.listeners.filter(l => l != listener);
		};
	}

	notify() {
		this.listeners.forEach(listener => listener(this.getTheme()));
	}
}

const themeStore = new ThemeStore();
export default themeStore;
