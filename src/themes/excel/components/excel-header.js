class ExcelHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.style.cssText = "background: #f9fbfd; border-bottom: 1px solid #f9fbfd; margin-bottom: -1px; display: flex; align-items: center; padding: 0 12px; height: 4rem";
		this.innerHTML = `
			<div style="display: flex; align-items: center;">
				<!-- Google Sheets Logo -->
				<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -717px -926px; width: 2.25rem; height: 2.25rem; margin: 0.5rem;"></div>

				<div style="display: flex; flex-direction: column;">
					<div style="display: flex; align-items: center; gap: 0.5rem">
						<input value="${this.getAttribute("room")}" style="font-size: 1.125rem; width: 14.438rem; border: none; border-radius: 0.25rem; padding: 0.063rem 0.375rem; background: transparent; color: #000000; font-variant-ligatures: no-contextual; height: 20px; line-height: 22px; white-space: nowrap;" />
						
						<!-- Star Icon -->
						<button style="background:none; border:none; cursor:pointer; padding: 0.25rem;">
							<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -202px -2102px; width: 1.25rem; height: 1.25rem;"></div>
						</button>
						<!-- Drive Icon -->
						<button style="background:none; border:none; cursor:pointer; padding: 0.25rem;">
							<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -1434px -416px; width: 1.25rem; height: 1.25rem;"></div>
						</button>
						<!-- Cloud Check Icon -->
						<button style="background:none; border:none; cursor:pointer; padding: 0.25rem;">
							<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -660px -1578px; width: 1.25rem; height: 1.25rem;"></div>
						</button>
					</div>

					<div style="display: flex; align-items: center; gap: 0.2rem">
						${["파일", "수정", "보기", "삽입", "서식", "데이터", "도구", "확장 프로그램", "도움말"].map(label => `<button style="background: none; border: none; color: #444746; font-size: 0.875rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${label}</button>`).join('')}
					</div>
				</div>
			</div>

			<div style="display: flex; align-items: center; gap: 1rem; margin-left: auto;">
				<!-- History Icon -->
				<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -786px -1482px; width: 1.5rem; height: 1.5rem;"></div>
				
				<!-- Comment Icon -->
				<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -90px -324px; width: 1.5rem; height: 1.5rem;"></div>
				
				<!-- Meet Icon -->
				<div class="gh-logo" style="background: url(/src/themes/excel/images/material_common_sprite908_gm3_grey_medium.svg) no-repeat -1386px -1234px; width: 1.5rem; height: 1.5rem;"></div>
				
				<button style="background: #c2e7ff; color: #001d35; border: none; border-radius: 16px; padding: 8px 20px; font-weight: 500; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
					<div class="gh-logo" style="background: url(/src/themes/excel/images/sprite-24.svg) no-repeat -0px -236px; width: 1.125rem; height: 1.125rem;"></div>
					공유
				</button>
				
				<img src="//lh3.googleusercontent.com/a/ACg8ocJurJ724n294UpZHA1EukYYB2H7x5MFFOrW47W0rMAeFo6MzA=s50-c-k-no" style="width: 32px; height: 32px; border-radius: 50%; margin-left: 10px;">
			</div>
		`;
	}
}

customElements.define("excel-header", ExcelHeader, { extends: "header" });
export default ExcelHeader;