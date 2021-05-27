const pathMain = $('#pathMain').val();

function onSignIn(googleUser) {
    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    $.ajax({
        url: pathMain + "/googleAuth",
        type: "POST",
        data: {id_token: token}
    }).done((reponse)=>{
        console.log(reponse)
       // window.location = pathMain + "/wall";
    }).fail(()=>{
        console.log("Fail");
    })

}

