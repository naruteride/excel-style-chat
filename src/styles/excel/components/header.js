class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<header style="background: #f9fbfd; border-bottom: 1px solid #f9fbfd; margin-bottom: -1px; display: flex; align-items: center; padding: 0 12px;">
				<svg xmlns="http://www.w3.org/2000/svg" style="width: 36px; height: 36px; padding: 8px;">
					<g xmlns="http://www.w3.org/2000/svg" fill="none" fill-rule="evenodd"><path fill="#0F9D58" d="M185.5 70H200l9 9v24.5a2.5 2.5 0 01-2.5 2.5h-21a2.5 2.5 0 01-2.5-2.5v-31a2.5 2.5 0 012.5-2.5z"/><path fill="#263238" fill-opacity=".1" d="M183 103a2.5 2.5 0 002.5 2.5h21a2.5 2.5 0 002.5-2.5v.5a2.5 2.5 0 01-2.5 2.5h-21a2.5 2.5 0 01-2.5-2.5v-.5z"/><path fill="#FFF" fill-opacity=".2" d="M185.5 70H200v.5h-14.5A2.5 2.5 0 00183 73v-.5a2.5 2.5 0 012.5-2.5z"/><path fill="url(#h)" fill-rule="nonzero" d="M17.5 8l8.5 8.5V9" transform="translate(183 70)"/><path fill="#87CEAC" d="M200 70l9 9h-6.5a2.5 2.5 0 01-2.5-2.5V70z"/><path fill="#F1F1F1" d="M189 86h14v14h-14V86zm2 2v2h4v-2h-4zm0 4v2h4v-2h-4zm0 4v2h4v-2h-4zm6-8v2h4v-2h-4zm0 4v2h4v-2h-4zm0 4v2h4v-2h-4z"/><path fill="url(#V)" fill-opacity=".1" d="M2.5 0H17l9 9v24.5a2.5 2.5 0 01-2.5 2.5h-21A2.5 2.5 0 010 33.5v-31A2.5 2.5 0 012.5 0z" transform="translate(183 70)"/></g>
				</svg>
			</header>
		`;
	}
}

customElements.define("header", Header);
export default Header;