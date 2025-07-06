import { db, auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  const programmesRef = collection(db, "programmes");
  const snapshot = await getDocs(programmesRef);
  const container = document.getElementById("programmes");
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = \`<h3>\${data.title}</h3><p>\${data.desc}</p>\`;
    container.appendChild(div);
  });
});
