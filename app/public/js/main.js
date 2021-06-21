const pathMain = document.querySelector('#pathMain').value;

async function onSignIn(googleUser) {
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
if(document.querySelector('.new-post')){
    document.querySelector('.new-post').addEventListener('click',async ()=>{
        let content = await loadContent(pathMain + '/post/new/form');
        displayModal("New post",content);
    })
}


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
    if(param != null){
        form.setAttribute('action',form.getAttribute('action') + '/' + param);
    }
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

// Members List

class MemberList {
    constructor(el){
        this.rootEl = el;
        this.getList();
    }
    async getList(){
        console.log(pathMain)
        this.members = await fetch(pathMain + '/users').then(r => r.json())
        this.members.data.forEach(member => this.displayMember(member))
    }
    displayMember(member){
        console.log(member)
        let newEl = document.createElement('div');
        newEl.innerHTML = this.formatMember(member);
        this.rootEl.appendChild(newEl);
    }
    formatMember(member){
        return `
        <div class="media m-2">
            <div class="media-content">
                <a href="${pathMain}/wall/${member.user_pk_id}"><p  class="title has-text-right is-5">${member.user_firstname}<br /><span class="is-uppercase">${member.user_name}</span></p></a>
                <p class="subtitle has-text-right is-7">${member.user_mail}</p>
            </div>
            <div class="media-left is-vcentered">
                <figure class="image is-48x48">
                    <img class="is-rounded" src="${member.user_picture}" alt="Placeholder image">
                </figure>
            </div>
        </div>
        <hr />`
    }
}

if(document.querySelector('#members-list')){
    var members = new MemberList(document.querySelector('#members-list'))
}