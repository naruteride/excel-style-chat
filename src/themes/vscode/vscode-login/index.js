import BaseComponent from "../../../components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
import VscodeMonacoWorkbench from "../components/vscode-monaco-workbench.js";
import VscodePartMain from "../components/vscode-part-main.js";

const escapeAttribute = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll('"', "&quot;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;");

export default class VscodeLogin extends BaseComponent {
	constructor() {
		super();
		this.user = null;
		this.authUnsubscribe = null;
	}

	connectedCallback() {
		super.connectedCallback();
		this.authUnsubscribe = authService.onUserChange((user) => {
			this.user = user;
			this.render();
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.authUnsubscribe) this.authUnsubscribe();
	}

	goToRoom(e) {
		e.preventDefault();
		const roomName = this.querySelector("#room-input")?.value.trim();
		if (roomName) {
			router.navigateTo(`/${roomName}`);
		}
	}

	render() {
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		const userName = this.user?.displayName || "Anonymous";
		const isAuthenticated = Boolean(this.user);

		this.innerHTML = `
			<vscode-monaco-workbench mode="login" user-name="${escapeAttribute(userName)}" authenticated="${isAuthenticated}">
				<vscode-part-main mode="login" user-name="${escapeAttribute(userName)}" authenticated="${isAuthenticated}"></vscode-part-main>
			</vscode-monaco-workbench>
		`;

		this.querySelector("#btn-anonymous")?.addEventListener("click", () => authService.loginAnonymously());
		this.querySelector("#btn-google")?.addEventListener("click", () => authService.loginGoogle());
		this.querySelector("#btn-logout")?.addEventListener("click", () => authService.logout());
		this.querySelector("#form-join")?.addEventListener("submit", (event) => this.goToRoom(event));
	}
}

customElements.define("vscode-login", VscodeLogin);
