const url = "https://djumanpctbackend.onrender.com/api/clients/update-client-profile";

async function updateClient(nomClient, prenomClient, telClient, emailClient, passwordClient, confirmPassword) {
    try {
        const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké dans localStorage

        if (!token) {
            throw new Error("Utilisateur non connecté");
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluez le token dans les en-têtes
            },
            body: JSON.stringify({
                nomClient,
                prenomClient,
                telClient,
                emailClient,
                passwordClient,
                confirmPassword
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = 'La modification a échoué, veuillez vérifier vos informations !';
            message.style.color = 'red';
            message.style.fontSize = "1rem";
            throw new Error(data.message || "Erreur lors de la modification");
        }

        message.textContent = 'La modification a réussi !';
        message.style.color = 'green';
        message.style.fontSize = "1rem";

        setTimeout(() => {
            window.location.href = './userProfil.html';
        }, 5000);

        return data;
    } catch (e) {
        console.error(e);
        message.textContent = 'Erreur lors de la modification';
        message.style.color = 'red';
        message.style.fontSize = "1rem";
        return { statut: false, message: "Erreur de connexion au serveur" };
    }
}

document.getElementById('modifier').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nomClient = event.target.nomClient.value;
    const prenomClient = event.target.prenomClient.value;
    const telClient = event.target.telClient.value;
    const emailClient = event.target.emailClient.value;
    const passwordClient = event.target.passwordClient.value;
    const confirmPassword = event.target.confirmPassword.value;

    const result = await updateClient(nomClient, prenomClient, telClient, emailClient, passwordClient, confirmPassword);

    if (result.statut) {
        console.log("La modification a réussi", result);
    } else {
        console.log("Erreur lors de la modification", result);
    }
});
