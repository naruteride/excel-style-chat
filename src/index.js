import "./components/stealth-app.js";
import themeStore from "./utils/theme-store.js";
import router from "./utils/router.js";
import vscodeTheme from "./styles/vscode/index.js";

// Register initial themes (more can be added later)
themeStore.registerTheme("vscode", vscodeTheme);
// Potentially register placeholders for others so the app doesn't crash on switch
themeStore.registerTheme("excel", { name: "excel", components: {} });
themeStore.registerTheme("pdf", { name: "pdf", components: {} });
themeStore.registerTheme("figma", { name: "figma", components: {} });

document.addEventListener("DOMContentLoaded", () => {
	const app = document.createElement("stealth-app");
	document.body.appendChild(app);

	// Initialize Router
	router.init();
});
