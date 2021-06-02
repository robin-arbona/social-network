let urlParsed = window.location.pathname.split('/')

let userWall = urlParsed[urlParsed.indexOf('wall')+1] != undefined ? urlParsed[urlParsed.indexOf('wall')+1] : null;

let path = document.querySelector('#pathMain').getAttribute('value')

document.addEventListener('DOMContentLoaded',()=>{
    let pageLoader = new PageLoader(path+'/post',userWall)
})


class PageLoader {
    constructor(APIEntryPoint,param = null){
        this.entryPoint = APIEntryPoint;
        this.currentPage = 1;
        this.init();
        this.param = param;
    }
    getUrl(){
        let url = this.entryPoint + '/' + this.currentPage;
        return this.param == null ? url : url  +'/' + this.param;
    }
    async init(){
        let results = await this.fetchJson(this.getUrl());
        this.totalPage = results.totalPage;
        this.displayResults(results.posts);
    }
    async fetchJson(url){
        let json = await fetch(url)
        .then(reponse=>reponse.json())
        .then(json=>json);
        return json;
    }
    displayResults(results){
        results.forEach(result => {
            let postElement = document.createElement("div");
            postElement.innerHTML = this.formatePost(result);
            document.querySelector(".post").appendChild(postElement);
        });
    }
    formatePost(post){
        return `<h1>${post.post_name}</h1><p>${post.post_content}</p><hr>`
    }
    
}