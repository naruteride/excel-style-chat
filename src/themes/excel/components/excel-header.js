class ExcelHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "background: #f9fbfd; border-bottom: 1px solid #f9fbfd; margin-bottom: -1px; display: flex; align-items: center; padding: 0 12px;";
		this.innerHTML = `
			<div style="display: flex; align-items: center;">
				<!-- Google Sheets Logo -->
				<div class="gh-logo" style="background: url(../images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -156px -570px; width: 2.25rem; height: 2.25rem; margin: 0.5rem;"></div>

				<div style="display: flex; flex-direction: column;">
					<div style="display: flex; align-items: center; gap: 0.5rem">
						<input value="${this.getAttribute("room")}" style="font-size: 1.1rem; border: none; background: transparent; color: #444746; font-family: inherit;" />
						
						<!-- Star Icon -->
						<button style="background:none; border:none; cursor:pointer; padding: 2px;">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#444746" width="18px" height="18px">
								<path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="#444746" stroke-width="2"/>
							</svg>
						</button>
						<!-- Folder Icon -->
						<button style="background:none; border:none; cursor:pointer; padding: 2px;">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#444746" width="18px" height="18px">
								<path d="M0 0h24v24H0z" fill="none"/><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="none" stroke="#444746" stroke-width="2"/>
							</svg>
						</button>
						<!-- Cloud Check Icon -->
						<button style="background:none; border:none; cursor:pointer; padding: 2px;">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#444746" width="18px" height="18px">
								<path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"/>
							</svg>
						</button>
					</div>

					<div style="display: flex; align-items: center; gap: 0.2rem">
						${["파일", "수정", "보기", "삽입", "서식", "데이터", "도구", "확장 프로그램", "도움말"].map(label => `<button style="background: none; border: none; color: #444746; font-size: 0.875rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${label}</button>`).join('')}
					</div>
				</div>
			</div>

			<div style="display: flex; align-items: center; gap: 1rem; margin-left: auto;">
				<!-- History Icon -->
				<svg style="width: 24px; height: 24px; cursor: pointer;" viewBox="0 0 24 24">
					<path fill="#444746" d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
				</svg>
				
				<!-- Comment Icon -->
				<svg style="width: 24px; height: 24px; cursor: pointer;" viewBox="0 0 24 24">
					<path fill="#444746" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
				</svg>
				
				<!-- Meet Icon -->
				<svg style="width: 24px; height: 24px; cursor: pointer;" viewBox="0 0 24 24">
					<path fill="#444746" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
				</svg>
				
				<button style="background: #c2e7ff; color: #001d35; border: none; border-radius: 16px; padding: 8px 20px; font-weight: 500; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
					공유
				</button>
				
				<img src="//lh3.googleusercontent.com/a/ACg8ocJurJ724n294UpZHA1EukYYB2H7x5MFFOrW47W0rMAeFo6MzA=s50-c-k-no" style="width: 32px; height: 32px; border-radius: 50%; margin-left: 10px;">
			</div>
		`;
	}
}

customElements.define("excel-header", ExcelHeader, { extends: "header" });
export default ExcelHeader;