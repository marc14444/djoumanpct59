const apiUrl = "http://localhost:3000/api/clients/get-all-clients";

// Fonction pour récupérer la liste des clients
async function getAllClients() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token non trouvé. Veuillez vous connecter.");
        }

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des clients");
        }

        const data = await response.json();
        if (!data.clients || !Array.isArray(data.clients)) {
            throw new Error("Les données reçues ne contiennent pas un tableau de clients");
        }

        return data.clients;
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = error.message;
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.fontSize = "1rem";
        return [];
    }
}

// Fonction pour afficher la liste des clients dans le DOM
function displayClients(clients) {
    const clientsList = document.getElementById('clientsList');
    if (!clientsList) {
        console.error("L'élément #clientsList n'a pas été trouvé dans le DOM");
        return;
    }

    clientsList.innerHTML = ''; // Vider la liste existante

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'card mb-3';
        clientDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${client.nomClient} ${client.prenomClient}</h5>
                <p class="card-text"><strong>Email:</strong> ${client.emailClient}</p>
                <p class="card-text"><strong>Téléphone:</strong> ${client.telClient}</p>
                <button class="btn btn-warning btn-edit" data-id="${client._id}">Modifier</button>
                <button class="btn btn-danger btn-delete" data-id="${client._id}">Supprimer</button>
            </div>
        `;
        clientsList.appendChild(clientDiv);
    });
}

// Charger les clients lorsque la page est chargée
document.addEventListener('DOMContentLoaded', async () => {
    const clients = await getAllClients();
    displayClients(clients);
});
