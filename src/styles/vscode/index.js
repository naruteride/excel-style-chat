export default {
	name: "vscode",
	components: {
		// Global / App Container
		appContainer: "width: 100%; height: 100vh; background-color: #1e1e1e; color: #d4d4d4; font-family: 'Consolas', 'Courier New', monospace; display: flex;",

		// Theme Switcher (Absolute positioned usually)
		themeSwitcher: "position: fixed; bottom: 10px; right: 10px; z-index: 1000; opacity: 0.5;",

		// Login View
		loginView: "margin: auto; padding: 20px; border: 1px solid #3c3c3c; background-color: #252526; width: 300px;",

		// Chat Room
		chatRoomContainer: "display: flex; flex-direction: column; height: 100%; width: 100%;",

		// Message List (The 'editor' area)
		messageList: "flex: 1; overflow-y: auto; padding: 10px; background-color: #1e1e1e;",

		// Input Area (The 'terminal' or 'status bar' area)
		inputArea: "padding: 0; min-height: 30px; background-color: #007acc; display: flex; align-items: center;",
		inputField: "flex: 1; background: transparent; border: none; color: white; padding: 5px 10px; outline: none;",
		sendButton: "background: #3c3c3c; border: none; color: white; cursor: pointer; padding: 0 15px; height: 100%;",

		// Messages
		myMessageContainer: "text-align: right; margin: 5px 0;",
		otherMessageContainer: "text-align: left; margin: 5px 0;",

		// Bubbles (resembling code blocks or lines)
		myMessageBubble: "display: inline-block; background-color: #264f78; padding: 5px 10px; border-radius: 3px;",
		otherMessageBubble: "display: inline-block; background-color: #3c3c3c; padding: 5px 10px; border-radius: 3px;",

		messageAuthor: "font-size: 0.7em; color: #858585; margin-bottom: 2px; display: block;"
	}
};
