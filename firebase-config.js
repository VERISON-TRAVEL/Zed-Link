// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBClL8ejJrLBaDSjKkSEdciwz_EjDXdchM",
  authDomain: "zed-link.firebaseapp.com",
  projectId: "zed-link",
  storageBucket: "zed-link.firebasestorage.app",
  messagingSenderId: "493584644612",
  appId: "1:493584644612:web:a1d92d3e2d916d82fb5351",
  measurementId: "G-TPF5LF6KZ6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
