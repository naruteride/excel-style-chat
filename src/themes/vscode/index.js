import "./vscode-login/index.js";
import "./vscode-chat/index.js";

export default {
	name: "vscode",
	// Defines which Custom Element tag to use for each route/view
	views: {
		login: "vscode-login",
		chat: "vscode-chat",
	},
	// We can still keep shared props here if needed, but primarily now driven by components
};
