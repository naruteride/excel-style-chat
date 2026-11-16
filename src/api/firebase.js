import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, onSnapshot, getDocs, getDocsFromServer, query, where, orderBy, serverTimestamp, limitToLast, startAfter, endBefore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const DEFAULT_MESSAGE_PAGE_SIZE = 100;

function messageFromDoc(doc) {
	const data = doc.data();
	return {
		id: doc.id,
		...data,
		timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
		hasPendingWrites: doc.metadata.hasPendingWrites
	};
}

function pageFromSnapshot(snapshot) {
	const committedDocs = snapshot.docs.filter(doc => !doc.metadata.hasPendingWrites);
	return {
		messages: snapshot.docs.map(messageFromDoc),
		oldestDoc: committedDocs[0] || null,
		newestDoc: committedDocs[committedDocs.length - 1] || null,
		size: snapshot.size,
		fromCache: snapshot.metadata.fromCache
	};
}

let authReadyPromise = null;
let authReady = false;
let anonymousLoginPromise = null;

const waitForInitialAuthState = () => {
	if (authReadyPromise) return authReadyPromise;

	authReadyPromise = new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			authReady = true;
			unsubscribe();
			resolve(user);
		}, (error) => {
			authReadyPromise = null;
			unsubscribe();
			reject(error);
		});
	});

	return authReadyPromise;
};

// Auth Service
export const authService = {
	loginAnonymously: () => signInAnonymously(auth),
	loginGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),
	logout: () => signOut(auth),
	onUserChange: (callback) => onAuthStateChanged(auth, callback),
	getCurrentUser: () => auth.currentUser,
	ensureAnonymousUser: async () => {
		if (auth.currentUser) return auth.currentUser;

		if (!authReady) {
			const initialUser = await waitForInitialAuthState();
			if (initialUser) return initialUser;
		}

		if (auth.currentUser) return auth.currentUser;

		if (!anonymousLoginPromise) {
			anonymousLoginPromise = signInAnonymously(auth)
				.then((credential) => credential.user)
				.finally(() => {
					anonymousLoginPromise = null;
				});
		}

		return anonymousLoginPromise;
	}
};

// Chat Service
export const chatService = {
	sendMessage: async (roomName, text, messageId) => {
		if (!text.trim()) return;

		try {
			const sender = await authService.ensureAnonymousUser();

			// 구조: chatRooms (col) -> roomName (doc) -> messages (subcol) -> message (doc)
			const messageRef = doc(db, "chatRooms", roomName, "messages", messageId);
			await setDoc(messageRef, {
				text: text,
				uid: sender.uid,
				displayName: sender.displayName || "Anonymous", // 폴백
				timestamp: serverTimestamp(),
			});
		} catch (e) {
			console.error("Error sending message: ", e);
			throw e;
		}
	},

	subscribeToRoom: (roomName, callback) => {
		const q = query(
			collection(db, "chatRooms", roomName, "messages"),
			orderBy("timestamp", "asc")
		);

		return onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
			const messages = snapshot.docs.map(messageFromDoc);
			callback(messages);
		});
	},

	subscribeToLatestMessages: (roomName, callback, pageSize = DEFAULT_MESSAGE_PAGE_SIZE) => {
		const q = query(
			collection(db, "chatRooms", roomName, "messages"),
			orderBy("timestamp", "asc"),
			limitToLast(pageSize)
		);

		return onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
			callback(pageFromSnapshot(snapshot));
		});
	},

	loadMessagesBetween: async (roomName, afterDoc, beforeDoc) => {
		const q = query(
			collection(db, "chatRooms", roomName, "messages"),
			orderBy("timestamp", "asc"),
			startAfter(afterDoc),
			endBefore(beforeDoc)
		);

		const snapshot = await getDocsFromServer(q);
		return pageFromSnapshot(snapshot);
	},

	loadOlderMessages: async (roomName, beforeDoc, pageSize = DEFAULT_MESSAGE_PAGE_SIZE) => {
		if (!beforeDoc) {
			return { messages: [], oldestDoc: null, size: 0 };
		}

		const q = query(
			collection(db, "chatRooms", roomName, "messages"),
			orderBy("timestamp", "asc"),
			endBefore(beforeDoc),
			limitToLast(pageSize)
		);

		const snapshot = await getDocs(q);
		return pageFromSnapshot(snapshot);
	}
};
