export default class ExcelChatEditor extends HTMLElement {
    render() {
        this.id = "message-list";
        this.style.cssText = "flex: 1; overflow: hidden scroll;";
        this.innerHTML = `
			
		`;
    }
}

customElements.define("excel-chat-editor", ExcelChatEditor, { extends: "main" });