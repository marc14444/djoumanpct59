const bouton = document.querySelector("#boutonArtisanInscription");
bouton.addEventListener('click',(event) =>{
    event.preventDefault();
   setTimeout(()=>{
    console.log("bouton clicked")
    window.location.href="./../html/inscriptionArtisan.html";
   },1000);
})
const boutonClientInscription = document.querySelector("#boutonClientInscription");
boutonClientInscription.addEventListener('click',(event) =>{
    event.preventDefault();
   setTimeout(()=>{
    console.log("bouton clicked")
    window.location.href="./../html/inscriptionClient.html";
   },1000);
})

//bouton retourne
 const boutonRetour = document.querySelector("#boutonRetour");
 boutonRetour.addEventListener('click',(event) =>{
    event.preventDefault();
   setTimeout(()=>{
    console.log("bouton clicked")
    window.location.href="./../index.html";
   },100);
})
//connexion
/*  const boutonConnexion = document.querySelector("#connexion");
 boutonConnexion.addEventListener('click',(event) =>{
    event.preventDefault();
   setTimeout(()=>{
    console.log("bouton clicked")
    window.location.href="./../html/connecter.html";
   },100);
}) */
