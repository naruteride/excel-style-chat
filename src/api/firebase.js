import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth Service
export const authService = {
	loginAnonymously: () => signInAnonymously(auth),
	loginGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),
	logout: () => signOut(auth),
	onUserChange: (callback) => onAuthStateChanged(auth, callback),
	getCurrentUser: () => auth.currentUser
};

// Chat Service
export const chatService = {
	sendMessage: async (roomName, text, user) => {
		if (!text.trim()) return;

		try {
			// Structure: chatRooms (col) -> roomName (doc) -> messages (subcol) -> message (doc)
			await addDoc(collection(db, "chatRooms", roomName, "messages"), {
				text: text,
				uid: user.uid,
				displayName: user.displayName || "Anonymous", // Fallback
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
			const messages = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
				timestamp: doc.data().timestamp.toDate()
			}));
			callback(messages);
		});
	}
};
