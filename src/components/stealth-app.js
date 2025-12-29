import BaseComponent from "./base-component.js";
import "./theme-switcher.js";
import "./login-view.js";
import "./chat-room.js";

export default class StealthApp extends BaseComponent {
	constructor() {
		super();
		this.currentRoom = null;
	}

	connectedCallback() {
		super.connectedCallback(); // Setup theme listener

		window.addEventListener("route-change", (e) => {
			this.currentRoom = e.detail.roomName;
			this.render();
		});
	}

	render() {
		// Apply global theme styles to self or body if needed
		// For now, we just render the structure

		// Clear content
		this.innerHTML = "";

		// Add Theme Switcher (always visible)
		const switcher = document.createElement("theme-switcher");
		this.appendChild(switcher);

		// Main Content Container
		const container = document.createElement("div");
		container.style.cssText = this.theme.components?.appContainer || "width: 100%; height: 100vh;";

		if (!this.currentRoom) {
			const tagName = this.theme.views?.login || "login-view";
			const loginView = document.createElement(tagName);
			container.appendChild(loginView);
		} else {
			const tagName = this.theme.views?.chat || "chat-room";
			const chatRoom = document.createElement(tagName);
			chatRoom.setAttribute("room", this.currentRoom);
			container.appendChild(chatRoom);
		}

		this.appendChild(container);
	}
}

customElements.define("stealth-app", StealthApp);
