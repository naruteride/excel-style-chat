import ExcelIcon, { ExcelIconButton } from "./excel-icon.js";
import ExcelDropdownIcon from "./excel-dropdown-icon.js";
import ThemeSwitcher from "/src/components/theme-switcher.js";

export default class ExcelMenu extends HTMLMenuElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "overflow-x: auto; scrollbar-width: thin; margin-block: 0; padding-inline: 0; display: flex; justify-content: space-between; align-items: center; height: 4rem;";
		this.innerHTML = `
			<div style="display: flex; align-items: center; margin-inline: 0.5rem;">
				<!-- Google Sheets Logo -->
				<button is="excel-icon-button" image-position-left="-717px" image-position-top="-926px" style="width: 3.25rem; height: 3.25rem; padding: 0.5rem;"></button>

				<div style="display: flex; flex-direction: column;">
					<div style="display: flex; align-items: center; gap: 0.5rem">
						<input value="${this.getAttribute("room")}" style="max-width: 24rem; text-overflow: ellipsis; font-size: 1.125rem; field-sizing: content; border: none; border-radius: 0.25rem; padding: 0.063rem 0.375rem; background: transparent; color: #000000; font-variant-ligatures: no-contextual; height: 20px; line-height: 22px; white-space: nowrap;" />
						
						<!-- Star Icon -->
						<button is="excel-icon-button" image-position-left="-202px" image-position-top="-2102px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>

						<!-- Drive Icon -->
						<button is="excel-icon-button" image-position-left="-1434px" image-position-top="-416px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
						
						<!-- Cloud Check Icon -->
						<button is="excel-icon-button" image-position-left="-660px" image-position-top="-1578px" style="width: 1.75rem; height: 1.75rem; padding: 0.25rem;"></button>
					</div>

					<div style="display: flex; align-items: center; gap: 0.5rem; margin-top: -0.25rem;">
						${["파일", "수정", "보기", "삽입", "서식", "데이터", "도구", "확장 프로그램", "도움말"].map(label => `<button style="background: none; border: none; color: #444746; font-size: 0.875rem; padding: 2px 6px; border-radius: 4px;">${label}</button>`).join("")}
					</div>
				</div>
			</div>

			<div style="display: flex; align-items: center; gap: 1rem; margin-inline: 1rem;">
				<!-- History Icon -->
				<button is="excel-icon-button" image-position-left="-786px" image-position-top="-1482px" style="width: 2rem; height: 2rem; padding: 0.25rem;"></button>
				
				<!-- Comment Icon -->
				<button is="excel-icon-button" image-position-left="-90px" image-position-top="-324px" style="width: 2rem; height: 2rem; padding: 0.25rem;"></button>
				
				<!-- Meet Icon -->
				<button style="display: flex; align-items: center; gap: 0.2rem; padding: 0; border: none; background: none;">
					<excel-icon image-position-left="-1386px" image-position-top="-1234px" style="width: 1.5rem; height: 1.5rem;"></excel-icon>
					<excel-dropdown-icon></excel-dropdown-icon>
				</button>

				<!-- Share Button -->
				<div id="share-buttons" style="position: relative; display: flex; align-items: center; gap: 0.063rem;">
					<button style="line-height: 20px; font-size: 0.875rem; background: #c2e7ff; color: rgb(0, 29, 53); border: none; border-radius: 100px; border-bottom-right-radius: 0; border-top-right-radius: 0; padding: 10px 8px 10px 16px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
						<excel-icon image="sprite-24.svg" image-position-left="-0px" image-position-top="-236px" style="width: 1.125rem; height: 1.125rem;"></excel-icon>
						공유
					</button>
					<button style="line-height: 20px; font-size: 0.875rem; background: #c2e7ff; border: none; padding: 10px 16px 10px 8px; border-radius: 100px; border-bottom-left-radius: 0; border-top-left-radius: 0; cursor: pointer; display: flex; align-items: center;">
						&nbsp;<excel-dropdown-icon></excel-dropdown-icon>
					</button>
					<select is="theme-switcher"></select>
				</div>

				<img src="//lh3.googleusercontent.com/a/ACg8ocJurJ724n294UpZHA1EukYYB2H7x5MFFOrW47W0rMAeFo6MzA=s50-c-k-no" style="width: 32px; height: 32px; border-radius: 50%; margin-left: 10px;">
			</div>
		`;

		this.querySelector("#share-buttons")?.addEventListener("click", () => this.toggleThemeMenu());
	}
}

customElements.define("excel-menu", ExcelMenu, { extends: "menu" });