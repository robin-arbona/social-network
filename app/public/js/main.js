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

io("social.network:3001");


// Navbar
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});
