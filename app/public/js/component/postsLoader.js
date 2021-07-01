import {displayModal} from './modal.js';
import { loadContent, removeAllChildNodes, createFragment, loadJson } from '../lib/tools.js';

const path = document.querySelector('#pathMain').value;

export default class PostsLoader {
    constructor({path,param,target}){
        this.entryPoint = path;
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
    reset(){
        this.currentPage = 1;
        this.totalPage = 1;
        this.observer.disconnect();
        this.initIntersectionObserver();
        removeAllChildNodes(document.querySelector('.post'));
    }
}

const formatPost = (post) => {
    const comments = post.comments.length > 0
        ? post.comments.map(comment => formatComment(comment)).join('') 
        : '<div>no comment</div>';
    const postLikes =  formatLikes(post.likes,post.post_pk_id,"post");
    const userId = sessionStorage.getItem('user_id');

    const owner = userId == post.post_fk_user_id ? true : '';
    const editButton = `<a href="#" onClick="editPost(${post.post_pk_id})">Edit</a>`;
    const deleteButton = `<a href="#" onClick="deletePost(${post.post_pk_id})">Delete</a>`;


    return `
    <div class="card mb-6">
        <div class="card-content p-0">
            <div class="media p-4 mb-0">
                <div class="media-left">
                <figure class="image is-48x48">
                    <img class="is-rounded" src="${post.user_picture}" alt="Placeholder image">
                </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">${post.post_name}</p>
                    <p class="subtitle is-6">@${post.user_name} ${post.user_firstname} <time datetime="2016-1-1">${post.post_date}</time></p>
                    
                </div>
            </div>
            <hr class="m-0"/>
            <div class="content p-4 mb-0 is-small">
                ${post.post_content}
                <p class="has-text-right">${owner && editButton} ${owner && deleteButton}</p>
                <details class="content mt-2">
                    <summary>Commentaire</summary>
                    <div class="pl-5">${comments}</div>
                </details>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item new-comment" onClick="replyPost(${post.post_pk_id})">Add comment</a>
                <a href="#" class="card-footer-item">${postLikes}</a>
            </footer>
        </div>
        
    </div>`;
}

const formatComment = (comment) => {
    let commentLikes = formatLikes(comment.likes,comment.comment_pk_id,'comment','small')
    return `<details>
                <summary>${comment.comment_name} from @${comment.user_name} ${comment.user_firstname} ${commentLikes} </summary>
                ${comment.comment_content}
            </details>`;
}

const formatLikes = (likes,id,type,size = 'normal') => {
    let like = likes ? likes.likes_likes : '';
    let disslike = like ? likes.likes_disslikes : '';
    if(size=='small'){
        return `<span>
                    <button id="like-${id}-${type}" class="has-text-success is-small" onClick="vote('like',${id},'${type}')">+ ${like}</button>
                    <button id="disslike-${id}-${type}" class="has-text-danger is-small" onClick="vote('disslike',${id},'${type}')">- ${disslike}</button>
                </span>`;
    }
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

    let result = await fetch(path + "/vote", {
        method: "POST",
        body: vote
    }).then(reponse => reponse.json())

    document.querySelector(`#like-${id}-${element}`).innerText = `+ ${result.total.likes_likes}`;
    document.querySelector(`#disslike-${id}-${element}`).innerText = `- ${result.total.likes_disslikes}`;
}

const replyPost = async (id) => {
    const content = await loadContent(path+ '/comment/form');
    const fragment = createFragment(content);

    displayModal("New comment",fragment,id);
}

const editPost = async (id) => {
    const content = await loadContent(path + '/post/form');
    const post = await loadJson(path +'/post/'+id);

    const fragment = createFragment(content);

    fragment.querySelector('.textarea').value = post.post.post_content;
    fragment.querySelector('.input-picture').remove();
    fragment.querySelector('.input-name').value = post.post.post_name;

    displayModal("Edit post",fragment,'edit/'+id);
}

const deletePost = async (id) => {
    console.log('Trying to delete post',id);
    let json = await fetch(path + "/post/" + id,{
        method: "DELETE"
    }).then(response => response.json());
    postsLoader.reset();
}

window.editPost = editPost;
window.deletePost = deletePost;
window.replyPost = replyPost;
window.vote = vote;