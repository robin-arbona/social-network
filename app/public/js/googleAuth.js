async function onSignIn(googleUser) {
    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    setCookie("id_token",token,120);

    let path = document.querySelector('#pathMain').value

    let response = await fetch(path + "/googleAuth",{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: token }) 
    })

    if(response.ok){
        if (window.location.href.slice(-1) == '/') {
            window.location = path + "/wall";
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


function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }