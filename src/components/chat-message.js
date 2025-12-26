import BaseComponent from "./base-component.js";
import { authService } from "../apis/firebase.js";

export default class ChatMessage extends BaseComponent {
	static get observedAttributes() {
		return ["text", "author", "uid", "timestamp"];
	}

	render() {
		const text = this.getAttribute("text") || "";
		const author = this.getAttribute("author") || "Unknown";
		const uid = this.getAttribute("uid");
		const currentUser = authService.getCurrentUser();
		const isMe = currentUser && currentUser.uid == uid;

		// Fetch styles from theme
		// Expecting theme.components.message = { container: "...", bubble: "...", author: "..." }
		// OR just simple strings. Let's assume the theme might provide specific strings for 'myMessage' vs 'otherMessage'.

		const containerStyle = isMe
			? (this.theme.components?.myMessageContainer || "text-align: right; margin: 5px;")
			: (this.theme.components?.otherMessageContainer || "text-align: left; margin: 5px;");

		const bubbleStyle = isMe
			? (this.theme.components?.myMessageBubble || "background: #e1ffc7; display: inline-block; padding: 5px 10px; border-radius: 5px;")
			: (this.theme.components?.otherMessageBubble || "background: #fff; border: 1px solid #ccc; display: inline-block; padding: 5px 10px; border-radius: 5px;");

		const authorStyle = this.theme.components?.messageAuthor || "font-size: 0.8em; color: #666; display: block; margin-bottom: 2px;";

		this.innerHTML = `
            <div style="${containerStyle}">
                ${!isMe ? `<span style="${authorStyle}">${author}</span>` : ""}
                <div style="${bubbleStyle}">
                    ${text}
                </div>
            </div>
        `;
	}
}

customElements.define("chat-message", ChatMessage);
