import { auth, db } from "./firebase-config.js";
import { collection, getDocs, updateDoc, doc, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadUsers() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  const container = document.getElementById("users");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = \`\${data.email} - Approved: \${data.approved} <button onclick="approveUser('\${data.email}')">Approuver</button>\`;
    container.appendChild(div);
  });
}

window.approveUser = async function(email) {
  await updateDoc(doc(db, "users", email), { approved: true });
  loadUsers();
};

window.addProgramme = async function() {
  const title = document.getElementById("progTitle").value;
  const desc = document.getElementById("progDesc").value;
  await addDoc(collection(db, "programmes"), { title, desc });
  alert("Programme ajouté.");
};

loadUsers();
