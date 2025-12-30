import BaseComponent from "./base-component.js";
import router from "../utils/router.js";
import { authService } from "../api/firebase.js";

export default class LoginView extends BaseComponent {
	constructor() {
		super();
		this.user = null;
	}

	connectedCallback() {
		super.connectedCallback();

		authService.onUserChange((user) => {
			this.user = user;
			this.render(); // Re-render to show logout or different UI
		});
	}

	render() {
		const style = this.theme.components?.loginView || "";

		this.innerHTML = `
			<div style="${style}">
				<h1>Stealth Chat Login</h1>
				${this.user ? `<p>Logged in as: ${this.user.displayName || "Anonymous"}</p>` : ""}
				
				<div class="actions">
					${!this.user ? `
						<button id="btn-anon">Login Anonymously</button>
						<button id="btn-google">Login with Google</button>
					` : `
						<button id="btn-logout">Logout</button>
					`}
				</div>

				<hr/>
				
				<div class="room-entry">
					<label>Enter Room Name:</label>
					<input type="text" id="room-input" placeholder="e.g. daily-scrum" />
					<button id="btn-join">Join Room</button>
				</div>
			</div>
        `;

		// Bind Events
		this.querySelector("#btn-anon")?.addEventListener("click", () => authService.loginAnonymously());
		this.querySelector("#btn-google")?.addEventListener("click", () => authService.loginGoogle());
		this.querySelector("#btn-logout")?.addEventListener("click", () => authService.logout());

		this.querySelector("#btn-join").addEventListener("click", () => {
			const roomName = this.querySelector("#room-input").value;
			if (roomName) {
				router.navigateTo(`/${roomName}`);
			}
		});
	}
}

customElements.define("login-view", LoginView);
