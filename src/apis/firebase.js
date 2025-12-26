import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import firebaseConfig from './config.js';

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
			await addDoc(collection(db, "messages"), {
				room: roomName,
				text: text,
				uid: user.uid,
				displayName: user.displayName || "Anonymous", // Fallback
				timestamp: serverTimestamp(),
				// Include explicit time string for easier rendering if needed, 
				// but serverTimestamp is better for ordering.
			});
		} catch (e) {
			console.error("Error sending message: ", e);
			throw e;
		}
	},

	subscribeToRoom: (roomName, callback) => {
		const q = query(
			collection(db, "messages"),
			where("room", "==", roomName),
			orderBy("timestamp", "asc")
		);

		return onSnapshot(q, (snapshot) => {
			const messages = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			callback(messages);
		});
	}
};
