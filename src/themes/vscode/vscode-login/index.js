import BaseComponent from "../../../components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
import VscodeSplitViewContainer from "../components/vscode-split-view-container.js";

export default class VscodeLogin extends BaseComponent {
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
		this.style.cssText = "display: block; width: 100%; height: 100%;";
		this.innerHTML = `
			<vscode-split-view-container></vscode-split-view-container>
		`;
	}
}

customElements.define("vscode-login", VscodeLogin);
