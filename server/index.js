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
    console.log('a user connected')
    console.log(userList)
    console.log(socket.id)

    socket.on('identification', (msg)=>{
      googleAuth.verify(msg)
        .then((payload)=>{
          newUser = {
            id: socket.id, 
            name: payload.name
          };
          if(isNewUser(newUser,userList) == false){
            console.log('user added')
            userList.push(newUser)
            io.emit('chat message', newUser.name + ' has joined the room');
          }
          io.emit('user list', extractUsersName(userList));
        })
        .catch(console.error);
    })

    socket.on('chat message', (msg) => {
      if(newUser){
        console.log('room: general | user: ' + newUser.name +'| message: ' + msg);
        io.emit('chat message', newUser.name +': ' + msg) 
      }
      });

    socket.on('user list', (msg) => {
      io.emit('user list', extractUsersName(userList));
    });

    socket.on('initiate private chat', (userName) => {
      let roomId = id()
      socket.join(`room ${roomId}`);
      console.log(`initiate private chat from ${newUser.name} to ${userName} socket ${userMatchingId(userName,userList)} in room ${roomId}`)
      socket.to(userMatchingId(userName,userList)).emit('please join room', roomId);
    })

    socket.on('say to someone', (id,msg) => {
      if(newUser){
        console.log('room: '+ id +' | user: ' + newUser +'| message: ' + msg);
        socket.to(id).emit("my message", msg);
      }
    });

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
