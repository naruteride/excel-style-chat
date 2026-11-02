export default function setupChatInput(input, onSend) {
	const resize = () => {
		const style = getComputedStyle(input);
		const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
		const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
		const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
		const offset = style.boxSizing == "border-box" ? border : -padding;
		const maxHeight = lineHeight * 6 + padding + offset;

		input.style.height = "auto";
		const height = input.scrollHeight + offset;
		input.style.height = `${Math.min(height, maxHeight)}px`;
		input.style.overflowY = height > maxHeight ? "auto" : "hidden";
	};

	input.addEventListener("input", resize);
	input.addEventListener("keydown", (event) => {
		if (event.defaultPrevented || event.key != "Enter" || event.shiftKey || event.isComposing || event.keyCode == 229) return;

		event.preventDefault();
		if (!event.repeat) onSend();
	});

	resize();
}
