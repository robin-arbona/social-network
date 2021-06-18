class Chat {
    constructor(options){
        this.state = {
            userList : [],
            mainChat : [],
            room : {}
        };
        this.connect(options.url);
        this.userListEl = options.userListEl;
        this.inputEl = options.inputEl;
        this.displayEl =options.displayEl;
        this.initialiseSocket();
        this.initialiseChatForm()
    }
    connect(url){
        this.socket = io(url);
        this.socket.emit('identification', getCookie('id_token'));
    }
    initialiseSocket(){
        this.socket.on('chat message', (msg) => {    
            let newState = {
                mainChat : [...this.getState().mainChat, msg]
            }
            this.setState(newState);
            this.updateMessage(msg)
        }) 
        this.socket.on('private message', (objMsg) => {    
            let msg = objMsg.message
            let userName = objMsg.from.userName.split(' ').join('_').toLowerCase()
            let tab = document.querySelector('#tab-'+userName)
            if(!tab){
                createNewPrivateChat(objMsg.from.userName,false)
            } else {
                notify(tab)
            }
            
            let room = {}
            if(typeof this.getState().room[userName] !== 'undefined'){
                room[userName] = [...this.getState().room[userName],  msg]
            } else {
                room[userName] = [msg]
            }
            this.updateMessage(msg,document.querySelector('#chat-' + userName))
            this.setState({room});
        }) 
        this.socket.on('user list', (list) => {   
            this.setState({
                userList:list
            } );
            this.updateUserList(this.getState());
        })
    }
    setState(newState){
        this.state = Object.assign(this.getState(), newState);
        this.onStateChanges(this.getState());
    }
    getState(){
        return this.state
    }
    onStateChanges(state){
        console.log(state);
    }
    updateMessage(msg,element = this.displayEl, position = 'left'){
        element.innerHTML +=  `<p class="has-text-${position}">${msg}</p>`;
        if(element.id === 'chat-main'){
            notify(document.querySelector('#tab-main'))
        }
    }
    updateUserList(state){
        if(state.userList.length <= 0){
            return;
        }
        let list = state.userList.map(user=>formatUser(user)).join('')
        this.userListEl.innerHTML = list;
        document.querySelectorAll('.user-item').forEach(initiateUserItem.bind(this))
    }
    initialiseChatForm(){
        this.inputEl.addEventListener('submit',(e)=>{
            e.preventDefault();
            this.sendMessage(this.inputEl.firstElementChild.value);
            this.inputEl.firstElementChild.value = '';
        })
    }
    sendMessage(msg){
        let to = document.querySelector(".panel-tabs > a.is-active").innerText
        if(to == "Main"){
            this.socket.emit('chat message', msg)
        } else {
            let obj = {
                to : {
                    userName : to
                },
                message : msg
            }
            this.socket.emit('private message', obj)
            let chatWindow = document.querySelector('#chat-'+to.split(' ').join('_').toLowerCase());
            this.updateMessage(msg,chatWindow,'right')

        }
    }
}

const initiateUserItem = function(user){
    let callback = function(e){
        let userName = e.target.innerText;
        let tabId = '#tab-'+ userName.split(' ').join('_').toLowerCase()
        if(!document.querySelector(tabId)){
            createNewPrivateChat(user.innerText,true)
        }
    }
    user.removeEventListener('click',callback.bind(this))
    user.addEventListener('click',callback.bind(this))
}

const createNewPrivateChat = function(user,selected){
    let newTab = document.createElement("a");
    newTab.innerText= user;
    newTab.id = 'tab-'+ user.split(' ').join('_').toLowerCase(); 
    document.querySelector(".panel-chat").appendChild(newTab);

    let chatWindow = document.createElement("div");
    chatWindow.classList.add('chat-message');
    chatWindow.id = 'chat-'+ user.split(' ').join('_').toLowerCase(); 
    chatWindow.style="display:none";
    document.querySelector(".chat-place-holder").appendChild(chatWindow);

    if(selected){
        select(newTab)
    } else {
        notify(newTab)
    }

    initTabNavigation()
}

const initTabNavigation = ()=>{
    let tabs = document.querySelectorAll(".panel-tabs > a").forEach((tab)=>{
        tab.addEventListener('click',function(){
            select(this)
        })
    }) 
}

const notify = (tab)=>{
    console.log('New message',tab)
    if(!tab.classList.contains('is-active')){
        tab.classList.add('notify')
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const select = (tab) =>{
    let activeEl = document.querySelector(".panel-tabs > a.is-active")
    activeEl.classList.remove('is-active');
    document.querySelector('#'+activeEl.id.replace('tab-','chat-')).style="display:none";

    tab.classList.add("is-active");
    tab.classList.remove('notify');
    document.querySelector('#'+tab.id.replace('tab-','chat-')).style="display:block";
}

let chatInit = {
    url: "social.network:3001",
    userListEl: document.querySelector('.chat-user-list'),
    inputEl: document.querySelector('#chat-form'),
    displayEl: document.querySelector('.chat-message')
}

var chat = new Chat(chatInit)

const formatUser = (user) => {
    return `
    <a class="panel-block is-active user-item">${user}</a>`;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


