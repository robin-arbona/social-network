import Chat from "./component/chat.js";
import navbar from "./component/navbar.js";
import PostsLoader  from "./component/postsLoader.js";
import MemberList from "./component/memberList.js";
import { loadContent } from "./lib/tools.js";
import { displayModal, initModal } from "./component/modal.js";

// Initialisation
const path = document.querySelector('#pathMain').value;
const urlParsed = window.location.pathname.split('/');
initModal();

// Chat
if(document.querySelector('.chat-message')){
    const chatInit = {
        url: "social.network:3001",
        userListEl: document.querySelector('.chat-user-list'),
        inputEl: document.querySelector('#chat-form'),
        displayEl: document.querySelector('.chat-message')
    };
    
    const chat = new Chat(chatInit);
}

// Navbar initialisation
navbar.init();

// New post button initialisation
if(document.querySelector('.new-post')){

    document.querySelector('.new-post').addEventListener('click',async ()=>{
        let content = await loadContent(path + '/post/form');
        displayModal("New post",content);
    })

}

// Wall
if(urlParsed.indexOf('wall')){

    const loaderInit = {
        path: path+'/posts',
        param: urlParsed[urlParsed.indexOf('wall')+1] != undefined ? urlParsed[urlParsed.indexOf('wall')+1] : null,
        target: document.querySelector('#loadContent')
    };

    const postsLoader = new PostsLoader(loaderInit);
    window.postsLoader = postsLoader;
}

// Member List
if(document.querySelector('#members-list')){
    const membersInit = {
        path,
        rootEl: document.querySelector('#members-list')
    };

    const members = new MemberList(membersInit);
}

