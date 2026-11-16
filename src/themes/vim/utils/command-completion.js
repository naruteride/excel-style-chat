export function getCommandCompletion(value, cursor, { commands = [], themes = [] } = {}) {
	const text = String(value ?? "");
	const requestedCursor = typeof cursor == "number" && !Number.isNaN(cursor) ? cursor : text.length;
	const position = Math.max(0, Math.min(text.length, Math.trunc(requestedCursor)));
	const prefix = text.match(/^\s*:\s*/u);
	if (!prefix) return null;

	const commandStart = prefix[0].length;
	const commandName = text.slice(commandStart).match(/^\S*/u)[0];
	const commandEnd = commandStart + commandName.length;
	let start = commandStart;
	let end = commandEnd;
	let options = commands;

	if (position > commandEnd) {
		if (!commands.includes(commandName)) return null;
		const argumentsByCommand = new Map([
			["theme", themes],
			["login", ["anonymous", "google"]],
			["colorscheme", ["retrobox"]]
		]);
		options = argumentsByCommand.get(commandName);
		if (!options) return null;

		const separator = text.slice(commandEnd).match(/^\s+/u);
		if (!separator) return null;
		start = commandEnd + separator[0].length;
		end = start + text.slice(start).match(/^\S*/u)[0].length;
	}

	if (position < start || position > end) return null;
	const typed = text.slice(start, position).toLowerCase();
	const candidates = Array.from(new Set(options))
		.filter(option => typeof option == "string" && option.toLowerCase().startsWith(typed));
	return candidates.length ? { start, end, candidates } : null;
}
