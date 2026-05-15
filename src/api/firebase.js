import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
	sendMessage: async (roomName, text, user) => {
		if (!text.trim()) return;

		try {
			const sender = user || await authService.ensureAnonymousUser();

			// 구조: chatRooms (col) -> roomName (doc) -> messages (subcol) -> message (doc)
			await addDoc(collection(db, "chatRooms", roomName, "messages"), {
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

		return onSnapshot(q, (snapshot) => {
			const messages = snapshot.docs.map(doc => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
				};
			});
			callback(messages);
		});
	}
};
