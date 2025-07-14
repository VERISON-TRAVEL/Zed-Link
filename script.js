document.getElementById('registerBtn').addEventListener('click', function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  alert(`Compte créé pour ${email} (fictif, stockage non actif)`);
});

document.getElementById('loginBtn').addEventListener('click', function () {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  alert(`Connexion pour ${email} (fictif, stockage non actif)`);
});
