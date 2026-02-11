export default class VscodePartBanner extends HTMLElement {
	constructor() {
		super();
	}

	render() {
		this.id = "workbench.parts.banner";
		this.classList.add("part banner");
		this.setAttribute("role", "banner");
		this.setAttribute("tabindex", "0");
		this.setAttribute("data-keybinding-context", "2");
		this.setAttribute("aria-label", "Visual Studio Code(미리 보기). 언제 어디서나 브라우저에서 사용할 수 있습니다.");
		this.style.cssText = "overflow: hidden;";
		this.innerHTML = `
			<div class="icon-container custom-icon" aria-hidden="true"></div>
			<div class="message-container" aria-hidden="true">
				<span>Visual Studio Code(미리 보기). 언제 어디서나 브라우저에서 사용할 수 있습니다.</span>
			</div>
			<div class="message-actions-container">
				<a class="monaco-link" tabindex="0" href="https://aka.ms/vscode-web-docs" role="button" aria-disabled="false" style="pointer-events: auto; opacity: 1; cursor: pointer;">문서 읽기</a>
				<a class="monaco-link" tabindex="0" href="https://go.microsoft.com/fwlink/?LinkId=521839" role="button" aria-disabled="false" style="pointer-events: auto; opacity: 1; cursor: pointer;">개인정보처리방침 및 위치정보이용약관</a>
				<a class="monaco-link" tabindex="0" href="https://www.microsoft.com/en-us/legal/terms-of-use" role="button" aria-disabled="false" style="pointer-events: auto; opacity: 1; cursor: pointer;">사용 약관</a>
				<a class="monaco-link" tabindex="0" href="https://code.visualstudio.com/download" role="button" aria-disabled="false" style="pointer-events: auto; opacity: 1; cursor: pointer;">VS Code 다운로드</a>
			</div>
			<div class="action-container">
				<div class="monaco-action-bar">
					<ul class="actions-container" role="toolbar">
						<li class="action-item" role="presentation" custom-hover="true">
							<a class="action-label codicon codicon-widget-close" role="button" aria-label="배너 닫기" tabindex="-1"></a>
						</li>
					</ul>
				</div>
			</div>
		`;
	}
}

customElements.define("vscode-part-banner", VscodePartBanner);