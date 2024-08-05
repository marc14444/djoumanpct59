const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
    alert("Oups vous n'êtes pas connecté vous devez vous connecter pour accéder à la recherche");
    window.location.href = "./../html/connexion.html";

});