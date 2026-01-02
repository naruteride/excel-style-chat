import BaseComponent from "/src/components/base-component.js";
import router from "/src/utils/router.js";
import { authService } from "/src/api/firebase.js";
import ExcelHeader from "../components/excel-header.js";
import ExcelTable from "../components/excel-table.js";

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

	render() {
		this.style.cssText = "display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%;";

		this.innerHTML = `
			<header is="excel-header" room="최종 로직 정리_0903_쿠폰TEST번호.xlsx"></header>

			<table is="excel-table">
				<thead>
					<tr>
						<th style="min-width: 2.5em;"></th>
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
						${this.user ? `<td style="padding-right: 1rem;">Logged in as</td>` : `<td id="btn-login-anonymous" style="padding-right: 1rem;">Login Anonymously</td>`}
						${this.user ? `<td style="padding-right: 1rem;">${this.user.displayName || "Anonymous"}</td>` : `<td id="btn-login-google" style="padding-right: 1rem;">Login with Google</td>`}
						${this.user ? `<td id="btn-logout" style="padding-right: 1rem;">Logout</td>` : `<td></td>`}
						<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
						<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
						<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
						<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
					</tr>
					<tr>
						<th>2</th>
						<td style="padding-right: 1rem;">Workspace</td>
						<td><input type="text" id="room-input" placeholder="e.g. project-alpha" style="padding: 0; background: transparent; border: none; width: 100%; height: 100%;" /></td>
						<td id="btn-join" style="padding-right: 1rem;">Open Workspace</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>3</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>4</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>5</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>6</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>7</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>8</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>9</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
        `;

		this.querySelector("#btn-anonymous")?.addEventListener("click", () => authService.loginAnonymously());
		this.querySelector("#btn-google")?.addEventListener("click", () => authService.loginGoogle());
		this.querySelector("#btn-logout")?.addEventListener("click", () => authService.logout());

		this.querySelector("#btn-join")?.addEventListener("click", () => {
			const roomName = this.querySelector("#room-input").value;
			if (roomName) {
				router.navigateTo(`/${roomName}`);
			}
		});
	}
}

customElements.define("excel-login", ExcelLogin);
