import BaseComponent from "../../../components/base-component.js";
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
		const roomName = (this.roomName || "").replaceAll("&", "&amp;").replaceAll('"', "&quot;");
		// Excel Editor Layout
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";
		this.innerHTML = `
			<excel-header room="${roomName}"></excel-header>

			<!-- Editor Area (Messages) -->
			<excel-chat-editor room="${roomName}"></excel-chat-editor>

			<!-- Terminal / Input Area -->
			<excel-chat-input room="${roomName}"></excel-chat-input>
		`;
	}
}

customElements.define("excel-chat", ExcelChat);
