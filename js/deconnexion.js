function logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    console.log("Déconnexion réussie !");
    confirm("voulez-vous vous Deconnectez ?");
    window.location.href = './../index.html';
}

const deconnexion = document.getElementById('deconnexion');
deconnexion.addEventListener('click', () => {
    console.log("Deconnexion clicked");
    logout();
});