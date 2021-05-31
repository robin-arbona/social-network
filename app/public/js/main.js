console.log("Main lié")
//io("social.network:3001");

const pathMain = $('#pathMain').val();
console.log(window.location.href.slice(-1));


function onSignIn(googleUser) {
    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    $.ajax({
        url: pathMain + "/googleAuth",
        type: "POST",
        data: { id_token: token }
    }).done(() => {
        if (window.location.href.slice(-1) == '/') {
            window.location = pathMain + "/wall";
        } else {

        }

    }).fail(() => {
        console.log("Fail");
    })

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        location.reload()
    });
}

