const url = 'http://localhost:3000/api/search/search-artisan-for-client/'
const btnRecherche = document.getElementById('recherche');
const loading = document.getElementById('loading');
loading.style.display = "none";
let messageEnCasDeNonTrouve = document.getElementById('messageEnCasDeNonTrouve');
async function makeSearch(){
    const search = document.getElementById('searchBar').value;
    const adress = document.getElementById('select').value;
    if(search === ''|| adress === ''){
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    
    try {
        const dataSend = {
            adresse:adress,
            terms: search 
        }
        console.log(dataSend);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dataSend)
        });
        if (!response.ok) {
            messageEnCasDeNonTrouve.style.display = "block";
            messageEnCasDeNonTrouve.textContent = "Oups, aucun resultat trouvé";
            messageEnCasDeNonTrouve.style.color = "red";
            messageEnCasDeNonTrouve.style.fontSize = "2rem";
            messageEnCasDeNonTrouve.style.fontWeight = "bold";
            throw new Error("Erreur lors de la recherche");
        }
        
        messageEnCasDeNonTrouve.style.display = "none";
        document.getElementById('loading').style.display = 'flex';

      // Simulate a network request or any async operation
      setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
      }, 2000); 
        const data = await response.json();
        console.log("recherche réussie", data);
        let html = '';
        data.searchResults.forEach(item => {
            html += `
            <div class="bg-white rounded-lg p-4 shadow-lg" style="display:grid; justify-content: center; align-items: center;">
                <img src="${item.selfie}" alt="Profile de ${item.nomArtisan}" class="rounded-full mb-4" style="border-radius: 50%; width: 100px; height: 100px;" />
                <h2 class="text-lg font-semibold">${item.nomArtisan}</h2>
                <p class="text-gray-500">Metier: ${item.metier}</p>
                <p class="text-gray-500">Lieu: ${item.local}</p>
                <p class="text-gray-500">Quartier: ${item.adresseArtisan}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}" target="_blank">
                    <button style="background-color: #87CEEB; width: 300px; height: 50px;border-radius: 10px;">Voir sur la carte 📍</button>
                </a><br/>
                <a href="tel:+225${item.telArtisan}"><button style="background-color: #FD5D14; width: 300px; height: 50px;border-radius: 10px;">appel téléphonique 📞: ${item.telArtisan}</button></a>
                <a aria-label="Chat on WhatsApp" href="https://wa.me/225${item.telArtisan}?text=bonjour%20*${item.nomArtisan}*%20j'ai%20besoin%20de%20tes%20service">
                <button style="background-color: #FD5D14; width: 300px; height: 50px; border-radius: 10px;" class="bg-gray-200 text-gray-800 hover:bg-gray-300 mt-2 p-2 rounded">whatsapp 📞: ${item.telArtisan}</button>
                <a/>
            </div><br/>
            `;
        });
        document.getElementById('resultSearch').innerHTML = html;
        return data;

    }catch(e){
        console.log(e);
        return;
    }
    
}

btnRecherche.addEventListener('click',(e)=>{
    e.preventDefault();
    makeSearch();
    const afficher = document.getElementById('resultSearch').style.display="block";
})