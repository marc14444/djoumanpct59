const url = "http://localhost:3000/api/clients/signinClient";

async function registerClient(nomClient, prenomClient, telClient, emailClient, passwordClient, confirmPassword) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
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
            window.location.href = './connexion.html';
        }, 5000); 
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
    const nomClient = event.target.nomClient.value;
    const prenomClient = event.target.prenomClient.value;
    const telClient = event.target.telClient.value;
    const emailClient = event.target.emailClient.value;
    const passwordClient = event.target.passwordClient.value;
    const confirmPassword = event.target.confirmPassword.value;

    const result = await registerClient(nomClient, prenomClient, telClient, emailClient, passwordClient, confirmPassword);
    console.log("result ici", result);

    if (result.statut) {
        console.log("Inscription réussie", result);
    } else {
        console.log("Erreur d'inscription", result);
    }

    document.getElementById('loading').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('successPopup').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('successPopup').classList.add('hidden');
        }, 3000);
    }, 2000);
});
