import BaseComponent from "/src/components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
import ExcelHeader from "../components/excel-header.js";

export default class ExcelLogin extends BaseComponent {
	constructor() {
		super();
		this.user = null;
	}

	connectedCallback() {
		super.connectedCallback();
		authService.onUserChange((user) => {
			this.user = user;
			this.render();
		});
	}

	goToRoom(e) {
		e.preventDefault();
		const roomName = this.querySelector("#room-input").value;
		if (roomName) {
			router.navigateTo(`/${roomName}`);
		}
	}

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";

		this.innerHTML = `
			<excel-header room="최종 로직 정리_0903_쿠폰TEST번호.xlsx"></excel-header>

			<main style="flex: 1; overflow: auto;">
				<form id="form-join" style="display: contents;">
					<table class="excel-table">
						<thead class="excel-thead">
							<tr>
								<th class="excel-crossed-th"></th>
								<th style="padding-inline: 0.25em;">A</th>
								<th style="padding-inline: 0.25em;">B</th>
								<th style="padding-inline: 0.25em;">C</th>
								<th style="padding-inline: 0.25em;">D</th>
								<th style="padding-inline: 0.25em;">E</th>
								<th style="padding-inline: 0.25em;">F</th>
								<th style="padding-inline: 0.25em;">G</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>1</th>
								${this.user ? `<td style="padding-right: 1rem;">Logged in as</td>` : `<td style="padding-right: 1rem;"><button type="button" class="excel-no-style-button" id="btn-anonymous">Login Anonymously</button></td>`}
								${this.user ? `<td style="padding-right: 1rem;">${this.user.displayName || "Anonymous"}</td>` : `<td style="padding-right: 1rem;"><button type="button" class="excel-no-style-button" id="btn-google">Login with Google</button></td>`}
								${this.user ? `<td style="padding-right: 1rem;"><button type="button" class="excel-no-style-button" id="btn-logout">Logout</button></td>` : `<td></td>`}
								<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
								<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
								<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
								<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
							</tr>
							<tr>
								<th>2</th>
								<td style="padding-right: 1rem;">Workspace</td>
								<td><input type="text" id="room-input" placeholder="e.g. project-alpha" style="padding: 0; background: transparent; border: none; width: 100%; height: 100%;" /></td>
								<td style="padding-right: 1rem;"><button type="submit" class="excel-no-style-button">Open Workspace</button></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							${Array.from({ length: 7 }, (_, index) => `
								<tr>
									<th>${index + 3}</th>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							`).join("")}
						</tbody>
					</table>
				</form>
			</main>
		`;

		this.querySelector("#btn-anonymous")?.addEventListener("click", () => authService.loginAnonymously());
		this.querySelector("#btn-google")?.addEventListener("click", () => authService.loginGoogle());
		this.querySelector("#btn-logout")?.addEventListener("click", () => authService.logout());
		this.querySelector("#form-join")?.addEventListener("submit", (e) => this.goToRoom(e));
	}
}

customElements.define("excel-login", ExcelLogin);
