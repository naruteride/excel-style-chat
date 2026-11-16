import { authService, chatService } from "../api/firebase.js";

class ChatOutbox {
	constructor() {
		this.messages = new Map();
		this.listeners = [];
	}

	sendMessage(roomName, text) {
		if (!roomName || !text.trim()) return;

		const user = authService.getCurrentUser();
		const message = {
			id: crypto.randomUUID(),
			roomName,
			text,
			uid: user?.uid,
			displayName: user?.displayName || "Anonymous",
			timestamp: new Date(),
			status: "sending"
		};

		this.messages.set(message.id, message);
		this.send(message);
		return message;
	}

	retryMessage(id) {
		const message = this.messages.get(id);
		if (message?.status == "failed") this.send(message);
	}

	async send(message) {
		message.status = "sending";
		this.notify(message.roomName);

		try {
			await chatService.sendMessage(message.roomName, message.text, message.id);
			message.status = "sent";
		} catch {
			message.status = "failed";
		}

		this.notify(message.roomName);
	}

	getMessages(roomName, serverMessages) {
		const messages = new Map(serverMessages.map(message => [message.id, message]));
		this.messages.forEach(message => {
			if (message.roomName == roomName) messages.set(message.id, message);
		});
		return Array.from(messages.values()).sort((a, b) => a.timestamp - b.timestamp);
	}

	confirmMessages(roomName, serverMessages) {
		let changed = false;
		serverMessages.forEach(message => {
			const outgoingMessage = this.messages.get(message.id);
			if (outgoingMessage?.roomName == roomName && !message.hasPendingWrites) {
				this.messages.delete(message.id);
				changed = true;
			}
		});
		if (changed) this.notify(roomName);
	}

	subscribe(roomName, callback) {
		const listener = { roomName, callback };
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(item => item != listener);
		};
	}

	notify(roomName) {
		this.listeners.forEach(listener => {
			if (listener.roomName == roomName) listener.callback();
		});
	}
}

const chatOutbox = new ChatOutbox();
export default chatOutbox;
