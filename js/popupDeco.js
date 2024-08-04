const bouton = document.querySelector("#boutonArtisanInscription");
bouton.addEventListener('click',(event) =>{
    event.preventDefault();
   setTimeout(()=>{
    console.log("bouton clicked")
    window.location.href="./../html/UserProfil.html";
   },1000);
})
const boutonClientInscription = document.querySelector("#boutonClientInscription");
boutonClientInscription.addEventListener('click',(event) =>{
    event.preventDefault();
   setTimeout(()=>{
    console.log("bouton clicked")
    window.location.href="./../index.html";
   },1);
})

//bouton retourne
 const boutonRetour = document.querySelector("#boutonRetour");
 boutonRetour.addEventListener('click',(event) =>{
    event.preventDefault();
    LePopup.style.display = "none";
})

const LePopup = document.querySelector(".container");

