const url = 'https://djumanpctbackend.onrender.com/api/search/get-artisans-by-search';
const btnRecherche = document.getElementById('recherche');
const loading = document.getElementById('loading');
loading.style.display = "none";
let messageEnCasDeNonTrouve = document.getElementById('messageEnCasDeNonTrouve');

async function getLocation() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    return null;
  }
}

async function makeSearch() {
  const search = document.getElementById('searchBar').value;
  const adress = document.getElementById('select').value;
  if (search === '' || adress === '') {
    alert('Veuillez remplir tous les champs');
    return;
  }

  try {
    const position = await getLocation();
    if (!position) {
      alert('Impossible de récupérer la position');
      return;
    }
    
    const { latitude, longitude } = position.coords;
    const dataSend = {
      latitude: latitude,
      longitude: longitude,
      metier: search,
      rayon: 20, // Vous pouvez changer la valeur du rayon
      mode: 'voiture' // Vous pouvez aussi changer le mode de transport
    };

    const response = await fetch(`${url}?latitude=${dataSend.latitude}&longitude=${dataSend.longitude}&metier=${dataSend.metier}&rayon=${dataSend.rayon}&mode=${dataSend.mode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Inclure les cookies dans la requête
    });

    if (!response.ok) {
      messageEnCasDeNonTrouve.style.display = "block";
      messageEnCasDeNonTrouve.textContent = "Oups, aucun résultat trouvé";
      messageEnCasDeNonTrouve.style.color = "red";
      messageEnCasDeNonTrouve.style.fontSize = "2rem";
      messageEnCasDeNonTrouve.style.fontWeight = "bold";
      throw new Error("Erreur lors de la recherche");
    }

    messageEnCasDeNonTrouve.style.display = "none";
    document.getElementById('loading').style.display = 'flex';

    // Simulate a network request or any async operation
    setTimeout(function () {
      document.getElementById('loading').style.display = 'none';
    }, 2000);

    const data = await response.json();
    console.log("recherche réussie", data);
    let html = '';
    data.searchResults.forEach(item => {
      html += `
      <div class="bg-white rounded-lg p-4 shadow-lg" style="display:grid; justify-content: center; align-items: center;">
          <img src="${item.selfie}" alt="Profile de ${item.nomArtisan}" class="rounded-full mb-4" style="border-radius: 50%; width: 100px; height: 100px;" />
          <h2 class="text-lg font-semibold">${item.nomArtisan} ${item.prenomArtisan}</h2>
          <p class="text-gray-500">Entreprise: ${item.nomEntreprise}</p>
          <p class="text-gray-500">Métier: ${item.metier}</p>
          <p class="text-gray-500">Lieu: ${item.local}</p>
          <p class="text-gray-500">Quartier: ${item.adresseArtisan}</p>
          <p class="text-gray-500">experience: ${item.experience} ans</p>
          <p class="text-gray-500">heure d'ouverture: ${item.ouverture}</p>
          <p class="text-gray-500">heure de fermeture: ${item.fermeture}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}" target="_blank">
              <button style="background-color: #87CEEB; width: 300px; height: 50px;border-radius: 10px;">Voir sur la carte 📍</button>
          </a><br/>
          <a href="tel:+225${item.telArtisan}">
              <button style="background-color: #FD5D14; width: 300px; height: 50px;border-radius: 10px;">Appel téléphonique 📞: ${item.telArtisan}</button>
          </a>
          <a aria-label="Chat on WhatsApp" href="https://wa.me/225${item.telArtisan}?text=bonjour%20*${item.nomArtisan}*%20j'ai%20besoin%20de%20tes%20services">
              <button style="background-color: #FD5D14; width: 300px; height: 50px; border-radius: 10px;" class="bg-gray-200 text-gray-800 hover:bg-gray-300 mt-2 p-2 rounded">WhatsApp 📞: ${item.telArtisan}</button>
          </a></br>
          <a href="./realisation.html?artisanId=${item._id}">
              <button style="background-color: #4CAF50; width: 300px; height: 50px;border-radius: 10px;">Voir les réalisations</button>
          </a>
      </div><br/>
      `;
    });
    document.getElementById('resultSearch').innerHTML = html;
    return data;

  } catch (e) {
    console.log(e);
    return;
  }
}

btnRecherche.addEventListener('click', (e) => {
  e.preventDefault();
  makeSearch();
  const afficher = document.getElementById('resultSearch').style.display = "block";
});

function viewRealisations(artisanId) {
  localStorage.setItem('artisanId', artisanId);
  window.location.href = './realisation.html';
}
