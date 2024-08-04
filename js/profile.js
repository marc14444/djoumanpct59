const username = document.getElementById('username');

const user = JSON.parse(localStorage.getItem('userData'));
const storedToken = localStorage.getItem('token');
    if (user) {
        username.textContent = `@${user.nomClient} ${user.prenomClient}`;
    } else {
        // Redirect to login page if user is not logged in
        window.location.href = './connexion.html';
    }

function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
        // Vérifier si le token est valide (vous pouvez ajouter une logique supplémentaire ici)
        return true;
    }
    return false;
}
// Exemple d'utilisation de la fonction de vérification de session
if (isAuthenticated()) {
    console.log("L'utilisateur est authentifié");
} else {
    console.log("L'utilisateur n'est pas authentifié");
}