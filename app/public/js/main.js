console.log("Main lié")
//io("social.network:3001");

const pathMain = $('#pathMain').val();

function onSignIn(googleUser) {
    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    $.ajax({
        url: pathMain + "/googleAuth",
        type: "POST",
        data: { id_token: token }
    }).done(() => {
        window.location = pathMain + "/wall";
    }).fail(() => {
        console.log("Fail");
    })
    console.log(window.location);
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');

    });
}

