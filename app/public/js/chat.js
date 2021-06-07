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
        //socket.emit('initiate private chat',e.target.innerText)
    }
    connect(url){
        this.socket = io(url);
        this.socket.emit('identification', getCookie('id_token'));
    }
    initialiseSocket(){
        this.socket.on('chat message', (msg) => {    
            console.log(msg);
            let newState = {
                mainChat : [...this.getState().mainChat, msg]
            }
            this.setState(newState);
        }) 
        //this.socket.on('please join room', (roomId) => {    
        //    console.log(roomId)
        //}) 
        this.socket.on('user list', (list) => {   
            let newState = {
                userList:list
            } 
            this.setState(newState);
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
        this.updateUserList(state);
        this.updateMessage(state)
    }
    updateMessage(state){
        this.displayEl.innerHTML = state.mainChat.map(msg=>`<p>${msg}</p>`).join(' ');
    }
    updateUserList(state){
        if(state.userList.length <= 0){
            return;
        }
        console.log(state.userList);
        let list = state.userList.map(user=>formatUser(user)).join('')
        this.userListEl.innerHTML = list;
    }
    initialiseChatForm(){
        this.inputEl.addEventListener('submit',(e)=>{
            e.preventDefault();
            this.sendMessage(this.inputEl.firstElementChild.value);
            this.inputEl.firstElementChild.value = '';
        })
    }
    sendMessage(msg){
        this.socket.emit('chat message', msg)
    }
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
    <a class="panel-block is-active">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      ${user}
    </a>`;
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