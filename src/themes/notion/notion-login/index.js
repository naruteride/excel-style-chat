import BaseComponent from "/src/components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
// import NotionHeader from "../components/notion-path.js";

export default class NotionLogin extends BaseComponent {
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

	goToRoom(e) {
		e.preventDefault();
		const roomName = this.querySelector("#room-input").value;
		if (roomName) {
			router.navigateTo(`/${roomName}`);
		}
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";

		this.innerHTML = `
			<!-- <header is="excel-header" room="최종 로직 정리_0903_쿠폰TEST번호.xlsx"></header> -->

			<!-- <main style="flex: 1; overflow: auto;">
				<tr>
					<th>1</th>
					${this.user ? `<td style="padding-right: 1rem;">Logged in as</td>` : `<td style="padding-right: 1rem;"><button is="excel-no-style-button" id="btn-anonymous">Login Anonymously</button></td>`}
					${this.user ? `<td style="padding-right: 1rem;">${this.user.displayName || "Anonymous"}</td>` : `<td style="padding-right: 1rem;"><button is="excel-no-style-button" id="btn-google">Login with Google</button></td>`}
					${this.user ? `<td style="padding-right: 1rem;"><button is="excel-no-style-button" id="btn-logout">Logout</button></td>` : `<td></td>`}
				</tr>
				<tr>
					<th>2</th>
					<td style="padding-right: 1rem;">Workspace</td>
					<td><input type="text" id="room-input" placeholder="e.g. project-alpha" style="padding: 0; background: transparent; border: none; width: 100%; height: 100%;" /></td>
					<td style="padding-right: 1rem;"><button is="excel-no-style-button" type="submit">Open Workspace</button></td>
				</tr>
			</main> -->
		`;

		// this.querySelector("#btn-anonymous")?.addEventListener("click", () => authService.loginAnonymously());
		// this.querySelector("#btn-google")?.addEventListener("click", () => authService.loginGoogle());
		// this.querySelector("#btn-logout")?.addEventListener("click", () => authService.logout());
		// this.querySelector("#form-join")?.addEventListener("submit", (e) => this.goToRoom(e));

	}
}

customElements.define("excel-login", ExcelLogin);