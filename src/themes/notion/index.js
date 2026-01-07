import "./notion-login/index.js";
import "./notion-chat/index.js";

// Inject Excel Theme CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/src/themes/notion/index.css";
// Avoid duplicate injection
if (!document.querySelector(`link[href="${link.href}"]`)) {
	document.head.appendChild(link);
}

export default {
	name: "notion",
	views: {
		login: "notion-login",
		chat: "notion-chat",
	},
};
