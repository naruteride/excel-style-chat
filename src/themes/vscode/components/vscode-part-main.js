export default class VscodePartMain extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.classList.add("monaco-grid-branch-node");
		this.innerHTML = `
			<div class="monaco-split-view2 horizontal">
				<div class="sash-container">
					<div class="monaco-sash vertical disabled" style="left: 46px;"></div>
					<div class="monaco-sash vertical" style="left: 346px;"></div>
					<div class="monaco-sash vertical disabled" style="left: 1362px;"></div>
				</div>
				<div class="monaco-scrollable-element " role="presentation"
					 style="position: relative; overflow: hidden;">
					<div class="split-view-container" style="overflow: hidden;">
						<div class="split-view-view visible" style="left: 0px; width: 48px;">
							<div class="part activitybar left" id="workbench.parts.activitybar" role="none"
								 style="background-color: rgb(51, 51, 51);">
								<div class="content" style="width: 48px; height: 862px;">
									<div class="menubar compact inactive overflow-menu-only" role="menubar">
										<div class="menubar-menu-button" role="menuitem" tabindex="0"
											 aria-label="애플리케이션 메뉴"
											 aria-haspopup="true" style="visibility: visible;">
											<div
												class="menubar-menu-title toolbar-toggle-more codicon codicon-menubar-more"
												role="none" aria-hidden="true"></div>
										</div>
									</div>
									<div class="composite-bar">
										<div class="monaco-action-bar vertical">
											<ul class="actions-container" role="tablist" aria-label="활성 뷰 전환기">
												<li class="action-item icon checked" role="tab" draggable="true"
													aria-label=""
													aria-expanded="true" aria-selected="true" tabindex="0"
													style="--insert-border-color: #ffffff;">
													<a class="action-label codicon codicon-explorer-view-icon"
													   aria-label="탐색기(Ctrl+Shift+E)"
													   style="color: rgb(255, 255, 255);"></a>
													<div class="badge" aria-hidden="true" aria-label="탐색기(Ctrl+Shift+E)"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
												<li class="action-item icon" role="tab" draggable="true" aria-label=""
													aria-expanded="false" aria-selected="false" tabindex="-1"
													style="--insert-border-color: #ffffff;">
													<a class="action-label codicon codicon-search-view-icon"
													   aria-label="검색(Ctrl+Shift+F)"
													   style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true" aria-label="검색(Ctrl+Shift+F)"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
												<li class="action-item icon" role="tab" draggable="true" aria-label=""
													aria-expanded="false" aria-selected="false" tabindex="-1"
													style="--insert-border-color: #ffffff;">
													<a class="action-label codicon codicon-source-control-view-icon"
													   aria-label="소스 제어(Ctrl+Shift+G)"
													   style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true"
														 aria-label="소스 제어(Ctrl+Shift+G)"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
												<li class="action-item icon" role="tab" draggable="true" aria-label=""
													aria-expanded="false" aria-selected="false" tabindex="-1"
													style="--insert-border-color: #ffffff;">
													<a class="action-label codicon codicon-run-view-icon"
													   aria-label="실행 및 디버그(Ctrl+Shift+D)"
													   style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true"
														 aria-label="실행 및 디버그(Ctrl+Shift+D)"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
												<li class="action-item icon" role="tab" draggable="true" aria-label=""
													aria-expanded="false" aria-selected="false"
													style="--insert-border-color: #ffffff;" tabindex="-1">
													<a class="action-label codicon codicon-remote-explorer-view-icon"
													   aria-label="원격 탐색기" style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true" aria-label="원격 탐색기"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
												<li class="action-item icon" role="tab" draggable="true" aria-label=""
													aria-expanded="false" aria-selected="false" tabindex="-1"
													style="--insert-border-color: #ffffff;">
													<a class="action-label codicon codicon-extensions-view-icon"
													   aria-label="확장(Ctrl+Shift+X)"
													   style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true" aria-label="확장(Ctrl+Shift+X)"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
											</ul>
										</div>
									</div>
									<div>
										<div class="monaco-action-bar vertical">
											<ul class="actions-container" role="toolbar" aria-label="관리">
												<li class="action-item icon" role="button" aria-haspopup="true"
													aria-label="계정"
													tabindex="0" style="--insert-border-color: #ffffff;"><a
													class="action-label codicon codicon-accounts-view-bar-icon"
													aria-label="계정"
													style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true" aria-label="계정"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
												</li>
												<li class="action-item icon" role="button" aria-haspopup="true"
													aria-label="관리"
													tabindex="-1" style="--insert-border-color: #ffffff;"><a
													class="action-label codicon codicon-settings-view-bar-icon"
													aria-label="관리"
													style="color: rgba(255, 255, 255, 0.4);"></a>
													<div class="badge" aria-hidden="true" aria-label="관리"
														 style="display: none;">
														<div class="badge-content"
															 style="color: rgb(255, 255, 255); background-color: rgb(0, 122, 204);"></div>
													</div>
													<div class="active-item-indicator"></div>
													<div class="profile-badge" aria-hidden="true"
														 style="display: none;">
														<div class="profile-badge-content"></div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="split-view-view visible" style="left: 48px; width: 300px;">
							<div class="part sidebar left pane-composite-part" id="workbench.parts.sidebar" role="none"
								 style="background-color: rgb(37, 37, 38); outline-color: rgba(83, 89, 93, 0.5);">
								<div class="composite title has-actions">
									<div class="title-label"><h2 custom-hover="true" draggable="true"
																 style="color: rgb(187, 187, 187);">탐색기</h2></div>
									<div class="title-actions">
										<div class="monaco-toolbar">
											<div class="monaco-action-bar has-overflow">
												<ul class="actions-container" role="toolbar" aria-label="탐색기 작업">
													<li class="action-item" role="presentation">
														<div class="monaco-dropdown">
															<div class="dropdown-label"><a
																class="action-label codicon codicon-toolbar-more"
																role="button"
																aria-haspopup="true" aria-expanded="false"
																aria-label="보기 및 기타 작업..." custom-hover="true"
																tabindex="0"></a>
															</div>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="global-actions has-no-actions">
										<div class="monaco-toolbar">
											<div class="monaco-action-bar">
												<ul class="actions-container highlight-toggled" role="toolbar"></ul>
											</div>
										</div>
									</div>
								</div>
								<div class="content" style="width: 299px; height: 827px;">
									<div class="monaco-progress-container" role="progressbar" aria-valuemin="0"
										 aria-hidden="true"
										 style="display: none;">
										<div class="progress-bit"
											 style="background-color: var(--vscode-progressBar-background);"></div>
									</div>
									<div class="empty-pane-message-area">
										<div class="empty-pane-message">보기를 표시하려면 여기로 끌어다 놓으세요.</div>
									</div>
									<div class="composite viewlet explorer-viewlet" id="workbench.view.explorer">
										<div class="monaco-pane-view" data-keybinding-context="6">
											<div class="monaco-split-view2 vertical">
												<div class="sash-container">
													<div class="monaco-sash horizontal disabled" style="top: 803px;">
														<div class="orthogonal-drag-handle end"></div>
													</div>
													<div class="monaco-sash horizontal disabled" style="top: 781px;">
														<div class="orthogonal-drag-handle end"></div>
													</div>
												</div>
												<div class="monaco-scrollable-element " role="presentation"
													 style="position: relative; overflow: hidden;">
													<div class="split-view-container" style="overflow: hidden;">
														<div class="split-view-view visible"
															 style="top: 0px; height: 783px;">
															<div class="pane expanded vertical"
																 data-keybinding-context="9">
																<div class="pane-header expanded" tabindex="0"
																	 role="button"
																	 aria-label="열린 폴더 없음 섹션" aria-expanded="true"
																	 draggable="true"
																	 style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
																	<div
																		class="twisty-container codicon-view-pane-container-expanded codicon"></div>
																	<div class="icon codicon codicon-explorer-view-icon"
																		 custom-hover="true" aria-label="열린 폴더 없음"
																		 style="color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));"></div>
																	<h3 class="title" custom-hover="true">열린 폴더 없음</h3>
																	<div class="actions">
																		<div class="monaco-toolbar">
																			<div class="monaco-action-bar">
																				<ul class="actions-container"
																					role="toolbar"
																					aria-label="열린 폴더 없음 작업"></ul>
																			</div>
																		</div>
																	</div>
																</div>
																<div class="pane-body welcome">
																	<div class="welcome-view">
																		<div class="monaco-scrollable-element "
																			 role="presentation"
																			 style="position: relative; overflow: hidden;">
																			<div class="welcome-view-content"
																				 tabindex="0"
																				 style="overflow: hidden; height: 761px; width: 299px;">
																				<p>아직 폴더를 열지 않았습니다.</p>
																				<div class="button-container"><a
																					class="monaco-button monaco-text-button"
																					tabindex="0" role="button"
																					aria-disabled="false"
																					style="color: var(--vscode-button-foreground); background-color: var(--vscode-button-background); border: 1px solid var(--vscode-button-border);"><span>폴더 열기</span></a>
																				</div>
																				<div class="button-container"><a
																					class="monaco-button monaco-text-button"
																					tabindex="0" role="button"
																					aria-disabled="false"
																					style="color: var(--vscode-button-foreground); background-color: var(--vscode-button-background); border: 1px solid var(--vscode-button-border);"><span>최근 파일 열기</span></a>
																				</div>
																				<p>복제 없이 원격 리포지토리를 열거나 요청을 가져올 수
																					있습니다.</p>
																				<div class="button-container"><a
																					class="monaco-button monaco-text-button"
																					tabindex="0" role="button"
																					aria-disabled="false"
																					style="color: var(--vscode-button-foreground); background-color: var(--vscode-button-background); border: 1px solid var(--vscode-button-border);"><span>원격 리포지토리 열기</span></a>
																				</div>
																				<p>원격 터널 액세스를 사용하는 컴퓨터에 연결하거나 이 작업을 수행하는
																					방법을 알아보려면
																					여기를 클릭하세요.</p>
																				<div class="button-container"><a
																					class="monaco-button monaco-text-button"
																					tabindex="0" role="button"
																					aria-disabled="false"
																					style="color: var(--vscode-button-foreground); background-color: var(--vscode-button-background); border: 1px solid var(--vscode-button-border);"><span>터널에 연결...</span></a>
																				</div>
																			</div>
																			<div role="presentation" aria-hidden="true"
																				 class="invisible scrollbar horizontal"
																				 style="position: absolute; width: 289px; height: 0px; left: 0px; bottom: 0px;">
																				<div class="slider"
																					 style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 289px;"></div>
																			</div>
																			<div role="presentation" aria-hidden="true"
																				 class="invisible scrollbar vertical"
																				 style="position: absolute; width: 10px; height: 761px; right: 0px; top: 0px;">
																				<div class="slider"
																					 style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 761px;"></div>
																			</div>
																			<div class="shadow"></div>
																			<div class="shadow"></div>
																			<div class="shadow"></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="split-view-view visible"
															 style="top: 783px; height: 22px;">
															<div class="pane vertical" data-keybinding-context="7">
																<div class="pane-header" tabindex="0" role="button"
																	 aria-label="개요 섹션" aria-expanded="false"
																	 draggable="true"
																	 style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
																	<div
																		class="twisty-container codicon-view-pane-container-collapsed codicon"></div>
																	<div class="icon codicon codicon-outline-view-icon"
																		 custom-hover="true" aria-label="개요"
																		 style="color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));"></div>
																	<h3 class="title" custom-hover="true">개요</h3>
																	<div class="actions">
																		<div class="monaco-toolbar">
																			<div class="monaco-action-bar has-overflow">
																				<ul class="actions-container"
																					role="toolbar"
																					aria-label="개요 작업">
																					<li class="action-item menu-entry"
																						role="presentation"
																						custom-hover="true"><a
																						class="action-label codicon codicon-collapse-all"
																						role="button" aria-label="모두 축소"
																						tabindex="0"></a></li>
																					<li class="action-item"
																						role="presentation">
																						<div class="monaco-dropdown">
																							<div class="dropdown-label">
																								<a
																									class="action-label codicon codicon-toolbar-more"
																									role="button"
																									aria-haspopup="true"
																									aria-expanded="false"
																									aria-label="기타 작업..."
																									custom-hover="true"
																									tabindex="-1"></a>
																							</div>
																						</div>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="split-view-view visible"
															 style="top: 805px; height: 22px;">
															<div class="pane vertical" data-keybinding-context="8">
																<div class="pane-header timeline-view" tabindex="0"
																	 role="button"
																	 aria-label="타임라인 섹션" aria-expanded="false"
																	 draggable="true"
																	 style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
																	<div
																		class="twisty-container codicon-view-pane-container-collapsed codicon"></div>
																	<div class="icon codicon codicon-timeline-view-icon"
																		 custom-hover="true" aria-label="타임라인"
																		 style="color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));"></div>
																	<h3 class="title" custom-hover="true">타임라인</h3>
																	<div class="actions">
																		<div class="monaco-toolbar">
																			<div class="monaco-action-bar has-overflow">
																				<ul class="actions-container"
																					role="toolbar"
																					aria-label="타임라인 작업">
																					<li class="action-item menu-entry"
																						role="presentation"
																						custom-hover="true"><a
																						class="action-label codicon codicon-timeline-pin"
																						role="button"
																						aria-label="현재 타임라인 고정"
																						tabindex="0"></a></li>
																					<li class="action-item menu-entry"
																						role="presentation"
																						custom-hover="true"><a
																						class="action-label codicon codicon-timeline-refresh"
																						role="button" aria-label="새로 고침"
																						tabindex="-1"></a></li>
																					<li class="action-item menu-entry"
																						role="presentation">
																						<div class="monaco-dropdown">
																							<div class="dropdown-label">
																								<a
																									class="action-label codicon codicon-timeline-filter"
																									role="button"
																									aria-haspopup="true"
																									aria-expanded="false"
																									aria-label="타임라인 필터링"
																									custom-hover="true"
																									tabindex="-1"></a>
																							</div>
																						</div>
																					</li>
																					<li class="action-item"
																						role="presentation">
																						<div class="monaco-dropdown">
																							<div class="dropdown-label">
																								<a
																									class="action-label codicon codicon-toolbar-more"
																									role="button"
																									aria-haspopup="true"
																									aria-expanded="false"
																									aria-label="기타 작업..."
																									custom-hover="true"
																									tabindex="-1"></a>
																							</div>
																						</div>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div role="presentation" aria-hidden="true"
														 class="invisible scrollbar horizontal"
														 style="position: absolute; width: 0px; height: 0px; left: 0px; bottom: 0px;">
														<div class="slider"
															 style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 0px;"></div>
													</div>
													<div role="presentation" aria-hidden="true"
														 class="invisible scrollbar vertical"
														 style="position: absolute; width: 10px; height: 827px; right: 0px; top: 0px;">
														<div class="slider"
															 style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 827px;"></div>
													</div>
													<div class="shadow"></div>
													<div class="shadow"></div>
													<div class="shadow"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="split-view-view visible" style="left: 348px;width: calc(100% - 348px);">
							<div class="monaco-grid-branch-node">
								<div class="monaco-split-view2 vertical">
									<div class="sash-container">
										<div class="monaco-sash horizontal maximum" style="top: 860px;">
											<div class="orthogonal-drag-handle start"></div>
										</div>
									</div>
									<div class="monaco-scrollable-element " role="presentation"
										 style="position: relative; overflow: hidden;">
										<div class="split-view-container" style="overflow: hidden;">
											<div class="split-view-view visible" style="top: 0px; height: 862px;">
												<div class="part editor" id="workbench.parts.editor" role="main">
													<div class="content" data-keybinding-context="1"
														 style="overflow: hidden;background-color: rgb(30, 30, 30);width: 100%;height: 862px;">
														<div class="grid-view-container">
															<div class="monaco-grid-view">
																<div class="monaco-grid-branch-node">
																	<div
																		class="monaco-split-view2 vertical separator-border"
																		style="--separator-border: #444444;">
																		<div class="sash-container"></div>
																		<div class="monaco-scrollable-element "
																			 role="presentation"
																			 style="position: relative; overflow: hidden;">
																			<div class="split-view-container"
																				 style="overflow: hidden;">
																				<div class="split-view-view visible"
																					 style="top: 0px; height: 862px;">
																					<div data-keybinding-context="3"
																						 class="editor-group-container active">
																						<div
																							class="editor-group-container-toolbar">
																							<div
																								class="monaco-action-bar">
																								<ul class="actions-container highlight-toggled"
																									role="toolbar"
																									aria-label="빈 편집기 그룹 작업"></ul>
																							</div>
																						</div>
																						<div
																							class="editor-group-watermark">
																							<div
																								class="watermark-container">
																								<div
																									class="letterpress"></div>
																								<div class="shortcuts">
																									<div
																										class="watermark-box">
																										<dl>
																											<dt>모든 명령
																												표시
																											</dt>
																											<dd>
																												<div
																													class="monaco-keybinding"
																													custom-hover="true"
																													aria-label="Ctrl+Shift+P"
																													style="color: var(--vscode-keybindingLabel-foreground);">
																										<span
																											class="monaco-keybinding-key"
																											style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">Ctrl</span><span
																													class="monaco-keybinding-key-separator">+</span><span
																													class="monaco-keybinding-key"
																													style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">Shift</span><span
																													class="monaco-keybinding-key-separator">+</span><span
																													class="monaco-keybinding-key"
																													style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">P</span>
																												</div>
																											</dd>
																										</dl>
																										<dl>
																											<dt>파일로 이동
																											</dt>
																											<dd>
																												<div
																													class="monaco-keybinding"
																													custom-hover="true"
																													aria-label="Ctrl+P"
																													style="color: var(--vscode-keybindingLabel-foreground);">
																										<span
																											class="monaco-keybinding-key"
																											style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">Ctrl</span><span
																													class="monaco-keybinding-key-separator">+</span><span
																													class="monaco-keybinding-key"
																													style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">P</span>
																												</div>
																											</dd>
																										</dl>
																										<dl>
																											<dt>파일에서
																												찾기
																											</dt>
																											<dd>
																												<div
																													class="monaco-keybinding"
																													custom-hover="true"
																													aria-label="Ctrl+Shift+F"
																													style="color: var(--vscode-keybindingLabel-foreground);">
																										<span
																											class="monaco-keybinding-key"
																											style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">Ctrl</span><span
																													class="monaco-keybinding-key-separator">+</span><span
																													class="monaco-keybinding-key"
																													style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">Shift</span><span
																													class="monaco-keybinding-key-separator">+</span><span
																													class="monaco-keybinding-key"
																													style="background-color: var(--vscode-keybindingLabel-background); border-top-color: ; border-right-color: ; border-bottom-color: var(--vscode-keybindingLabel-bottomBorder); border-left-color: ; box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);">F</span>
																												</div>
																											</dd>
																										</dl>
																									</div>
																								</div>
																							</div>
																						</div>
																						<div
																							class="monaco-progress-container done"
																							role="progressbar"
																							aria-valuemin="0"
																							aria-hidden="true"
																							style="display: none; top: 33px;">
																							<div class="progress-bit"
																								 style="background-color: var(--vscode-progressBar-background); width: inherit; opacity: 1;"></div>
																						</div>
																						<div
																							class="title tabs show-file-icons"
																							style="--editor-group-tab-height: 35px; background-color: rgb(37, 37, 38);">
																							<div
																								class="tabs-and-actions-container"
																								data-keybinding-context="4"
																								style="">
																								<div
																									class="monaco-scrollable-element "
																									role="presentation"
																									style="position: relative; overflow: hidden;">
																									<div
																										class="tabs-container"
																										role="tablist"
																										draggable="true"
																										style="overflow: hidden;">
																										<div
																											class="tab tab-actions-right sizing-fit active selected has-icon"
																											draggable="true"
																											role="tab"
																											aria-label="시작, 미리 보기"
																											aria-description=""
																											custom-hover="true"
																											data-resource-name="vscode_getting_started_page"
																											aria-selected="true"
																											tabindex="0"
																											style="left: auto; border-right: 1px solid rgb(37, 37, 38);">
																											<div
																												class="tab-border-top-container"></div>
																											<div
																												class="monaco-icon-label file-icon vscode_getting_started_page-name-file-icon name-file-icon ext-file-icon unknown-lang-file-icon tab-label tab-label-has-badge italic"
																												aria-label="시작">
																												<div
																													class="monaco-icon-label-container">
																										<span
																											class="monaco-icon-name-container"><a
																											class="label-name">시작</a></span>
																												</div>
																											</div>
																											<div
																												class="tab-actions">
																												<div
																													class="monaco-action-bar">
																													<ul class="actions-container"
																														role="toolbar"
																														aria-label="탭 작업">
																														<li class="action-item"
																															role="presentation"
																															custom-hover="true">
																															<a class="action-label codicon codicon-close"
																															   role="button"
																															   aria-label="닫기(Ctrl+F4)"
																															   tabindex="0"></a>
																														</li>
																													</ul>
																												</div>
																											</div>
																											<div
																												class="tab-fade-hider"></div>
																											<div
																												class="tab-border-bottom-container"></div>
																										</div>
																									</div>
																									<div
																										role="presentation"
																										aria-hidden="true"
																										class="invisible scrollbar horizontal"
																										style="position: absolute; width: 952px; height: 3px; left: 0px; bottom: 0px;">
																										<div
																											class="slider"
																											style="position: absolute; top: 0px; left: 0px; height: 3px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 952px;"></div>
																									</div>
																									<div
																										role="presentation"
																										aria-hidden="true"
																										class="invisible scrollbar vertical"
																										style="position: absolute; width: 0px; height: 0px; right: 0px; top: 0px;">
																										<div
																											class="slider"
																											style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 0px;"></div>
																									</div>
																								</div>
																								<div
																									class="editor-actions">
																									<div
																										class="monaco-toolbar">
																										<div
																											class="monaco-action-bar has-overflow">
																											<ul class="actions-container highlight-toggled"
																												role="toolbar"
																												aria-label="편집기 작업">
																												<li class="action-item menu-entry"
																													role="presentation"
																													custom-hover="true">
																													<a class="action-label codicon codicon-split-horizontal"
																													   role="button"
																													   aria-label="편집기를 오른쪽으로 분할 (Ctrl+)
[&lt;Alt&gt;] 편집기를 아래로 분할" tabindex="0"></a></li>
																												<li class="action-item"
																													role="presentation">
																													<div
																														class="monaco-dropdown">
																														<div
																															class="dropdown-label">
																															<a class="action-label codicon codicon-toolbar-more"
																															   role="button"
																															   aria-haspopup="true"
																															   aria-expanded="false"
																															   aria-label="기타 작업..."
																															   custom-hover="true"
																															   tabindex="-1"></a>
																														</div>
																													</div>
																												</li>
																											</ul>
																										</div>
																									</div>
																								</div>
																							</div>
																							<div
																								class="breadcrumbs-below-tabs">
																								<div
																									class="breadcrumbs-control hidden">
																									<div
																										class="monaco-scrollable-element "
																										role="presentation"
																										style="position: relative; overflow: hidden;">
																										<div
																											class="monaco-breadcrumbs"
																											tabindex="0"
																											role="list"
																											style="overflow: hidden;">
																											<style
																												type="text/css"
																												media="screen">.monaco-breadcrumbs {
																												background-color: var(--vscode-breadcrumb-background)
																											}

																											.monaco-breadcrumbs .monaco-breadcrumb-item {
																												color: var(--vscode-breadcrumb-foreground)
																											}

																											.monaco-breadcrumbs .monaco-breadcrumb-item.focused {
																												color: var(--vscode-breadcrumb-focusForeground)
																											}

																											.monaco-breadcrumbs .monaco-breadcrumb-item.focused.selected {
																												color: var(--vscode-breadcrumb-activeSelectionForeground)
																											}

																											.monaco-breadcrumbs:not(.disabled\t) .monaco-breadcrumb-item:hover:not(.focused):not(.selected) {
																												color: var(--vscode-breadcrumb-focusForeground)
																											}
																											</style>
																										</div>
																										<div
																											role="presentation"
																											aria-hidden="true"
																											class="invisible scrollbar horizontal"
																											style="position: absolute;">
																											<div
																												class="slider"
																												style="position: absolute; top: 0px; left: 0px; height: 3px; transform: translate3d(0px, 0px, 0px); contain: strict;"></div>
																										</div>
																										<div
																											role="presentation"
																											aria-hidden="true"
																											class="invisible scrollbar vertical"
																											style="position: absolute;">
																											<div
																												class="slider"
																												style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict;"></div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																						<div class="editor-container"
																							 style="background-color: rgb(30, 30, 30); height: 827px;">
																							<div
																								class="editor-instance">
																								<div
																									class="gettingStartedContainer animatable width-semi-constrained"
																									role="document"
																									tabindex="0"
																									aria-label="편집기를 사용하여 작업 속도를 향상하는 방법에 관한 개요입니다."
																									data-keybinding-context="10">
																									<div
																										class="gettingStarted showCategories">
																										<div
																											class="monaco-scrollable-element full-height-scrollable categoriesScrollbar"
																											role="presentation"
																											style="position: relative; overflow: hidden;">
																											<div
																												class="gettingStartedSlideCategories gettingStartedSlide"
																												style="overflow: hidden;">
																												<div
																													class="gettingStartedCategoriesContainer">
																													<div
																														class="header">
																														<h1 class="product-name caption">
																															Visual
																															Studio
																															Code</h1>
																														<p class="subtitle description">
																															편집
																															향상됨</p>
																													</div>
																													<div
																														class="categories-column categories-column-left">
																														<div
																															class="index-list start-container">
																															<h2>
																																시작</h2>
																															<div
																																class="monaco-scrollable-element "
																																role="presentation"
																																style="position: relative; overflow: hidden;">
																																<ul style="overflow: hidden;">
																																	<li>
																																		<button
																																			class="button-link"
																																			x-dispatch="selectStartEntry:welcome.showNewFileEntries"
																																			title="제목 없는 새 텍스트 파일, Notebook 또는 사용자 지정 편집기를 엽니다. (Ctrl+&lt;Alt&gt;+Windows+N)">
																																			<div
																																				class="codicon codicon-new-file icon-widget"></div>
																																			<span>새 파일...</span>
																																		</button>
																																	</li>
																																	<li>
																																		<button
																																			class="button-link"
																																			x-dispatch="selectStartEntry:topLevelOpenFile"
																																			title="파일을 열어 작업을 시작합니다. (Ctrl+O)">
																																			<div
																																				class="codicon codicon-go-to-file icon-widget"></div>
																																			<span>파일 열기...</span>
																																		</button>
																																	</li>
																																	<li>
																																		<button
																																			class="button-link"
																																			x-dispatch="selectStartEntry:topLevelOpenFolderWeb"
																																			title="폴더를 열어 작업을 시작합니다. (Ctrl+O)">
																																			<div
																																				class="codicon codicon-folder-opened icon-widget"></div>
																																			<span>폴더 열기...</span>
																																		</button>
																																	</li>
																																	<li>
																																		<button
																																			class="button-link"
																																			x-dispatch="selectStartEntry:topLevelGitOpen"
																																			title="원격 리포지토리 또는 끌어오기 요청에 연결하여 찾아보기, 검색, 편집 및 커밋 ">
																																			<div
																																				class="codicon codicon-source-control icon-widget"></div>
																																			<span>리포지토리 열기...</span>
																																		</button>
																																	</li>
																																	<li>
																																		<button
																																			class="button-link"
																																			x-dispatch="selectStartEntry:topLevelOpenTunnel"
																																			title="터널을 통해 원격 컴퓨터에 연결 ">
																																			<div
																																				class="codicon codicon-remote icon-widget"></div>
																																			<span>터널 열기...</span>
																																		</button>
																																	</li>
																																</ul>
																																<div
																																	role="presentation"
																																	aria-hidden="true"
																																	class="invisible scrollbar horizontal"
																																	style="position: absolute; width: 377px; height: 10px; left: 0px; bottom: 0px;">
																																	<div
																																		class="slider"
																																		style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 377px;"></div>
																																</div>
																																<div
																																	role="presentation"
																																	aria-hidden="true"
																																	class="invisible scrollbar vertical"
																																	style="position: absolute; width: 10px; height: 155px; right: 0px; top: 0px;">
																																	<div
																																		class="slider"
																																		style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 155px;"></div>
																																</div>
																																<div
																																	class="shadow"></div>
																																<div
																																	class="shadow"></div>
																																<div
																																	class="shadow"></div>
																															</div>
																														</div>
																														<div
																															class="index-list recently-opened">
																															<h2>
																																최근
																																항목</h2>
																															<div
																																class="monaco-scrollable-element "
																																role="presentation"
																																style="position: relative; overflow: hidden;">
																																<ul style="overflow: hidden;">
																																	<div
																																		class="empty-recent">
																																		최근
																																		폴더가
																																		없습니다.
																																		<button
																																			class="button-link"
																																			x-dispatch="openFolder">
																																			폴더
																																			열기
																																		</button>
																																		시작합니다.
																																	</div>
																																</ul>
																																<div
																																	role="presentation"
																																	aria-hidden="true"
																																	class="invisible scrollbar horizontal"
																																	style="position: absolute; width: 377px; height: 10px; left: 0px; bottom: 0px;">
																																	<div
																																		class="slider"
																																		style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 377px;"></div>
																																</div>
																																<div
																																	role="presentation"
																																	aria-hidden="true"
																																	class="invisible scrollbar vertical"
																																	style="position: absolute; width: 10px; height: 24px; right: 0px; top: 0px;">
																																	<div
																																		class="slider"
																																		style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 24px;"></div>
																																</div>
																																<div
																																	class="shadow"></div>
																																<div
																																	class="shadow"></div>
																																<div
																																	class="shadow"></div>
																															</div>
																														</div>
																													</div>
																													<div
																														class="categories-column categories-column-right">
																														<div
																															class="index-list getting-started">
																															<h2>
																																연습</h2>
																															<div
																																class="monaco-scrollable-element "
																																role="presentation"
																																style="position: relative; overflow: hidden;">
																																<ul style="overflow: hidden;">
																																	<button
																																		class="getting-started-category featured"
																																		x-dispatch="selectCategory:SetupWeb"
																																		title="편집기 사용자 지정, 기본 사항 알아보기 및 코딩 시작">
																																		<div
																																			class="featured-badge">
																																			<div
																																				class="featured">
																																	<span
																																		class="featured-icon codicon codicon-star-full"></span>
																																			</div>
																																		</div>
																																		<div
																																			class="main-content">
																																			<div
																																				class="codicon codicon-getting-started-setup icon-widget"></div>
																																			<h3 class="category-title max-lines-3"
																																				x-category-title-for="SetupWeb">
																																				웹용
																																				VS
																																				Code
																																				시작</h3>
																																			<div
																																				class="no-badge"></div>
																																			<a class="codicon codicon-close hide-category-button"
																																			   tabindex="0"
																																			   x-dispatch="hideCategory:SetupWeb"
																																			   title="숨기기"
																																			   role="button"
																																			   aria-label="숨기기"></a>
																																		</div>
																																		<div
																																			class="description-content">
																																			편집기
																																			사용자
																																			지정,
																																			기본
																																			사항
																																			알아보기
																																			및
																																			코딩
																																			시작
																																		</div>
																																		<div
																																			class="category-progress"
																																			x-data-category-id="SetupWeb">
																																			<div
																																				class="progress-bar-outer"
																																				role="progressbar">
																																				<div
																																					class="progress-bar-inner"
																																					aria-valuemin="0"
																																					aria-valuenow="1"
																																					aria-valuemax="6"
																																					title="1/6 단계 완료"
																																					style="width: 16.6667%;"></div>
																																			</div>
																																		</div>
																																	</button>
																																	<button
																																		class="getting-started-category no-progress"
																																		x-dispatch="selectCategory:ms-vscode.remote-repositories#remoteRepositoriesWalkthrough"
																																		title="로컬 컴퓨터에 복제하지 않고 GitHub 및 Azure Repos에서 호스팅되는 리포지토리에서 보고, 검색하고, 편집하고, 빠르게 커밋하세요.">
																																		<div
																																			class="featured-badge"></div>
																																		<div
																																			class="main-content">
																																			<img
																																				class="category-icon icon-widget"
																																				src="https://ms-vscode.vscode-unpkg.net/ms-vscode/remote-repositories/0.42.0/extension/resources/remote-repositories.png">
																																			<h3 class="category-title max-lines-3"
																																				x-category-title-for="ms-vscode.remote-repositories#remoteRepositoriesWalkthrough">
																																				복제할
																																				필요
																																				없이
																																				원격
																																				리포지토리
																																				검색
																																				및
																																				편집</h3>
																																			<div
																																				class="new-badge">
																																				<div
																																					class="new-category">
																																					새로
																																					만들기
																																				</div>
																																			</div>
																																			<a class="codicon codicon-close hide-category-button"
																																			   tabindex="0"
																																			   x-dispatch="hideCategory:ms-vscode.remote-repositories#remoteRepositoriesWalkthrough"
																																			   title="숨기기"
																																			   role="button"
																																			   aria-label="숨기기"></a>
																																		</div>
																																		<div
																																			class="description-content"></div>
																																		<div
																																			class="category-progress"
																																			x-data-category-id="ms-vscode.remote-repositories#remoteRepositoriesWalkthrough">
																																			<div
																																				class="progress-bar-outer"
																																				role="progressbar">
																																				<div
																																					class="progress-bar-inner"
																																					aria-valuemin="0"
																																					aria-valuenow="0"
																																					aria-valuemax="4"
																																					title="0/4 단계 완료"
																																					style="width: 0%;"></div>
																																			</div>
																																		</div>
																																	</button>
																																	<button
																																		class="getting-started-category no-progress"
																																		x-dispatch="selectCategory:Beginner"
																																		title="가장 중요한 기능에 대한 개요 보기">
																																		<div
																																			class="featured-badge"></div>
																																		<div
																																			class="main-content">
																																			<div
																																				class="codicon codicon-getting-started-beginner icon-widget"></div>
																																			<h3 class="category-title max-lines-3"
																																				x-category-title-for="Beginner">
																																				기본
																																				사항
																																				알아보기</h3>
																																			<div
																																				class="no-badge"></div>
																																			<a class="codicon codicon-close hide-category-button"
																																			   tabindex="0"
																																			   x-dispatch="hideCategory:Beginner"
																																			   title="숨기기"
																																			   role="button"
																																			   aria-label="숨기기"></a>
																																		</div>
																																		<div
																																			class="description-content"></div>
																																		<div
																																			class="category-progress"
																																			x-data-category-id="Beginner">
																																			<div
																																				class="progress-bar-outer"
																																				role="progressbar">
																																				<div
																																					class="progress-bar-inner"
																																					aria-valuemin="0"
																																					aria-valuenow="0"
																																					aria-valuemax="1"
																																					title="0/1 단계 완료"
																																					style="width: 0%;"></div>
																																			</div>
																																		</div>
																																	</button>
																																	<span
																																		class="button-link see-all-walkthroughs"
																																		x-dispatch="seeAllWalkthroughs"
																																		tabindex="0">자세히...</span>
																																</ul>
																																<div
																																	role="presentation"
																																	aria-hidden="true"
																																	class="invisible scrollbar horizontal"
																																	style="position: absolute; width: 377px; height: 10px; left: 0px; bottom: 0px;">
																																	<div
																																		class="slider"
																																		style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 377px;"></div>
																																</div>
																																<div
																																	role="presentation"
																																	aria-hidden="true"
																																	class="invisible scrollbar vertical"
																																	style="position: absolute; width: 10px; height: 175px; right: 0px; top: 0px;">
																																	<div
																																		class="slider"
																																		style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 175px;"></div>
																																</div>
																																<div
																																	class="shadow"></div>
																																<div
																																	class="shadow"></div>
																																<div
																																	class="shadow"></div>
																															</div>
																														</div>
																													</div>
																													<div
																														class="footer">
																														<p class="showOnStartup"></p>
																														<div
																															class="monaco-custom-toggle codicon codicon-check getting-started-checkbox checked"
																															tabindex="0"
																															role="checkbox"
																															aria-checked="true"
																															aria-label="선택하면 시작 시 이 페이지가 표시됩니다."
																															id="showOnStartup"
																															style="border-color: var(--vscode-inputOption-activeBorder); color: var(--vscode-inputOption-activeForeground); background-color: var(--vscode-inputOption-activeBackground);"></div>
																														<label
																															class="caption"
																															for="showOnStartup">시작
																															시
																															시작
																															페이지
																															표시</label>
																														<p></p>
																														<p class="telemetry-notice"></p>
																														<div
																															class="rendered-markdown">
																															<p>
																																Code은(는)
																																사용량
																																현황
																																데이터를
																																수집합니다.
																																<a href=""
																																   title="command:workbench.action.openPrivacyStatementUrl"
																																   draggable="false"
																																   data-href="command:workbench.action.openPrivacyStatementUrl">개인정보처리방침</a>을(를)
																																읽고
																																<a href=""
																																   title="command:settings.filterByTelemetry"
																																   draggable="false"
																																   data-href="command:settings.filterByTelemetry">옵트아웃</a>
																																방법을
																																알아봅니다.
																															</p>
																														</div>
																														<p></p>
																													</div>
																												</div>
																											</div>
																											<div
																												role="presentation"
																												aria-hidden="true"
																												class="invisible scrollbar horizontal"
																												style="position: absolute; width: 0px; height: 10px; left: 0px; bottom: 0px;">
																												<div
																													class="slider"
																													style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 0px;"></div>
																											</div>
																											<div
																												role="presentation"
																												aria-hidden="true"
																												class="invisible scrollbar vertical"
																												style="position: absolute; width: 0px; height: 0px; right: 0px; top: 0px;">
																												<div
																													class="slider"
																													style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 0px;"></div>
																											</div>
																											<div
																												class="shadow"></div>
																											<div
																												class="shadow"></div>
																											<div
																												class="shadow"></div>
																										</div>
																										<div
																											class="gettingStartedSlideDetails gettingStartedSlide">
																											<button
																												class="prev-button button-link"
																												x-dispatch="scrollPrev"
																												disabled=""
																												style="display: none;">
																									<span
																										class="scroll-button codicon codicon-chevron-left"></span><span
																												class="moreText">돌아가기</span>
																											</button>
																											<div
																												class="monaco-scrollable-element full-height-scrollable"
																												role="presentation"
																												style="position: relative; overflow: hidden;">
																												<div
																													class="gettingStartedDetailsContent"
																													style="overflow: hidden;"></div>
																												<div
																													role="presentation"
																													aria-hidden="true"
																													class="invisible scrollbar horizontal"
																													style="position: absolute; width: 564px; height: 10px; left: 0px; bottom: 0px;">
																													<div
																														class="slider"
																														style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 564px;"></div>
																												</div>
																												<div
																													role="presentation"
																													aria-hidden="true"
																													class="invisible scrollbar vertical"
																													style="position: absolute; width: 0px; height: 827px; right: 0px; top: 0px;">
																													<div
																														class="slider"
																														style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 827px;"></div>
																												</div>
																												<div
																													class="shadow"></div>
																												<div
																													class="shadow"></div>
																												<div
																													class="shadow"></div>
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div role="presentation" aria-hidden="true"
																				 class="invisible scrollbar horizontal"
																				 style="position: absolute; width: 0px; height: 0px; left: 0px; bottom: 0px;">
																				<div class="slider"
																					 style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 0px;"></div>
																			</div>
																			<div role="presentation" aria-hidden="true"
																				 class="invisible scrollbar vertical"
																				 style="position: absolute; width: 10px; height: 862px; right: 0px; top: 0px;">
																				<div class="slider"
																					 style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 862px;"></div>
																			</div>
																			<div class="shadow"></div>
																			<div class="shadow"></div>
																			<div class="shadow"></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="drop-block-overlay"></div>
												</div>
											</div>
											<div class="split-view-view" style="top: 862px; height: 0px;">
												<div class="part panel basepanel bottom pane-composite-part"
													 id="workbench.parts.panel" role="none"
													 style="background-color: rgb(30, 30, 30); border-left-color: rgba(128, 128, 128, 0.35); border-right-color: rgba(128, 128, 128, 0.35); border-bottom-color: rgba(128, 128, 128, 0.35);">
													<div class="composite title has-composite-bar"
														 style="border-top-color: rgba(128, 128, 128, 0.35);">
														<div class="composite-bar-container">
															<div class="composite-bar">
																<div class="monaco-action-bar">
																	<ul class="actions-container" role="tablist"
																		aria-label="활성 뷰 전환기"></ul>
																</div>
															</div>
														</div>
														<div class="title-label"><h2 custom-hover="true"
																					 draggable="true"></h2>
														</div>
														<div class="title-actions">
															<div class="monaco-toolbar">
																<div class="monaco-action-bar">
																	<ul class="actions-container" role="toolbar"></ul>
																</div>
															</div>
														</div>
														<div class="global-actions">
															<div class="monaco-toolbar">
																<div class="monaco-action-bar">
																	<ul class="actions-container highlight-toggled"
																		role="toolbar">
																		<li class="action-item menu-entry"
																			role="presentation"
																			custom-hover="true"><a
																			class="action-label codicon codicon-panel-maximize"
																			role="button" aria-label="패널 크기 최대화"
																			tabindex="0"></a>
																		</li>
																		<li class="action-item menu-entry"
																			role="presentation"
																			custom-hover="true"><a
																			class="action-label codicon codicon-panel-close"
																			role="button" aria-label="패널 숨기기 (Ctrl+J)"
																			tabindex="-1"></a></li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<div class="content">
														<div class="monaco-progress-container" role="progressbar"
															 aria-valuemin="0"
															 aria-hidden="true" style="display: none;">
															<div class="progress-bit"
																 style="background-color: var(--vscode-progressBar-background);"></div>
														</div>
														<div class="empty-pane-message-area">
															<div class="empty-pane-message">보기를 표시하려면 여기로 끌어다 놓으세요.
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div role="presentation" aria-hidden="true"
											 class="invisible scrollbar horizontal"
											 style="position: absolute; width: 0px; height: 0px; left: 0px; bottom: 0px;">
											<div class="slider"
												 style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 0px;"></div>
										</div>
										<div role="presentation" aria-hidden="true" class="invisible scrollbar vertical"
											 style="position: absolute; width: 10px; height: 862px; right: 0px; top: 0px;">
											<div class="slider"
												 style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 862px;"></div>
										</div>
										<div class="shadow"></div>
										<div class="shadow"></div>
										<div class="shadow"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="split-view-view" style="left: 1364px; width: 0px;">
							<div class="part auxiliarybar basepanel right pane-composite-part"
								 id="workbench.parts.auxiliarybar"
								 role="none"
								 style="background-color: rgb(37, 37, 38); border-left-style: none; border-right-style: none; border-left-width: 0px; border-right-width: 0px;">
								<div class="composite title has-composite-bar">
									<div class="composite-bar-container">
										<div class="composite-bar">
											<div class="monaco-action-bar">
												<ul class="actions-container" role="tablist" aria-label="활성 뷰 전환기"></ul>
											</div>
										</div>
									</div>
									<div class="title-label"><h2 custom-hover="true" draggable="true"></h2></div>
									<div class="title-actions">
										<div class="monaco-toolbar">
											<div class="monaco-action-bar">
												<ul class="actions-container" role="toolbar"></ul>
											</div>
										</div>
									</div>
									<div class="global-actions">
										<div class="monaco-toolbar">
											<div class="monaco-action-bar">
												<ul class="actions-container highlight-toggled" role="toolbar">
													<li class="action-item menu-entry" role="presentation"
														custom-hover="true"><a
														class="action-label codicon codicon-auxiliarybar-maximize"
														role="button"
														aria-label="보조 사이드바 크기 최대화" tabindex="0"></a></li>
													<li class="action-item menu-entry" role="presentation"
														custom-hover="true"><a
														class="action-label codicon codicon-auxiliarybar-close"
														role="button"
														aria-label="보조 사이드바 숨기기 (Ctrl+&lt;Alt&gt;+B)" tabindex="-1"></a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div class="content">
									<div class="monaco-progress-container" role="progressbar" aria-valuemin="0"
										 aria-hidden="true"
										 style="display: none;">
										<div class="progress-bit"
											 style="background-color: var(--vscode-progressBar-background);"></div>
									</div>
									<div class="empty-pane-message-area">
										<div class="empty-pane-message">보기를 표시하려면 여기로 끌어다 놓으세요.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div role="presentation" aria-hidden="true" class="invisible scrollbar horizontal"
						 style="position: absolute; width: 1364px; height: 10px; left: 0px; bottom: 0px;">
						<div class="slider"
							 style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 1364px;"></div>
					</div>
					<div role="presentation" aria-hidden="true" class="invisible scrollbar vertical"
						 style="position: absolute; width: 0px; height: 0px; right: 0px; top: 0px;">
						<div class="slider"
							 style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 0px;"></div>
					</div>
					<div class="shadow"></div>
					<div class="shadow"></div>
					<div class="shadow"></div>
				</div>
			</div>
		`;
	}
}

customElements.define("vscode-part-main", VscodePartMain);