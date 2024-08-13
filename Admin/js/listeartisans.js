const artisansApiUrl = "https://djumanpctbackend.onrender.com/api/artisans/get-all-artisan";
const deleteArtisanApiUrl = "https://djumanpctbackend.onrender.com/api/admin/delete-artisan";
const totalArtisansElement = document.getElementById('totalArtisans');

// Fonction pour récupérer la liste des artisans
async function getAllArtisans() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token non trouvé. Veuillez vous connecter.");
        }

        const response = await fetch(artisansApiUrl, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des artisans");
        }

        const data = await response.json();
        if (!data.artisans || !Array.isArray(data.artisans)) {
            throw new Error("Les données reçues ne contiennent pas un tableau d'artisans");
        }
        // Trier les artisans par date de création, du plus récent au plus ancien
        data.artisans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return data.artisans;
    } catch (error) {
        console.error(error);
        document.getElementById('artisanMessage').textContent = error.message;
        document.getElementById('artisanMessage').style.color = 'red';
        document.getElementById('artisanMessage').style.fontSize = "1rem";
        return [];
    }
}

// Fonction pour supprimer un artisan
async function deleteArtisan(artisanId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token non trouvé. Veuillez vous connecter.");
        }

        const response = await fetch(`${deleteArtisanApiUrl}/${artisanId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de l'artisan");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        document.getElementById('artisanMessage').textContent = error.message;
        document.getElementById('artisanMessage').style.color = 'red';
        document.getElementById('artisanMessage').style.fontSize = "1rem";
    }
}

// Fonction pour afficher la liste des artisans dans le DOM
function displayArtisans(artisans) {
    const artisansList = document.getElementById('artisansList');
    if (!artisansList) {
        console.error("L'élément #artisansList n'a pas été trouvé dans le DOM");
        return;
    }

    artisansList.innerHTML = ''; // Vider la liste existante

    artisans.forEach(artisan => {
        const artisanDiv = document.createElement('div');
        artisanDiv.className = 'card mb-3';
        artisanDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${artisan.nomArtisan} ${artisan.prenomArtisan}</h5>
                <p class="card-text"><strong>Email:</strong> ${artisan.emailArtisan}</p>
                <p class="card-text"><strong>Téléphone:</strong> ${artisan.telArtisan}</p>
                <p class="card-text"><strong>Localisation:</strong> ${artisan.local}</p>
                <p class="card-text"><strong>Adresse:</strong> ${artisan.adresseArtisan}</p>
                <p class="card-text"><strong>Métier:</strong> ${artisan.metier}</p>
                <p class="card-text"><strong>Alphabetisation:</strong> ${artisan.alphabetisation}</p>
                <p class="card-text"><strong>Note Moyenne:</strong> ${artisan.averageNote}</p>
                <p class="card-text"><strong>Nombre de Notes:</strong> ${artisan.noteCount}</p>
                <p class="card-text"><strong>Status:</strong> ${artisan.statusArtisan}</p>
                <p class="card-text"><strong>experience:</strong> ${artisan.experience} ans</p>
                //heure d'ouverture
                <p class="card-text"><strong>Heure d'Ouverture:</strong> ${artisan.ouverture}</p>
                //heure de fermeture
                <p class="card-text"><strong>Heure de Fermeture:</strong> ${artisan.fermeture}</p>
                <p class="card-text"><strong>Date de Création:</strong> ${new Date(artisan.createdAt).toLocaleString()}</p>
                <p class="card-text"><strong>Date de Mise à Jour:</strong> ${new Date(artisan.updatedAt).toLocaleString()}</p>
                <p class="card-text"><strong>Date de Création:</strong> ${new Date(artisan.createdAt).toLocaleString()}</p>
                <p class="card-text"><strong>Date de Mise à Jour:</strong> ${new Date(artisan.updatedAt).toLocaleString()}</p>
                <div class="card-text">
                    <strong>CNI:</strong>
                    <div>
                        <img src="${artisan.cni.recto}" alt="CNI Recto" width="100" /><br />
                        <img src="${artisan.cni.verso}" alt="CNI Verso" width="100" />
                    </div>
                </div><br />
                <div class="card-text">
                    <strong>Selfie:</strong><br />
                    <img src="${artisan.selfie}" alt="Selfie" width="100" />
                </div><br />
                <button class="btn btn-warning btn-edit" data-id="${artisan._id}">Modifier</button>
                <button class="btn btn-danger btn-delete" data-id="${artisan._id}">Supprimer</button>
            </div>
        `;
        artisansList.appendChild(artisanDiv);
    });

    // Mettre à jour le nombre total d'artisans
    totalArtisansElement.textContent = `Total artisans : ${artisans.length}`;
    totalArtisansElement.style.fontSize = '2rem';

    // Ajouter les écouteurs d'événements pour les boutons "Supprimer"
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const artisanId = event.target.getAttribute('data-id');
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet artisan ?");
            if (confirmation) {
                await deleteArtisan(artisanId);
                // Recharger la liste des artisans après suppression
                const artisans = await getAllArtisans();
                displayArtisans(artisans);
            }
        });
    });
}

// Charger les artisans lorsque la page est chargée
document.addEventListener('DOMContentLoaded', async () => {
    const artisans = await getAllArtisans();
    displayArtisans(artisans);
});
