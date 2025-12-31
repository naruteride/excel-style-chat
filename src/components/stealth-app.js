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

		if (!this.currentRoom) {
			const tagName = this.theme.views?.login || "login-view";
			const loginView = document.createElement(tagName);
			this.appendChild(loginView);
		} else {
			const tagName = this.theme.views?.chat || "chat-room";
			const chatRoom = document.createElement(tagName);
			chatRoom.setAttribute("room", this.currentRoom);
			this.appendChild(chatRoom);
		}
	}
}

customElements.define("stealth-app", StealthApp);
