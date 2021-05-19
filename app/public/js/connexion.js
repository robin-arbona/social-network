function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Prodilfe', profile)
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    let form = new FormData();
    form.append("id_token",token)

    fetch("/googleAuth", {
        method: "POST",
        body: form
    })

}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}