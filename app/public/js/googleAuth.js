async function onSignIn(googleUser) {
    const auth = googleUser.getAuthResponse();
    const token = auth.id_token;
    const path = document.querySelector('#pathMain').value

    setCookie("id_token",token,120);

    const response = await fetch(path + "/googleAuth",{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: token }) 
    })

    if(response.ok){
        let json = await response.json();

        sessionStorage.setItem('user_id',json.id)

        if (window.location.href.slice(-1) == '/') {
            window.location = path + "/wall";
        }
    } else {
        console.error('Connexion failed',response)

        let json = await response.json();

        document.querySelector(".user-message").innerText = json.message;
        document.querySelector('.g-signin2').remove();
    }
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    const path = document.querySelector('#pathMain').value

    auth2.signOut().then(function () {
        auth2.disconnect();
        window.location = path + "/";
    });
}

function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }