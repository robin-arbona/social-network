const httpServer = require("http").createServer();
const hostname = 'social.network';
const port = 3001;
const io = require("socket.io")(httpServer, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const googleAuth = require('./googleAuth')
let userList = [];
let id = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

io.on('connection', (socket) => {
    let newUser = null;

    socket.join(socket.id);

    socket.on('identification', async function(id_token){
      let payload = await googleAuth.verify(id_token)

      if(payload){
        newUser = {
          id: socket.id, 
          name: payload.name
        };
        if(isNewUser(newUser,userList) == false){
          userList.push(newUser)
          io.emit('chat message', newUser.name + ' has joined the room');
        }
        io.emit('user list', extractUsersName(userList));
      } else {
        console.error('Authentification failed',id_token)
      }
  
    })

    socket.on('chat message', (msg) => {
      if(newUser){
        console.log('room: general | user: ' + newUser.name + ' | message: ' + msg);
        io.emit('chat message', newUser.name +': ' + msg) 
      }
      });

    socket.on('user list', (msg) => {
      io.emit('user list', extractUsersName(userList));
    });

    socket.on('private message',(object)=>{
      object.from = {};
      object.to.id = userMatchingId(object.to.userName,userList);
      object.from.id = socket.id;
      object.from.userName = usermatchingName(socket.id,userList);
      console.log(object)
      console.log(userList)
      io.to(object.to.id).emit('private message', object);
    })

    socket.on('disconnect', () => {
      console.log('before filter',userList);
      if(!newUser){
        newUser={}
        newUser.name = "undefined"
      }
      console.log('user to delete', newUser)
      userList = userList.filter(item => item.name !== newUser.name );
      console.log('after filter',userList);
  
      io.emit('user list', extractUsersName(userList));
      io.emit('chat message', newUser.name + ' has left the room');
      console.log('user disconnected');
      socket.removeAllListeners();
    });
});

httpServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const extractUsersName = (userList) => {
  names=[];
  userList.forEach(user=>{
    names.push(user.name)
  })
  return names
}

const isNewUser= (user2check,userList) => {
  let userFound = false;
  userList.every(user => {
    if(user.name == user2check.name){
      userFound = true;
      return false;
    }
    return true;
  })
  return userFound;
}

const userMatchingId = (user2check,userList) => {
  let matchingId = null
  userList.forEach(user => {
    console.log(`${user.name} == ${user2check} ==> ${user.name == user2check} `)
    if(user.name == user2check){
      matchingId = user.id
    }
  })
  return matchingId
}

const usermatchingName = (id2check,userList) => {
  let matchingName = null
  userList.forEach(user => {
    if(user.id == id2check){
      matchingName = user.name
    }
  })
  return matchingName
}
