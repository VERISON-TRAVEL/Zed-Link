// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBClL8ejJrLBaDSjKkSEdciwz_EjDXdchM",
  authDomain: "zed-link.firebaseapp.com",
  projectId: "zed-link",
  storageBucket: "zed-link.appspot.com",
  messagingSenderId: "493584644612",
  appId: "1:493584644612:web:a1d92d3e2d916d82fb5351"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// 🔄 Affichage de la section inscription
document.getElementById('show-register').onclick = () => {
  document.getElementById('register-section').style.display = 'block';
};

document.getElementById('show-login').onclick = () => {
  document.getElementById('register-section').style.display = 'none';
};

// 🟢 Inscription
document.getElementById('register-btn').onclick = async () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const agency = document.getElementById('agency-name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const file = document.getElementById('justif-file').files[0];

  if (!email || !password || !agency || !file) {
    alert("Tous les champs sont obligatoires.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 🔼 Upload fichier justificatif
    const fileRef = ref(storage, `justifs/${uid}_${file.name}`);
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);

    // 💾 Enregistrement Firestore
    await setDoc(doc(db, "clients", uid), {
      uid,
      email,
      agency,
      phone,
      address,
      fileURL,
      status: "pending", // à valider par admin
      createdAt: serverTimestamp()
    });

    alert("Inscription réussie ! En attente de validation par l’admin.");
    location.reload();
  } catch (err) {
    console.error(err);
    alert("Erreur: " + err.message);
  }
};

// 🔐 Connexion
document.getElementById('login-btn').onclick = async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Redirection vers dashboard
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Email ou mot de passe incorrect.");
  }
};
