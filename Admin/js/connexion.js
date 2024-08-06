const url = "http://localhost:3000/api/admin/signinAdmin";

async function loginClient(username, password){
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username:username,
                password:password
            }).toString(),
        });
        if(!response.ok){
            message.textContent = 'Nom d\'utilisateur ou mot de passe incorrecte !';
            message.style.color = 'red';
            message.style.fontSize = "1rem";
            throw new Error("Veuillez vérifier votre connexion");
        }
        const data = await response.json();
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('userData', JSON.stringify(data));
        sessionStorage.setItem('token', JSON.stringify(data.token));
        console.log("connexion réussie", data);
        message.textContent = 'Connexion réussie !';
        message.style.color = 'green';
        message.style.fontSize = "1rem";
        setTimeout(() => {
            window.location.href = './../index.html';
        }, 5000);
        return data;
    }catch(e){
        console.error(e);
        message.textContent = 'Nom d\'utilisateur ou mot de passe incorrecte !';
        message.style.color = 'red';
        message.style.fontSize = "1rem";
        return {statut: false, message: "Erreur de connexion au serveur"};
    }
}

let message = document.getElementById('message');
document.getElementById('connexionForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const result = await loginClient(username, password);
    console.log("result ici",result);

    loginClient(username, password).then(result => {
        if(result.statut){
            console.log("result",result);
        } else { 
            console.log("result error");
        }
    });
});