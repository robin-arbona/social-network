class Chat {
    constructor(url,userListElement){
        this.state = {
            userList : [],
            mainChat : [],
            room : {}
        };
        this.connect(url);
        this.userListElement = userListElement;
        this.initialiseSocket();
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
    }
    updateUserList(state){
        if(state.userList.length <= 0){
            return;
        }
        console.log(state.userList);
        let list = state.userList.map(user=>formatUser(user)).join('')
        this.userListElement.innerHTML = list;
    }
    sendMessage(msg){
        this.socket.emit('chat message', msg)
    }
}

let userListElement = document.querySelector('.chat-user-list')
var chat = new Chat("social.network:3001",userListElement)

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