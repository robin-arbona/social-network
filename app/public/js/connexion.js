const pathMain = $('#pathMain').val();

function onSignIn(googleUser) {
    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    $.ajax({
        url: pathMain + "/googleAuth",
        type: "POST",
        data: {id_token: token}
    }).done(()=>{
        console.log("Success")
    }).fail(()=>{
        console.log("Fail")
    })

}

