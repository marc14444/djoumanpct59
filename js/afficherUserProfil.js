document.addEventListener('DOMContentLoaded', (event) => {
    const nomClientElement = document.getElementById('nomClient');
    const prenomClientElement = document.getElementById('prenomClient');
    const emailClientElement = document.getElementById('emailClient');
    const telClientElement = document.getElementById('telClient');
    
    // Récupérer les données de l'utilisateur depuis le localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Remplir les champs avec les données utilisateur
        nomClientElement.innerHTML = `Nom: ${userData.nomClient}`;
        nomClientElement.style.fontSize = '1.1rem';
        nomClientElement.style.fontFamily = 'Popins,sans-serif';
        nomClientElement.style.fontWeight = 'bold';
        prenomClientElement.innerHTML = `Prénom: ${userData.prenomClient}`;
        prenomClientElement.style.fontFamily = 'Popins,sans-serif';
        prenomClientElement.style.fontWeight = 'bold';
        prenomClientElement.style.fontSize = '1.1rem';
        emailClientElement.innerHTML = `Email: ${userData.emailClient}`;
        emailClientElement.style.fontSize = '1.1rem';
        emailClientElement.style.color = 'blue';
        telClientElement.innerHTML = `Téléphone: ${userData.telClient}`;
        telClientElement.style.fontSize = '1.1rem';
    } else {
        document.getElementById('profile').innerHTML = 'Aucune donnée utilisateur trouvée.';
    }
});

const bouttonRetour = document.getElementById('bouttonRetour').addEventListener('click', () => {
    window.location.href = './connecter.html';
});

const boutonDeconnexion = document.getElementById('bouttonJoinWhatsapp').addEventListener('click', () => {;
    window.location.href = './updateProfil.html';
});