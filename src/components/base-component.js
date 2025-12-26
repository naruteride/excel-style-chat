import themeStore from "../utils/theme-store.js";

export default class BaseComponent extends HTMLElement {
	constructor() {
		super();
		this.unsubscribe = null;
		this._theme = themeStore.getTheme();
	}

	connectedCallback() {
		this.unsubscribe = themeStore.subscribe((newTheme) => {
			this._theme = newTheme;
			this.render();
		});
		this.render();
	}

	disconnectedCallback() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	get theme() {
		return this._theme;
	}

	// Subclasses should override this
	render() {
		console.warn("BaseComponent: render() should be implemented by subclass");
	}
}
