import "./excel-login/index.js";
import "./excel-chat/index.js";

export default {
	name: "excel",
	css: ["/src/themes/excel/index.css"],
	// 각 라우트/뷰에 사용할 Custom Element 태그를 정의
	views: {
		login: "excel-login",
		chat: "excel-chat",
	},
	// 필요한 경우 공유 속성을 여기에 유지할 수 있지만, 주로 컴포넌트에서 처리
};
