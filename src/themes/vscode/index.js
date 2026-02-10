import "./vscode-login/index.js";
import "./vscode-chat/index.js";

// vscode 테마 CSS 주입
const link = document.createElement("link");
const link2 = document.createElement("link");
link.rel = "stylesheet";
link.href = "/src/themes/vscode/index.css";
link2.rel = "stylesheet";
link2.href = "/src/themes/vscode/workbench.web.main.internal.css";
// 중복 주입 방지
if (!document.querySelector(`link[href="${link.href}"]`)) {
	document.head.appendChild(link);
}
if (!document.querySelector(`link[href="${link2.href}"]`)) {
	document.head.appendChild(link2);
}

export default {
	name: "vscode",
	// 각 라우트/뷰에 사용할 커스텀 엘리먼트 태그를 정의
	views: {
		login: "vscode-login",
		chat: "vscode-chat",
	},
	// 필요한 경우 공유 속성을 여기에 유지할 수 있지만, 주로 컴포넌트에서 처리
};
