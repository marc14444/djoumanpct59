document.getElementById('packForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const avantage = document.getElementById('avantage').value;
    const prix = document.getElementById('prix').value;

    try {
        const response = await fetch('https://djumanpctbackend.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                titre,
                avantage,
                prix
            })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création du pack publicitaire');
        }

        const data = await response.json();
        alert('Pack publicitaire créé avec succès');
        document.getElementById('packForm').reset();
    } catch (error) {
        console.error(error);
        alert('Erreur: ' + error.message);
    }
});
