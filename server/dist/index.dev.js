"use strict";

var httpServer = require("http").createServer();

var hostname = 'social.network';
var port = 3001;

var io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

var googleAuth = require('./googleAuth');

var userList = [];

var id = function id() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

io.on('connection', function (socket) {
  var newUser = null;
  socket.join(socket.id);
  socket.on('identification', function (msg) {
    googleAuth.verify(msg).then(function (payload) {
      newUser = {
        id: socket.id,
        name: payload.name
      };

      if (isNewUser(newUser, userList) == false) {
        userList.push(newUser);
        io.emit('chat message', newUser.name + ' has joined the room');
      }

      io.emit('user list', extractUsersName(userList));
    })["catch"](console.error('Authentification failed'));
  });
  socket.on('chat message', function (msg) {
    if (newUser) {
      console.log('room: general | user: ' + newUser.name + ' | message: ' + msg);
      io.emit('chat message', newUser.name + ': ' + msg);
    }
  });
  socket.on('user list', function (msg) {
    io.emit('user list', extractUsersName(userList));
  });
  socket.on('private message', function (object) {
    object.from = {};
    object.to.id = userMatchingId(object.to.userName, userList);
    object.from.id = socket.id;
    object.from.userName = usermatchingName(socket.id, userList);
    console.log(object);
    console.log(userList);
    io.to(object.to.id).emit('private message', object);
  });
  socket.on('disconnect', function () {
    console.log('before filter', userList);

    if (!newUser) {
      newUser = {};
      newUser.name = "undefined";
    }

    console.log('user to delete', newUser);
    userList = userList.filter(function (item) {
      return item.name !== newUser.name;
    });
    console.log('after filter', userList);
    io.emit('user list', extractUsersName(userList));
    io.emit('chat message', newUser.name + ' has left the room');
    console.log('user disconnected');
    socket.removeAllListeners();
  });
});
httpServer.listen(port, hostname, function () {
  console.log("Server running at http://".concat(hostname, ":").concat(port, "/"));
});

var extractUsersName = function extractUsersName(userList) {
  names = [];
  userList.forEach(function (user) {
    names.push(user.name);
  });
  return names;
};

var isNewUser = function isNewUser(user2check, userList) {
  var userFound = false;
  userList.every(function (user) {
    if (user.name == user2check.name) {
      userFound = true;
      return false;
    }

    return true;
  });
  return userFound;
};

var userMatchingId = function userMatchingId(user2check, userList) {
  var matchingId = null;
  userList.forEach(function (user) {
    console.log("".concat(user.name, " == ").concat(user2check, " ==> ").concat(user.name == user2check, " "));

    if (user.name == user2check) {
      matchingId = user.id;
    }
  });
  return matchingId;
};

var usermatchingName = function usermatchingName(id2check, userList) {
  var matchingName = null;
  userList.forEach(function (user) {
    if (user.id == id2check) {
      matchingName = user.name;
    }
  });
  return matchingName;
};