document.addEventListener('DOMContentLoaded', async function() {
    const artisanId = localStorage.getItem('artisanId');
    if (!artisanId) {
        alert('Aucun artisan sélectionné');
        return;
    }

    const url = `http://localhost:3000/api/clients/publications/get-all-publications-artisan/${artisanId}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des réalisations de l'artisan");
        }

        const publications = await response.json();
        console.log("Publications récupérées:", publications);

        // Afficher les publications dans le HTML
        let html = '';
        publications.forEach(pub => {
            html += `
            <div class="bg-white rounded-lg p-4 shadow-lg mb-4">
                <h3 class="text-lg font-semibold">${pub.title}</h3>
                <img src="${pub.imageUrl}" alt="${pub.title}" class="mb-4" style="width: 100%; height: auto;" />
                <p>${pub.description}</p>
                <p class="text-gray-500">Date: ${new Date(pub.createdAt).toLocaleDateString()}</p>
            </div>
            `;
        });

        document.getElementById('publicationsContainer').innerHTML = html;

    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des réalisations");
    }
});
