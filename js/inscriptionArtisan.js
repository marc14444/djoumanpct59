const url = "https://djumanpctbackend.onrender.com/api/artisans/signup-artisan";

async function registerArtisan(formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            message.textContent = 'Erreur lors de l\'inscription, veuillez vérifier vos informations !';
            message.style.color = 'red';
            message.style.fontSize = "1rem";
            throw new Error("Erreur lors de l'inscription");
        }

        const data = await response.json();
        console.log("Inscription réussie", data);
        message.textContent = 'Inscription réussie !';
        message.style.color = 'green';
        message.style.fontSize = "1rem";
        setTimeout(() => {
            window.location.href = './connexionArtisan.html';
        }, 5000);  // On attend 5 secondes avant de rediriger vers la page de connexion
        return data;
    } catch (e) {
        console.error(e);
        message.textContent = 'Erreur lors de l\'inscription !';
        message.style.color = 'red';
        message.style.fontSize = "1rem";
        return { statut: false, message: "Erreur de connexion au serveur" };
    }
}

let message = document.getElementById('successMessage');
document.getElementById('inscriptionForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target; // Assurez-vous que c'est bien le formulaire
    const formData = new FormData(form);

    const result = await registerArtisan(formData);
    console.log("result ici", result);

    if (result.statut) {
        console.log("Inscription réussie", result);
        
    } else {
        console.log("Erreur d'inscription", result);
    }
});
