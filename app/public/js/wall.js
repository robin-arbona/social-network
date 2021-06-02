const pathMain = document.querySelector('#pathMain').getAttribute('value');

let urlParsed = window.location.pathname.split('/')


if(urlParsed[urlParsed.indexOf('wall')+1] != undefined){
    user_id = urlParsed[urlParsed.indexOf('wall')+1]
} else {
    user = await fetch(pathMain + '/user').then(reponse => reponse.json())
    user_id = user.id;
}