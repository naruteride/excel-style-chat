import "./components/vim-workbench.js";
import "./vim-login/index.js";
import "./vim-chat/index.js";

export default {
	name: "vim",
	css: ["/src/themes/vim/index.css"],
	views: {
		login: "vim-login",
		chat: "vim-chat",
	},
};
