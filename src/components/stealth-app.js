import BaseComponent from "./base-component.js";
import ThemeSwitcher from "./theme-switcher.js";
import LoginView from "./login-view.js";
import ChatRoom from "./chat-room.js";

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
		// Clear content
		this.innerHTML = "";

		// Add Theme Switcher (visible unless excel theme)
		if (this.theme.name != "excel" && this.theme.name != "vscode") {
			const switcher = document.createElement("select", { is: "theme-switcher" });
			this.appendChild(switcher);
		}

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
