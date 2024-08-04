const url = "http://localhost:3000/api/artisans/login-artisan";

// Fonction asynchrone pour la connexion de l'artisan
async function loginArtisan(telArtisan, passwordArtisan) {
    try {
        // Encodage des données en URLSearchParams
        const formData = new URLSearchParams();
        formData.append('telArtisan', telArtisan);
        formData.append('passwordArtisan', passwordArtisan);

        // Requête POST avec fetch
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        // Vérification de la réponse du serveur
        if (!response.ok) {
            throw new Error("Numéro de téléphone ou mot de passe incorrecte !");
        }

        const data = await response.json();

        // Stockage des données utilisateur et du token dans le localStorage et le sessionStorage
        localStorage.setItem('userData', JSON.stringify(data.data));
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('userData', JSON.stringify(data.data));
        sessionStorage.setItem('token', data.token);
        console.log("Connexion réussie", data);

        // Affichage du message de succès et redirection après 5 secondes
        showMessage('Connexion réussie !', 'green');
        setTimeout(() => {
            window.location.href = './connecterArtisan.html';
        }, 5000);

        return data;
    } catch (e) {
        console.error(e);
        showMessage(e.message, 'red');
        return { statut: false, message: e.message };
    }
}

// Fonction pour afficher les messages
function showMessage(text, color) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.style.color = color;
    message.style.fontSize = "1rem";
}

// Gestionnaire d'événement pour le formulaire de connexion
document.getElementById('connexionForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const telArtisan = event.target.telArtisan.value;
    const passwordArtisan = event.target.passwordArtisan.value;
    const result = await loginArtisan(telArtisan, passwordArtisan);
    console.log("Résultat de la connexion", result);

    if (result.statut) {
        console.log("Connexion réussie", result);
    } else {
        console.log("Erreur de connexion", result);
    }
});
