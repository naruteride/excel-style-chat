class Header extends HTMLElement {
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
				<svg xmlns="http://www.w3.org/2000/svg" style="width: 36px; height: 36px; padding: 8px;">
					<g xmlns="http://www.w3.org/2000/svg" fill="none" fill-rule="evenodd"><path fill="#0F9D58" d="M185.5 70H200l9 9v24.5a2.5 2.5 0 01-2.5 2.5h-21a2.5 2.5 0 01-2.5-2.5v-31a2.5 2.5 0 012.5-2.5z"/><path fill="#263238" fill-opacity=".1" d="M183 103a2.5 2.5 0 002.5 2.5h21a2.5 2.5 0 002.5-2.5v.5a2.5 2.5 0 01-2.5 2.5h-21a2.5 2.5 0 01-2.5-2.5v-.5z"/><path fill="#FFF" fill-opacity=".2" d="M185.5 70H200v.5h-14.5A2.5 2.5 0 00183 73v-.5a2.5 2.5 0 012.5-2.5z"/><path fill="url(#h)" fill-rule="nonzero" d="M17.5 8l8.5 8.5V9" transform="translate(183 70)"/><path fill="#87CEAC" d="M200 70l9 9h-6.5a2.5 2.5 0 01-2.5-2.5V70z"/><path fill="#F1F1F1" d="M189 86h14v14h-14V86zm2 2v2h4v-2h-4zm0 4v2h4v-2h-4zm0 4v2h4v-2h-4zm6-8v2h4v-2h-4zm0 4v2h4v-2h-4zm0 4v2h4v-2h-4z"/><path fill="url(#V)" fill-opacity=".1" d="M2.5 0H17l9 9v24.5a2.5 2.5 0 01-2.5 2.5h-21A2.5 2.5 0 010 33.5v-31A2.5 2.5 0 012.5 0z" transform="translate(183 70)"/></g>
				</svg>
				<div style="display: flex; flex-direction: column;">
					<div style="display: flex; align-items: center; gap: 1rem">
						<h1>
							${this.getAttribute("room")}
						</h1>
						<button>
							<svg xmlns="http://www.w3.org/2000/svg">
								<g xmlns="http://www.w3.org/2000/svg"><path fill="#444746" fill-rule="evenodd" clip-rule="evenodd" d="M1461.26 922.317l-2.265-5.317-2.255 5.317-5.74.478 4.368 3.813-1.32 5.642 4.957-3 4.947 3-1.32-5.642 4.368-3.813-5.74-.478zm2.327 1.599l-3.284-.274-1.305-3.063-1.3 3.063-3.285.274 2.51 2.19-.754 3.225 2.837-1.717 2.824 1.712-.753-3.22 2.51-2.19z"/></g>
							</svg>
						</button>
						<button>
							<svg xmlns="http://www.w3.org/2000/svg">
								<g xmlns="http://www.w3.org/2000/svg"><path fill="#444746" fill-rule="evenodd" clip-rule="evenodd" d="M1461.26 922.317l-2.265-5.317-2.255 5.317-5.74.478 4.368 3.813-1.32 5.642 4.957-3 4.947 3-1.32-5.642 4.368-3.813-5.74-.478zm2.327 1.599l-3.284-.274-1.305-3.063-1.3 3.063-3.285.274 2.51 2.19-.754 3.225 2.837-1.717 2.824 1.712-.753-3.22 2.51-2.19z"/></g>
							</svg>
						</button>
						<button>
							<svg xmlns="http://www.w3.org/2000/svg">
								<g xmlns="http://www.w3.org/2000/svg"><path fill="#444746" fill-rule="evenodd" clip-rule="evenodd" d="M1461.26 922.317l-2.265-5.317-2.255 5.317-5.74.478 4.368 3.813-1.32 5.642 4.957-3 4.947 3-1.32-5.642 4.368-3.813-5.74-.478zm2.327 1.599l-3.284-.274-1.305-3.063-1.3 3.063-3.285.274 2.51 2.19-.754 3.225 2.837-1.717 2.824 1.712-.753-3.22 2.51-2.19z"/></g>
							</svg>
						</button>
					</div>

					<div style="display: flex; align-items: center; gap: 1rem">
						${["파일", "수정", "보기", "삽입", "서식", "데이터", "도구", "확장 프로그램", "도움말", "Gemini"].map(label => `<button style="color: rgb(32, 33, 36); font-size: 0.875rem; font-weight: 400; padding: 0.125rem 0.5rem; border-radius: 0.25rem; cursor: pointer; transition: all 0.2s ease-in-out; ">${label}</button>`)}
					</div>
				</div>
			</div>

			<div style="display: flex; align-items: center; gap: 1rem;">
				<img src="//lh3.googleusercontent.com/a/ACg8ocJurJ724n294UpZHA1EukYYB2H7x5MFFOrW47W0rMAeFo6MzA=s50-c-k-no" style="width: 1.75rem; height: 1.75rem; border-radius: 50%; border: 0.125rem solid rgb(184, 6, 114);">
				<svg style="width: 2rem; height: 2rem;">
					<g xmlns="http://www.w3.org/2000/svg" fill="#444746"><path d="M1338.5 1863v4l2.83 2.83 1.06-1.06-2.39-2.39V1863z"/><path d="M1339.25 1860c-3.82 0-7.07 3.11-6.99 7.14l-1.2-1.2-1.06 1.06 3 3 3-3-1.06-1.06-1.18 1.18a5.49 5.49 0 015.49-5.62c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5c-1.8 0-3.4-.88-4.41-2.22l-1.07 1.07a6.992 6.992 0 005.48 2.65c3.87 0 7-3.13 7-7s-3.13-7-7-7z"/></g>
				</svg>
				
				<svg style="width: 2rem; height: 2rem;">
					<g xmlns="http://www.w3.org/2000/svg" fill="#444746"><path d="M1338.5 1863v4l2.83 2.83 1.06-1.06-2.39-2.39V1863z"/><path d="M1339.25 1860c-3.82 0-7.07 3.11-6.99 7.14l-1.2-1.2-1.06 1.06 3 3 3-3-1.06-1.06-1.18 1.18a5.49 5.49 0 015.49-5.62c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5c-1.8 0-3.4-.88-4.41-2.22l-1.07 1.07a6.992 6.992 0 005.48 2.65c3.87 0 7-3.13 7-7s-3.13-7-7-7z"/></g>
				</svg>
				
				<svg style="width: 2rem; height: 2rem;">
					<g xmlns="http://www.w3.org/2000/svg" fill="#444746"><path d="M1338.5 1863v4l2.83 2.83 1.06-1.06-2.39-2.39V1863z"/><path d="M1339.25 1860c-3.82 0-7.07 3.11-6.99 7.14l-1.2-1.2-1.06 1.06 3 3 3-3-1.06-1.06-1.18 1.18a5.49 5.49 0 015.49-5.62c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5c-1.8 0-3.4-.88-4.41-2.22l-1.07 1.07a6.992 6.992 0 005.48 2.65c3.87 0 7-3.13 7-7s-3.13-7-7-7z"/></g>
				</svg>
				
				<svg style="width: 2rem; height: 2rem;">
					<g xmlns="http://www.w3.org/2000/svg" fill="#444746"><path d="M1338.5 1863v4l2.83 2.83 1.06-1.06-2.39-2.39V1863z"/><path d="M1339.25 1860c-3.82 0-7.07 3.11-6.99 7.14l-1.2-1.2-1.06 1.06 3 3 3-3-1.06-1.06-1.18 1.18a5.49 5.49 0 015.49-5.62c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5c-1.8 0-3.4-.88-4.41-2.22l-1.07 1.07a6.992 6.992 0 005.48 2.65c3.87 0 7-3.13 7-7s-3.13-7-7-7z"/></g>
				</svg>
			</div>
		`;
	}
}

customElements.define("header", Header, { extends: "header" });
export default Header;