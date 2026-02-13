import "./vscode-login/index.js";
import "./vscode-chat/index.js";

export default {
	name: "vscode",
	css: [
		"/src/themes/vscode/index.css",
		"/src/themes/vscode/workbench.web.main.internal.css",
		"/src/themes/vscode/codicon-styles.css"
	],
	// 각 라우트/뷰에 사용할 커스텀 엘리먼트 태그를 정의
	views: {
		login: "vscode-login",
		chat: "vscode-chat",
	},
	// 필요한 경우 공유 속성을 여기에 유지할 수 있지만, 주로 컴포넌트에서 처리
};
