import BaseComponent from "../../../components/base-component.js";
import { chatService, authService } from "../../../api/firebase.js";
import ExcelHeader from "../components/excel-header.js";
import ExcelChatEditor from "./components/excel-chat-editor.js";
import ExcelChatInput from "./components/excel-chat-input.js";

export default class ExcelChat extends BaseComponent {
	constructor() {
		super();
	}

	connectedCallback() {
		this.roomName = this.getAttribute("room");
		super.connectedCallback();
	}

	render() {
		// Excel Editor Layout
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";
		this.innerHTML = `
			<header is="excel-header" room="${this.roomName}"></header>

			<!-- Editor Area (Messages) -->
			<main is="excel-chat-editor" room="${this.roomName}"></main>

			<!-- Terminal / Input Area -->
			<excel-chat-input room="${this.roomName}"></excel-chat-input>
		`;
	}
}

customElements.define("excel-chat", ExcelChat);

