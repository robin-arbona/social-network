console.log("Main lié")


const pathMain = $('#pathMain').val();
window.location.href.slice(-1);


function onSignIn(googleUser) {
    let auth = googleUser.getAuthResponse();
    let token = auth.id_token;

    setCookie("id_token",token,15);

    $.ajax({
        url: pathMain + "/googleAuth",
        type: "POST",
        data: { id_token: token }
    }).done(() => {
        if (window.location.href.slice(-1) == '/') {
            window.location = pathMain + "/wall";
        }
    }).fail(() => {
        console.log("Fail");
    })

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        auth2.disconnect();
        console.log('User signed out.');
        window.location = pathMain + "/";
    });
}


// Navbar

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


// New post
document.querySelector('.new-post').addEventListener('click',async ()=>{
    let content = await loadContent(pathMain + '/post/new/form');
    displayModal("New post",content);
})

const loadContent = (url) => {
    return fetch(url).then(reponse => reponse.text());
}

const postContent = async (formElement,url) => {
    let form = new FormData(formElement);
    let json = await fetch(url, {
      method: "POST",
      body: form
    }).then(response => response.json())
    return json
}

const displayModal = (title,content,param = null) => {
    title & (document.querySelector("#modal-title").innerHTML = title);
    content & (document.querySelector("#modal-content").innerHTML = content);
    let form = document.querySelector(".form-modal");
    param & form.setAttribute('action',form.getAttribute('action') + '/' + param);
    content & form.addEventListener('submit',async function(e){
        e.preventDefault()
        result = await postContent(this,pathMain+this.getAttribute('action'))
        if(result.success){
            closeModal(true);
        } else {
            let message = result.message + ': ';
            for (const key in result.errors) {
                const element = result.errors[key];
                message +=  key + '-->' + element + '. ';
            }
            document.querySelector("#modal-footer").innerHTML = message;
        }
 
    });
    document.querySelector(".delete").addEventListener('click',()=>{closeModal(false)});
    document.querySelector(".modal").classList.toggle("is-active");
}

const closeModal = (reload) => {   
    document.querySelector(".modal").classList.toggle("is-active");
    if(reload){
        document.querySelector("#modal-title").innerHTML = "";
        document.querySelector("#modal-content").innerHTML = "";
        removeAllChildNodes(document.querySelector('.post'));
        pageLoader = new PageLoader(path+'/post',param,target);
    }

}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

