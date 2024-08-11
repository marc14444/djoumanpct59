const apiUrl = "https://djumanpctbackend.onrender.com/api/clients/get-all-clients";
const deleteClientApiUrl = "https://djumanpctbackend.onrender.com/api/admin/delete-client";
const totalClientsElement = document.getElementById('totalClients');

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

        // Trier les clients par date de création, du plus récent au plus ancien
        data.clients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return data.clients;
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = error.message;
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.fontSize = "1rem";
        return [];
    }
}

// Fonction pour supprimer un client
async function deleteClient(clientId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token non trouvé. Veuillez vous connecter.");
        }

        const response = await fetch(`${deleteClientApiUrl}/${clientId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du client");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = error.message;
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.fontSize = "1rem";
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

    // Mettre à jour le nombre total de clients
    totalClientsElement.textContent = `Total clients : ${clients.length}`;
    totalClientsElement.style.fontSize = '2rem';

    // Ajouter les écouteurs d'événements pour les boutons "Supprimer"
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const clientId = event.target.getAttribute('data-id');
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
            if (confirmation) {
                await deleteClient(clientId);
                // Recharger la liste des clients après suppression
                const clients = await getAllClients();
                displayClients(clients);
            }
        });
    });
}

// Charger les clients lorsque la page est chargée
document.addEventListener('DOMContentLoaded', async () => {
    const clients = await getAllClients();
    displayClients(clients);
});
