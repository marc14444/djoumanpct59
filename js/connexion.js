const url = "https://djumanpctbackend.onrender.com/api/clients/loginClient";

async function loginClient(telClient, passwordClient){
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                telClient:telClient,
                passwordClient:passwordClient
            }).toString(),
        });
        if(!response.ok){
            message.textContent = 'Numéro de téléphone ou mot de passe incorrecte !';
            message.style.color = 'red';
            message.style.fontSize = "1rem";
            throw new Error("Veuillez vérifier votre connexion");
        } 
        const data = await response.json();
        localStorage.setItem('userData', JSON.stringify(data .data));
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('userData', JSON.stringify(data.data));
        sessionStorage.setItem('token', JSON.stringify(data.token));
        console.log("connexion réussie", data);
        message.textContent = 'Connexion réussie !';
        message.style.color = 'green';
        message.style.fontSize = "1rem";
        setTimeout(() => {
            window.location.href = './connecter.html';
        }, 5000);
        return data;
    }catch(e){
        console.error(e);
        message.textContent = 'Numéro de téléphone ou mot de passe incorrecte !';
        message.style.color = 'red';
        message.style.fontSize = "1rem";
        return {statut: false, message: "Erreur de connexion au serveur"};
    }
}

let message = document.getElementById('message');
document.getElementById('connexionForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const telClient = event.target.telClient.value;
    const passwordClient = event.target.passwordClient.value;
    const result = await loginClient(telClient, passwordClient);
    console.log("result ici",result);

    loginClient(telClient, passwordClient).then(result => {
        if(result.statut){
            console.log("result",result);
        } else { 
            console.log("result error");
        }
    });
});