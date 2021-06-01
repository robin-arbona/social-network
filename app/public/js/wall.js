let urlParsed = window.location.pathname.split('/')

let userWall = urlParsed[urlParsed.indexOf('wall')+1] != undefined ? urlParsed[urlParsed.indexOf('wall')+1] : '';

let path = document.querySelector('#pathMain').getAttribute('value')

document.addEventListener('DOMContentLoaded',()=>{
    loadPosts(userWall,1)
})

const loadPosts = async (userId,page = 1)=>{
    let url = path + '/post/' + page;
    url = userId > 0 ? url + '/' + userId : url;
    let json = await fetch(url)
        .then(reponse=>reponse.json())
        .then(json=>json)
    json.posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.innerHTML = formatePost(post);
        document.querySelector(".post").appendChild(postElement);
    });
}

const formatePost = (post) => {
    return `<h1>${post.post_name}</h1><p>${post.post_content}</p><hr>`
}
