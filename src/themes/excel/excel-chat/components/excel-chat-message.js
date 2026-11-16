export default function createExcelChatMessageRow({ index, id, text, author, timestamp, status }) {
	const row = document.createElement("tr");
	row.dataset.messageId = id;
	const group = pick(["", "", "", "", "", "Content", "Planning", "Development"]);
	const isBoldGroup = group && Math.random() < 0.2;
	const taskStr = pickMany(["Planning", "UI/UX", "Design", "Frontend", "Backend"], 3).join(", ");
	const duration = Math.random() < 0.125 ? pick(["1d", "2d", "3d", "4d", "5d", "1w", "2w"]) : "";
	const month = `${new Date().getMonth() + 1}M`;
	const weekStr = pickMany(["W1", "W2", "W3", "W4", "W5"], 2).sort().join(", ");
	const deliveryStatus = status == "sending"
		? '<span role="status" style="margin-left: 0.5rem; font-size: 12px; color: #747775;">전송 중…</span>'
		: status == "failed"
			? `<span role="status" style="margin-left: 0.5rem; font-size: 12px; color: #b3261e;">전송 실패</span> <button type="button" data-retry-message="${escapeHtml(id)}" style="padding: 0; color: #0b57d0; font-size: 12px; text-decoration: underline;">재시도</button>`
			: "";

	row.innerHTML = `
		<th>${escapeHtml(index)}</th>
		<td style="text-align: right;">${escapeHtml(formatTimestamp(timestamp))}</td>
		<td style="${isBoldGroup ? "font-weight: bold;" : ""}">${escapeHtml(group)}</td>
		<td style="padding-right: 1rem;">${escapeHtml(author || "Unknown")}</td>
		<td style="padding-right: 1rem; white-space: pre-wrap; word-break: keep-all; overflow-wrap: anywhere;">${escapeHtml(text || "")}${deliveryStatus}</td>
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
