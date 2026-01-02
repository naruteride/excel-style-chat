import BaseComponent from "/src/components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
import ExcelHeader from "../components/excel-header.js";

export default class ExcelLogin extends BaseComponent {
	constructor() {
		super();
		this.user = null;
	}

	connectedCallback() {
		super.connectedCallback();
		authService.onUserChange((user) => {
			this.user = user;
			this.render();
		});
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";

		this.innerHTML = `
			<header is="excel-header" room="최종 로직 정리_0903_쿠폰TEST번호.xlsx"></header>
			<div style="padding: 20px; background-color: #252526; color: #d4d4d4;">
				<h1 style="font-size: 1.2em; font-weight: normal; margin-bottom: 20px; color: #007acc;">Excel Stealth Chat</h1>
				${this.user ? `<p style="font-size: 0.9em; margin-bottom: 10px;">Logged in as: <strong>${this.user.displayName || "Anonymous"}</strong></p>` : ""}
				
				<div style="display: flex; flex-direction: column; gap: 10px;">
					${!this.user ? `
						<button id="btn-anonymous" style="padding: 8px; background: #007acc; color: white; border: none; cursor: pointer;">Login Anonymously</button>
						<button id="btn-google" style="padding: 8px; background: #007acc; color: white; border: none; cursor: pointer;">Login with Google</button>
					` : `
						<button id="btn-logout" style="padding: 8px; background: #3c3c3c; color: white; border: 1px solid #555; cursor: pointer;">Logout</button>
					`}
				</div>

				<hr style="border: 0; border-top: 1px solid #3c3c3c; margin: 20px 0;"/>
				
				<div style="display: flex; flex-direction: column; gap: 5px;">
					<label style="font-size: 0.9em;">Workspace (Room Name):</label>
					<input type="text" id="room-input" placeholder="e.g. project-alpha" style="padding: 8px; background: #3c3c3c; border: 1px solid #007acc; color: white; outline: none;" />
					<button id="btn-join" style="padding: 8px; background: #0e639c; color: white; border: none; cursor: pointer; margin-top: 10px;">Open Workspace</button>
				</div>
			</div>
        `;

		this.querySelector("#btn-anonymous")?.addEventListener("click", () => authService.loginAnonymously());
		this.querySelector("#btn-google")?.addEventListener("click", () => authService.loginGoogle());
		this.querySelector("#btn-logout")?.addEventListener("click", () => authService.logout());

		this.querySelector("#btn-join")?.addEventListener("click", () => {
			const roomName = this.querySelector("#room-input").value;
			if (roomName) {
				router.navigateTo(`/${roomName}`);
			}
		});
	}
}

customElements.define("excel-login", ExcelLogin);
