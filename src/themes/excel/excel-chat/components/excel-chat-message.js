export default function createExcelChatMessageRow({ index, text, author, timestamp }) {
	const row = document.createElement("tr");
	const group = pick(["", "", "", "", "", "Content", "Planning", "Development"]);
	const isBoldGroup = group && Math.random() < 0.2;
	const taskStr = pickMany(["Planning", "UI/UX", "Design", "Frontend", "Backend"], 3).join(", ");
	const duration = Math.random() < 0.125 ? pick(["1d", "2d", "3d", "4d", "5d", "1w", "2w"]) : "";
	const month = `${new Date().getMonth() + 1}M`;
	const weekStr = pickMany(["W1", "W2", "W3", "W4", "W5"], 2).sort().join(", ");

	row.innerHTML = `
		<th>${escapeHtml(index)}</th>
		<td style="text-align: right;">${escapeHtml(formatTimestamp(timestamp))}</td>
		<td style="${isBoldGroup ? "font-weight: bold;" : ""}">${escapeHtml(group)}</td>
		<td style="padding-right: 1rem;">${escapeHtml(author || "Unknown")}</td>
		<td style="padding-right: 1rem; white-space: normal; word-break: keep-all;">${escapeHtml(text || "")}</td>
		<td style="padding-right: 1rem;">${escapeHtml(taskStr)}</td>
		<td style="padding-right: 1rem;">${escapeHtml(duration)}</td>
		<td style="text-align: center;">${escapeHtml(month)}</td>
		<td style="padding-right: 1rem;">${escapeHtml(weekStr)}</td>
	`;

	return row;
}

function pick(items) {
	return items[Math.floor(Math.random() * items.length)];
}

function pickMany(items, maxCount) {
	const count = Math.floor(Math.random() * (maxCount + 1));
	const picked = [];

	for (let i = 0; i < count; i++) {
		picked.push(pick(items));
	}

	return [...new Set(picked)];
}

function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

function formatTimestamp(timestamp) {
	timestamp = new Date(timestamp);
	const yy = String(timestamp.getFullYear()).slice(-2);
	const MM = String(timestamp.getMonth() + 1).padStart(2, "0");
	const dd = String(timestamp.getDate()).padStart(2, "0");
	const HH = String(timestamp.getHours()).padStart(2, "0");
	const mm = String(timestamp.getMinutes()).padStart(2, "0");
	const ss = String(timestamp.getSeconds()).padStart(2, "0");

	return `${yy}${MM}${dd}${HH}${mm}${ss}`;
}
