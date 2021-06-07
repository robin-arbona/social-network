class PageLoader {
    constructor(APIEntryPoint,param = null,target){
        this.entryPoint = APIEntryPoint;
        this.param = param;
        this.target = target;
        this.currentPage = 1;
        this.totalPage = 1;
        this.initIntersectionObserver();
    }
    initIntersectionObserver(){
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        }
        let callback = function(entries, observer) {
            entries.forEach(entry => {
                if(entry.intersectionRatio == 1 ){
                    this.setTargetMsg('Loading..');
                    this.loadContent();
                }
            });
        };
        this.observer = new IntersectionObserver(callback.bind(this), options);
        this.observer.observe(this.target);
    }
    setTargetMsg(msg){
        document.querySelector('#loadContent').innerHTML = msg;
    }
    getUrl(){
        let url = this.entryPoint + '/' + this.currentPage;
        return this.param == null ? url : url  +'/' + this.param;
    }
    async loadContent(){
        if( this.currentPage <= this.totalPage ){
            let results = await this.fetchJson( this.getUrl() );
            this.totalPage = results.totalPage;
            this.displayResults( results.posts );
            this.currentPage = this.currentPage + 1;
            this.setTargetMsg('Loaded');
        } else {
            this.setTargetMsg('Nothing more to load');
            this.observer.disconnect();
        }
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
            postElement.innerHTML = formatPost(result);
            document.querySelector(".post").appendChild(postElement);
        });
    }
}

let path = document.querySelector('#pathMain').getAttribute('value')
let urlParsed = window.location.pathname.split('/')
let param= urlParsed[urlParsed.indexOf('wall')+1] != undefined ? urlParsed[urlParsed.indexOf('wall')+1] : null;
let target = document.querySelector('#loadContent');
let pageLoader = new PageLoader(path+'/post',param,target)

const formatPost = (post) => {
    let comments = post.comments.length > 0
        ? post.comments.map(comment => formatComment(comment)).join('') 
        : '<div>no comment</div>';
    let postLikes =  formatLikes(post.likes,post.post_pk_id,"post");
    return `
    <div class="card mb-6">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                <figure class="image is-48x48">
                    <img class="is-rounded" src="${post.user_picture}" alt="Placeholder image">
                </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">${post.post_name}</p>
                    <p class="subtitle is-6">@${post.user_name} ${post.user_firstname}</p>
                </div>
            </div>
            <div class="content">
                ${post.post_content}
                <br>
                <time datetime="2016-1-1">${post.post_date}</time>
                <div>${postLikes}</div>
            </div>
            <div class="content">
                ${comments}
            </div>
        </div>
        <button class="new-comment button is-warning is-light is-rounded" onClick="reply(${post.post_pk_id})">Comment</button>
    </div>`;
}

const formatComment = (comment) => {
    let commentLikes = formatLikes(comment.likes,comment.comment_pk_id,'comment')
    return `<details>
                <summary>${comment.comment_name} from @${comment.user_name} ${comment.user_firstname} ${commentLikes} </summary>
                ${comment.comment_content}
            </details>`;
}

const formatLikes = (likes,id,type) => {
    let like = likes ? likes.likes_likes : '';
    let disslike = like ? likes.likes_disslikes : '';
    return `<span>
                <button id="like-${id}-${type}" class="button is-success is-small is-rounded" onClick="vote('like',${id},'${type}')">+ ${like}</button>
                <button id="disslike-${id}-${type}" class="button is-danger is-small is-rounded" onClick="vote('disslike',${id},'${type}')">- ${disslike}</button>
            </span>`;
}

const vote = async (type,id,element) => {
    
    let vote = new FormData();
    vote.append("type",type)
    vote.append("id",id)
    vote.append("element",element)

    let result = await fetch("/vote", {
        method: "POST",
        body: vote
    }).then(reponse => reponse.json())

    document.querySelector(`#like-${id}-${element}`).innerText = `+ ${result.total.likes_likes}`;
    document.querySelector(`#disslike-${id}-${element}`).innerText = `- ${result.total.likes_disslikes}`;
}

const reply = async (id) => {
    let content = await loadContent(pathMain + '/comment/form');
    displayModal("New comment",content,id);
}
