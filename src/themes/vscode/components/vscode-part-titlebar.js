import ThemeSwitcher from "/src/components/theme-switcher.js";

export default class VscodePartTitlebar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.id = "workbench.parts.titlebar";
		this.classList.add("part", "titlebar");
		this.setAttribute("role", "none");
		this.style.cssText = "background-color: rgb(31, 31, 31); color: rgb(157, 157, 157); border-bottom: 1px solid rgb(43, 43, 43); --zoom-factor: 1; width: 100%; height: 35px;";
		this.innerHTML = `
			<div class="titlebar-container has-center">
                <div class="titlebar-left">
                    <a class="window-appicon"></a>
                    <div class="window-controls-container"></div>
                </div>
                <div class="titlebar-center">
                    <div class="window-title">
                        <div class="command-center">
                            <div class="monaco-toolbar">
                                <div class="monaco-action-bar">
                                    <ul class="actions-container" role="toolbar">
                                        <li class="action-item disabled menu-entry" role="presentation" custom-hover="true">
                                            <a class="action-label disabled codicon codicon-arrow-left" role="button" aria-label="돌아가기 (&lt;Alt&gt;+LeftArrow)" aria-disabled="true" tabindex="0"></a>
                                        </li>
                                        <li class="action-item disabled menu-entry" role="presentation" custom-hover="true">
                                            <a class="action-label disabled codicon codicon-arrow-right" role="button" aria-label="앞으로 이동 (&lt;Alt&gt;+RightArrow)" aria-disabled="true" tabindex="-1"></a>
                                        </li>
                                        <li style="position: relative;" class="action-item command-center-center" role="presentation" custom-hover="true" tabindex="-1">
                                            <div class="monaco-toolbar">
                                                <div class="monaco-action-bar">
                                                    <ul class="actions-container" role="toolbar">
                                                        <li class="action-item command-center-quick-pick" role="button" aria-description="검색 작업 영역—시작 - 작업 영역 - Visual Studio Code" custom-hover="true" tabindex="0">
                                                            <span aria-hidden="true" class="codicon codicon-search search-icon"></span>
                                                            <span class="search-label">작업 영역</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <select is="theme-switcher"></select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="titlebar-right">
                    <div class="action-toolbar-container">
                        <div class="monaco-toolbar">
                            <div class="monaco-action-bar">
                                <ul class="actions-container" role="toolbar" aria-label="제목 작업">
                                    <li class="action-item menu-entry" role="presentation" custom-hover="true">
                                        <a class="action-label codicon codicon-configure-layout-icon" role="button" aria-label="레이아웃 사용자 지정..." tabindex="0"></a>
                                    </li>
                                    <li class="action-item menu-entry" role="presentation" custom-hover="true">
                                        <a class="action-label checked codicon codicon-panel-left" role="checkbox" aria-label="기본 사이드바 설정/해제 (Ctrl+B)" aria-checked="true" tabindex="-1"></a>
                                    </li>
                                    <li class="action-item menu-entry" role="presentation" custom-hover="true">
                                        <a class="action-label codicon codicon-panel-layout-icon-off" role="checkbox" aria-label="패널 설정/해제 (Ctrl+J)" aria-checked="false" tabindex="-1"></a>
                                    </li>
                                    <li class="action-item menu-entry" role="presentation" custom-hover="true">
                                        <a class="action-label codicon codicon-auxiliarybar-right-off-layout-icon" role="checkbox" aria-label="보조 사이드바 설정/해제 (Ctrl+&lt;Alt&gt;+B)" aria-checked="false" tabindex="-1"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="window-controls-container"></div>
                </div>
            </div>
		`;
	}
}

customElements.define("vscode-part-titlebar", VscodePartTitlebar);