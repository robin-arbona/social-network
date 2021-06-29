import Chat from "./chat.js"

// Initialisation
console.log()
const pathMain = document.querySelector('#pathMain').value;

// Google auth
async function onSignIn(googleUser) {
    console.log('yo');

    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    setCookie("id_token",token,120);

    let response = await fetch(pathMain + "/googleAuth",{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: token }) 
    })

    if(response.ok){
        if (window.location.href.slice(-1) == '/') {
            window.location = pathMain + "/wall";
        }
    } else {
        console.error('Connexion failed',response)
    }
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        auth2.disconnect();
        console.log('User signed out.');
        window.location = pathMain + "/";
    });
}

// Chat
if(document.querySelector('.chat-message')){
    let chatInit = {
        url: "social.network:3001",
        userListEl: document.querySelector('.chat-user-list'),
        inputEl: document.querySelector('#chat-form'),
        displayEl: document.querySelector('.chat-message')
    }
    
    var chat = new Chat(chatInit)
}

