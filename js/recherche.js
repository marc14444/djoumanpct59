const url = 'http://localhost:3000/api/search/search-artisan-for-client/'
const btnRecherche = document.getElementById('recherche');

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
            throw new Error("Erreur lors de la recherche");
        }
        
        const data = await response.json();
        console.log("recherche réussie", data);
        let html = '';
        data.searchResults.forEach(item => {
            html += `
            <div class="bg-white rounded-lg p-4 shadow-lg">
                <img src="${item.selfie}" alt="Profile of soumaoro inza" class="rounded-full mb-4" style="border-radius: 50%; width: 100px; height: 100px;" />
                <h2 class="text-lg font-semibold">${item.nomArtisan}</h2>
                <p class="text-gray-500">Metier: ${item.metier}</p>
                <p class="text-gray-500">Lieu: ${item.local}</p>
                <a href="tel:+225${item.telArtisan}"><button style="background-color: #FD5D14;">appel téléphonique 📞: ${item.telArtisan}</button></a>
                <a aria-label="Chat on WhatsApp" href="https://wa.me/225${item.telArtisan}?text=bonjour%20*${item.nomArtisan}*%20j'ai%20besoin%20de%20tes%20service">
                <button style="background-color: #FD5D14;" class="bg-gray-200 text-gray-800 hover:bg-gray-300 mt-2 p-2 rounded">whatsapp 📞: ${item.telArtisan}</button>
                <a />
            </div>
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