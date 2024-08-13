const url = "http://localhost:3000/api/artisans/update-artisan-profil";
const token = sessionStorage.getItem('token');
async function registerArtisan(formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            message.textContent = 'Erreur lors de la Modification, veuillez vérifier vos informations !';
            message.style.color = 'red';
            message.style.fontSize = "1rem";
            throw new Error("Erreur lors de la Modification");
        }

        const data = await response.json();
        console.log("Modification réussie", data);
        message.textContent = 'Modification réussie !';
        message.style.color = 'green';
        message.style.fontSize = "1rem";
        setTimeout(() => {
            window.location.href = './artisanProfil.html';
        }, 5000);  // On attend 5 secondes avant de rediriger vers la page de connexion
        return data;
    } catch (e) {
        console.error(e);
        message.textContent = 'Erreur lors de la Modification !';
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
        console.log("Modification réussie", result);
    } else {
        console.log("Erreur de la Modification", result);
    }
    //document.getElementById('loading').classList.remove('hidden');

setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('successPopup').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('successPopup').classList.add('hidden');
    }, 3000);
}, 2000);
});