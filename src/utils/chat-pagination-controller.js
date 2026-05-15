import { chatService } from "../api/firebase.js";

const DEFAULT_MESSAGE_PAGE_SIZE = 100;
const DEFAULT_SCROLL_TOP_THRESHOLD = 32;
const DEFAULT_SCROLL_BOTTOM_THRESHOLD = 64;

export default class ChatPaginationController {
	constructor({
		getScrollElement,
		onMessagesChange,
		pageSize = DEFAULT_MESSAGE_PAGE_SIZE,
		topThreshold = DEFAULT_SCROLL_TOP_THRESHOLD,
		bottomThreshold = DEFAULT_SCROLL_BOTTOM_THRESHOLD
	}) {
		this.getScrollElement = getScrollElement;
		this.onMessagesChange = onMessagesChange;
		this.pageSize = pageSize;
		this.topThreshold = topThreshold;
		this.bottomThreshold = bottomThreshold;
		this.handleScroll = () => this.loadOlderMessagesIfNeeded();

		this.reset();
	}

	connect(roomName) {
		this.disconnect();
		this.reset();
		this.roomName = roomName;
		this.scrollElement = this.getActiveScrollElement();
		this.scrollElement?.addEventListener("scroll", this.handleScroll, { passive: true });

		if (!this.roomName) return;

		this.unsubscribeMessages = chatService.subscribeToLatestMessages(
			this.roomName,
			(page) => this.handleLatestMessages(page),
			this.pageSize
		);
	}

	disconnect() {
		if (this.unsubscribeMessages) {
			this.unsubscribeMessages();
			this.unsubscribeMessages = null;
		}

		this.scrollElement?.removeEventListener("scroll", this.handleScroll);
		this.roomName = null;
		this.scrollElement = null;
	}

	reset() {
		this.roomName = null;
		this.messages = [];
		this.messageMap = new Map();
		this.oldestLoadedDoc = null;
		this.hasOlderMessages = true;
		this.isLoadingOlder = false;
		this.hasInitialSnapshot = false;
		this.unsubscribeMessages = null;
		this.scrollElement = null;
	}

	handleLatestMessages({ messages, oldestDoc, size }) {
		const shouldScrollToBottom = !this.hasInitialSnapshot || this.isNearBottom();

		this.mergeMessages(messages);

		if (!this.oldestLoadedDoc && oldestDoc) {
			this.oldestLoadedDoc = oldestDoc;
		}

		if (size < this.pageSize) {
			this.hasOlderMessages = false;
		}

		this.hasInitialSnapshot = true;
		this.syncMessages();
		this.onMessagesChange(this.messages);

		if (shouldScrollToBottom) {
			this.scrollToBottom();
		}
	}

	async loadOlderMessagesIfNeeded() {
		const scrollElement = this.getActiveScrollElement();

		if (
			!scrollElement ||
			!this.roomName ||
			!this.hasInitialSnapshot ||
			!this.hasOlderMessages ||
			this.isLoadingOlder ||
			!this.oldestLoadedDoc ||
			scrollElement.scrollTop > this.topThreshold
		) {
			return;
		}

		this.isLoadingOlder = true;
		const roomName = this.roomName;
		const previousScrollHeight = scrollElement.scrollHeight;
		const previousScrollTop = scrollElement.scrollTop;

		try {
			const { messages, oldestDoc, size } = await chatService.loadOlderMessages(
				roomName,
				this.oldestLoadedDoc,
				this.pageSize
			);

			if (this.roomName !== roomName) return;

			this.mergeMessages(messages);

			if (oldestDoc) {
				this.oldestLoadedDoc = oldestDoc;
			}

			if (size < this.pageSize) {
				this.hasOlderMessages = false;
			}

			if (size > 0) {
				this.syncMessages();
				this.onMessagesChange(this.messages);
				this.preserveScrollPosition(previousScrollHeight, previousScrollTop);
			}
		} catch (error) {
			console.error("Error loading older messages: ", error);
		} finally {
			this.isLoadingOlder = false;
		}
	}

	mergeMessages(messages) {
		messages.forEach((message) => {
			this.messageMap.set(message.id, message);
		});
	}

	syncMessages() {
		this.messages = Array.from(this.messageMap.values()).sort((a, b) => {
			const aTime = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime();
			const bTime = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime();
			return aTime - bTime;
		});
	}

	isNearBottom() {
		const scrollElement = this.getActiveScrollElement();
		if (!scrollElement) return true;
		return scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight <= this.bottomThreshold;
	}

	scrollToBottom() {
		const scrollElement = this.getActiveScrollElement();
		if (scrollElement) {
			scrollElement.scrollTop = scrollElement.scrollHeight;
		}
	}

	preserveScrollPosition(previousScrollHeight, previousScrollTop) {
		const scrollElement = this.getActiveScrollElement();
		if (scrollElement) {
			scrollElement.scrollTop = scrollElement.scrollHeight - previousScrollHeight + previousScrollTop;
		}
	}

	getActiveScrollElement() {
		return this.scrollElement || this.getScrollElement?.() || null;
	}
}
