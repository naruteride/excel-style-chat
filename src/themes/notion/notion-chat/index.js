import BaseComponent from "/src/components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
// import NotionHeader from "../components/notion-path.js";
// import NotionSideNavigation from "../components/";

export default class NotionChat extends BaseComponent {
	constructor() {
		super();
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		super.connectedCallback();
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";
		this.innerHTML = `
			<!-- <header is="notion-header" room="${this.roomName}"></header> -->

			<!-- <main is="notion-chat-editor" room="${this.roomName}"></main> -->
		`;
	}
}