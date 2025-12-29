class ExcelHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	// Google Sheets Header visual replication
	render() {
		this.style.cssText = "display: block; font-family: 'Roboto', Roboto, Arial, sans-serif;";

		// Using a scoped style tag for better control over layout and fonts without polluting global scope too much
		// Google Sheets uses mostly #444746 for icons/text and #1f1f1f for main text.
		const style = `
			<style>
				.gh-container {
					display: flex;
					align-items: center;
					padding: 6px 14px;
					background-color: #f9fbfd;
					gap: 12px;
				}
				.gh-logo {
					width: 40px;
					height: 40px;
					flex-shrink: 0;
					cursor: pointer;
				}
				.gh-content {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 2px;
				}
				.gh-upper-row {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.gh-filename {
					font-size: 18px;
					line-height: 24px;
					color: #1f1f1f;
					border: 1px solid transparent;
					border-radius: 4px;
					padding: 0 4px;
					margin: -1px;
					height: 26px;
					font-weight: 400;
					font-family: 'Google Sans', Roboto, sans-serif;
				}
				.gh-icon {
					width: 20px;
					height: 20px;
					fill: #444746;
					cursor: pointer;
					padding: 4px;
				}
				.gh-menu-bar {
					display: flex;
					gap: 4px;
				}
				.gh-menu-btn {
					font-size: 14px;
					color: #1f1f1f;
					background: none;
					border: none;
					padding: 2px 6px;
					cursor: pointer;
					border-radius: 4px;
					letter-spacing: .2px;
				}
				.gh-right-section {
					margin-left: auto;
					display: flex;
					align-items: center;
					gap: 12px;
					padding-right: 8px;
				}
				.gh-icon-large {
					width: 24px;
					height: 24px;
					fill: #444746;
					cursor: pointer;
					padding: 6px;
					border-radius: 50%;
				}
				.gh-share-btn {
					background-color: #c2e7ff;
					color: #001d35;
					border: none;
					border-radius: 20px;
					padding: 0 24px 0 16px;
					height: 40px;
					font-size: 14px;
					font-weight: 500;
					display: flex;
					align-items: center;
					gap: 8px;
					cursor: pointer;
					margin-left: 8px;
				}
				.gh-avatar {
					width: 32px;
					height: 32px;
					border-radius: 50%;
					margin-left: 8px;
					padding: 4px; /* Container padding simulation */
				}
			</style>
		`;

		this.innerHTML = style + `
			<div class="gh-container">
				<!-- Google Sheets Logo -->
				<svg class="gh-logo" viewBox="0 0 87.3 100">
					<path fill="#0F9D58" d="M3.7 0C1.6 0 0 1.6 0 3.7v92.6c0 2 1.6 3.7 3.7 3.7h80c2 0 3.7-1.6 3.7-3.7V29.5L62.2 0H3.7z"/>
					<path fill="#87CEAC" d="M62.2 0v24.2c0 2.9 2.4 5.3 5.3 5.3H100"/>
					<path fill="#F1F1F1" d="M18.5 73.8h50.3v7.3H18.5zM18.5 44.5h20.1v7.3H18.5zM18.5 59.1h50.3v7.3H18.5zM45.9 44.5h22.9v7.3H45.9z"/>
				</svg>

				<div class="gh-content">
					<div class="gh-upper-row">
						<input class="gh-filename" value="${this.getAttribute("room")}" readonly />
						
						<!-- Star -->
						<svg class="gh-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="currentColor" stroke-width="2"/></svg>
						<!-- Move (Folder) -->
						<svg class="gh-icon" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="none" stroke="currentColor" stroke-width="2"/></svg>
						<!-- Cloud Status -->
						<svg class="gh-icon" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"/></svg>
					</div>

					<div class="gh-menu-bar">
						${["파일", "수정", "보기", "삽입", "서식", "데이터", "도구", "확장 프로그램", "도움말"].map(label => `<button class="gh-menu-btn">${label}</button>`).join('')}
					</div>
				</div>

				<div class="gh-right-section">
					<!-- History -->
					<svg class="gh-icon-large" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
					
					<!-- Comment -->
					<svg class="gh-icon-large" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
					
					<!-- Meet -->
					<svg class="gh-icon-large" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
					
					<!-- Share -->
					<button class="gh-share-btn">
						<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
						공유
					</button>

					<img class="gh-avatar" src="//lh3.googleusercontent.com/a/ACg8ocJurJ724n294UpZHA1EukYYB2H7x5MFFOrW47W0rMAeFo6MzA=s50-c-k-no">
				</div>
			</div>
		`;
	}
}

customElements.define("excel-header", ExcelHeader, { extends: "header" });
export default ExcelHeader;