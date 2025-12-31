export default class ExcelChatInput extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<div style="background: #1e1e1e; padding: 5px 15px; font-size: 11px; color: #d4d4d4; text-transform: uppercase; font-weight: bold; display: flex; gap: 15px;">
				<span style="border-bottom: 1px solid white;">Terminal</span>
				<span style="opacity: 0.5;">Output</span>
				<span style="opacity: 0.5;">Debug Console</span>
			</div>
			<div style="padding: 10px; background: #1e1e1e; display: flex; align-items: center;">
				<span style="color: #00ff00; margin-right: 10px;"> ~</span>
				<input type="text" id="msg-input" placeholder="console.log('your message')..." 
					style="flex: 1; background: transparent; border: none; color: #d4d4d4; font-family: Consolas, monospace; outline: none;" />
			</div>
		`;
	}
}

customElements.define("excel-chat-input", ExcelChatInput);