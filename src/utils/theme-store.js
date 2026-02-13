class ThemeStore {
	constructor() {
		this.listeners = [];
		this.currentTheme = localStorage.getItem("stealth-chat-theme") || "excel";
		this.themes = {};
		this._updateFavicon(this.currentTheme);
		// 주의: 테마를 등록할 때 스타일이 업데이트될 수 있으므로 주의가 필요하다.
		// 하지만 테마 등록은 생성자 호출 이후에 이루어지므로, 등록된 테마가 현재 테마와 일치할 경우
		// registerTheme 메서드에서 스타일 업데이트를 트리거하도록 의존할 수 있다.
	}

	// 테마 객체 등록
	registerTheme(name, themeObject) {
		this.themes[name] = themeObject;
		// 방금 등록한 테마가 현재 활성화된 테마라면, 리스너들에게 알림을 보내 새로운 데이터로 리랜더링하도록 함
		if (this.currentTheme == name) {
			this._updateThemeStyles(name);
			this.notify();
		}
	}

	getTheme() {
		return this.themes[this.currentTheme] || {};
	}

	setTheme(themeName) {
		if (this.currentTheme == themeName) return;

		this.currentTheme = themeName;
		localStorage.setItem("stealth-chat-theme", themeName);
		this._updateFavicon(themeName);
		this._updateThemeStyles(themeName);
		this.notify();
	}

	_updateFavicon(themeName) {
		const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		if (!link.parentNode) {
			document.head.appendChild(link);
		}

		if (themeName == "excel") {
			link.href = "/public/spreadsheets_2023q4.ico";
			document.title = "최종 로직 정리_0903_쿠폰TEST번호.xlsx";
		} else {
			// 그 외 테마는 스텔스 모드나 일반적인 형태를 위해 기본값 또는 빈 값으로 설정
			link.href = "data:,";
			document.title = "Home"; // 대체 제목
		}
	}

	_updateThemeStyles(themeName) {
		// 1. 기존 테마 스타일 제거
		document.querySelectorAll("link[data-stealth-theme]").forEach(el => el.remove());

		// 2. 새 테마 스타일 추가
		const theme = this.getTheme(themeName);
		if (theme.css && Array.isArray(theme.css)) {
			theme.css.forEach(href => {
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = href;
				link.dataset.stealthTheme = "true";
				document.head.appendChild(link);
			});
		}
	}

	subscribe(listener) {
		this.listeners.push(listener);
		// 구독 해제(unsubscribe) 함수 반환
		return () => {
			this.listeners = this.listeners.filter(l => l != listener);
		};
	}

	notify() {
		this.listeners.forEach(listener => listener(this.getTheme()));
	}
}

const themeStore = new ThemeStore();
export default themeStore;
