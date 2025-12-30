class ThemeStore {
	constructor() {
		this.listeners = [];
		this.currentTheme = localStorage.getItem("stealth-chat-theme") || "excel";
		this.themes = {};
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
		this.notify();
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
