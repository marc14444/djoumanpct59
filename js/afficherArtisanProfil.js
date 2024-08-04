document.addEventListener('DOMContentLoaded', (event) => {
    const imageArtisan = document.getElementById('imageArtisan');
    const nomClientElement = document.getElementById('nomArtisan');
    const prenomClientElement = document.getElementById('prenomArtisan');
    const emailClientElement = document.getElementById('emailArtisan');
    const telClientElement = document.getElementById('telArtisan');
    const adresseArtisan = document.getElementById('adresseArtisan');
    const alphabetisation = document.getElementById('alphabetisation');
    const nomEntreprise = document.getElementById('nomEntreprise');
    const local = document.getElementById('local');
    const metier = document.getElementById('metier');
    const roleArtisan = document.getElementById('roleArtisan');
    const longitude = document.getElementById('longitude');
    const latitude = document.getElementById('latitude');

    
    // Récupérer les données de l'utilisateur depuis le localStorage
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        // Remplir les champs avec les données utilisateur
        imageArtisan.src = userData.selfie;
        imageArtisan.style.width = '200px';
        imageArtisan.style.height = '200px';
        imageArtisan.style.borderRadius = '50%';
        imageArtisan.style.objectFit = 'cover';
        nomClientElement.innerHTML = `Nom: ${userData.nomArtisan}`;
        nomClientElement.style.fontSize = '1.1rem';
        nomClientElement.style.fontFamily = 'Popins,sans-serif';
        nomClientElement.style.fontWeight = 'bold';
        prenomClientElement.innerHTML = `Prénom: ${userData.prenomArtisan}`;
        prenomClientElement.style.fontFamily = 'Popins,sans-serif';
        prenomClientElement.style.fontWeight = 'bold';
        prenomClientElement.style.fontSize = '1.1rem';
        emailClientElement.innerHTML = `Email: ${userData.emailArtisan}`;
        emailClientElement.style.fontSize = '1.1rem';
        emailClientElement.style.color = 'blue';
        telClientElement.innerHTML = `Téléphone: ${userData.telArtisan}`;
        telClientElement.style.fontSize = '1.1rem';
        adresseArtisan.innerHTML = `Adresse: ${userData.adresseArtisan}`;
        adresseArtisan.style.fontSize = '1.1rem';
        alphabetisation.innerHTML = `Alphabétisation: ${userData.alphabetisation}`;
        alphabetisation.style.fontSize = '1.1rem';
        nomEntreprise.innerHTML = `Nom de l'entreprise: ${userData.nomEntreprise}`;
        nomEntreprise.style.fontSize = '1.1rem';
        local.innerHTML = `Localisation: ${userData.local}`;
        local.style.fontSize = '1.1rem';
        metier.innerHTML = `Métier: ${userData.metier}`;
        metier.style.fontSize = '1.1rem';
        roleArtisan.innerHTML = `Rôle: ${userData.roleArtisan}`;
        roleArtisan.style.fontSize = '1.1rem';
        longitude.innerHTML = `Longitude de l'entreprise: ${userData.longitude}`;
        longitude.style.fontSize = '1.1rem';
        latitude.innerHTML = `Latitude de l'entreprise: ${userData.latitude}`;
        latitude.style.fontSize = '1.1rem';
        
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