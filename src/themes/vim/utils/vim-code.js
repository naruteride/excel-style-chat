export const escapeHtml = (value) => String(value ?? "")
	.replaceAll("&", "&amp;")
	.replaceAll("<", "&lt;")
	.replaceAll(">", "&gt;")
	.replaceAll('"', "&quot;")
	.replaceAll("'", "&#039;");

// Returns Vim source text. Pass the result through highlightVimLine before using HTML.
export const vimString = (value) => `'${String(value ?? "").replaceAll("'", "''")}'`;

const commands = new Set((
	"function fun endfunction endfun let unlet const call return set setlocal setglobal setl setg " +
	"setfiletype setf filetype syntax colorscheme colo autocmd au augroup command com execute exec exe " +
	"if elseif else endif for endfor while endwhile try catch finally endtry throw finish break continue " +
	"echo echom echomsg echoerr echon normal norm source runtime packadd read r delete d highlight hi"
).split(" "));

const modifiers = new Set("silent unsilent noautocmd keepalt keepjumps keeppatterns keepmarks lockmarks sandbox vertical horizontal aboveleft belowright botright topleft confirm browse hide".split(" "));
const expressionCommands = new Set("execute exec exe echo echom echomsg echoerr echon return throw if elseif while call".split(" "));
const builtins = new Set("expand toupper tolower line append printf get has exists trim empty len join split map filter substitute matchstr fnamemodify strlen strwidth strdisplaywidth strcharlen type string escape fnameescape shellescape input getcwd getline setline function call".split(" "));
const options = new Set("filetype ft number nu relativenumber rnu cursorline cul background bg hidden hid compatible cp expandtab et tabstop ts shiftwidth sw softtabstop sts autoindent ai smartindent si ignorecase ic smartcase scs incsearch is hlsearch hls ruler ru laststatus ls wrap encoding enc fileencoding fenc termguicolors tgc clipboard cb mouse statusline stl showmode smd showcmd sc".split(" "));
const events = new Set("BufAdd BufDelete BufEnter BufLeave BufNew BufNewFile BufRead BufReadPre BufReadPost BufWrite BufWritePre BufWritePost BufWinEnter BufWinLeave BufWipeout CmdlineEnter CmdlineLeave ColorScheme CursorHold CursorMoved FileType FocusGained FocusLost InsertEnter InsertLeave OptionSet Syntax TextChanged TextChangedI User VimEnter VimLeave VimResized WinEnter WinLeave".split(" "));
const isMapping = (word) => /^(?:[nvosxiclt]?(?:noremap|map|unmap|mapclear))$/u.test(word);
const token = (name, value) => `<span class="vim-token-${name}">${escapeHtml(value)}</span>`;

// A display-only tokenizer for common classic .vimrc commands and expressions.
// It scans source once; strings and comments never pass through code highlighting.
export function highlightVimLine(value) {
	const line = String(value ?? "");
	const output = [];
	let index = 0;
	let expectCommand = true;
	let expectExpression = false;
	let activeCommand = "";
	let autocmdStage = 0;
	let userCommandStage = false;
	let mapping = false;

	while (index < line.length) {
		const rest = line.slice(index);
		const character = line[index];
		const whitespace = rest.match(/^\s+/u);
		if (whitespace) {
			output.push(escapeHtml(whitespace[0]));
			index += whitespace[0].length;
			continue;
		}

		if (character == '"' && !expectExpression && !mapping) {
			output.push(token("comment", rest));
			break;
		}
		if ((character == "'" || character == '"') && expectExpression) {
			let end = index + 1;
			while (end < line.length) {
				if (character == '"' && line[end] == "\\") end += 2;
				else if (line[end] == character) {
					if (character == "'" && line[end + 1] == "'") end += 2;
					else {
						end += 1;
						break;
					}
				} else end += 1;
			}
			output.push(token("string", line.slice(index, end)));
			index = end;
			expectExpression = false;
			continue;
		}

		if (userCommandStage) {
			const word = rest.match(/^\S+/u)[0];
			if (character == "!") {
				output.push("!");
				index += 1;
				continue;
			}
			output.push(word.startsWith("-") ? token("special", word) : token("function", word));
			if (!word.startsWith("-")) {
				userCommandStage = false;
				expectCommand = true;
				activeCommand = "";
			}
			index += word.length;
			continue;
		}

		if (autocmdStage) {
			const word = rest.match(/^\S+/u)[0];
			if (autocmdStage == 1) {
				const parts = word.split(",");
				const isEvent = parts.every(part => events.has(part) || part == "*");
				output.push(parts.map(part => events.has(part) || part == "*" ? token("event", part) : escapeHtml(part)).join(","));
				if (isEvent) autocmdStage = 2;
			} else {
				output.push(word.split("*").map(escapeHtml).join(token("event", "*")));
				autocmdStage = 0;
				expectCommand = true;
			}
			index += word.length;
			continue;
		}

		const notation = rest.match(/^<[^<>\s]+>/u);
		if (notation) {
			output.push(token("special", notation[0]));
			index += notation[0].length;
			continue;
		}

		const word = rest.match(/^[A-Za-z_][A-Za-z0-9_#]*(?::[A-Za-z_][A-Za-z0-9_#]*)?/u);
		if (word) {
			const name = word[0];
			const followsParen = /^\s*\(/u.test(rest.slice(name.length));
			let type = "";
			if (expectCommand && (commands.has(name) || modifiers.has(name) || isMapping(name))) {
				type = "command";
				expectCommand = modifiers.has(name);
				activeCommand = name;
				expectExpression = expressionCommands.has(name);
				mapping = isMapping(name);
				if (name == "autocmd" || name == "au") autocmdStage = 1;
				if (name == "command" || name == "com") userCommandStage = true;
			} else {
				if (followsParen) type = builtins.has(name) ? "builtin" : "function";
				else if (["set", "setlocal", "setglobal", "setl", "setg"].includes(activeCommand) && options.has(name.replace(/^(?:no|inv)/u, ""))) type = "option";
				else if (["function", "fun"].includes(activeCommand) && ["abort", "dict", "range", "closure"].includes(name)) type = "command";
				expectCommand = false;
				expectExpression = false;
			}
			output.push(type ? token(type, name) : escapeHtml(name));
			index += name.length;
			continue;
		}

		const number = rest.match(/^(?:0[xX][\da-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:'\d+)*(?:\.\d+(?:[eE][+-]?\d+)?)?)/u);
		if (number) {
			output.push(token("number", number[0]));
			index += number[0].length;
			expectExpression = false;
			continue;
		}

		if (character == "|") {
			expectCommand = true;
			expectExpression = false;
			activeCommand = "";
			mapping = false;
		} else if (character == ":" && mapping) {
			expectCommand = true;
		} else if (/[=([{,:.+\-*/%?!]/u.test(character)) {
			expectExpression = true;
		} else if (/[)\]}]/u.test(character)) {
			expectExpression = false;
		}
		output.push("=|/$".includes(character) ? token("operator", character) : escapeHtml(character));
		index += 1;
	}

	return output.join("");
}
