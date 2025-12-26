class Router {
	constructor() {
		this.routes = {};
		window.addEventListener("popstate", () => this.handleRoute());
	}

	// Initialize router
	init() {
		this.handleRoute();
	}

	navigateTo(path) {
		window.history.pushState({}, "", path);
		this.handleRoute();
	}

	handleRoute() {
		const path = window.location.pathname;
		const roomName = path.substring(1); // Remove leading slash

		// Dispatch a custom event that components can listen to
		const event = new CustomEvent("route-change", {
			detail: {
				path,
				roomName: roomName || null // null means 'active landing/login'
			}
		});
		window.dispatchEvent(event);
	}
}

const router = new Router();
export default router;
