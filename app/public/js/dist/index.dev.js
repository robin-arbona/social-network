"use strict";

var _chat = _interopRequireDefault(require("./chat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initialisation
console.log();
var pathMain = document.querySelector('#pathMain').value; // Google auth

function onSignIn(googleUser) {
  var auth, token, response;
  return regeneratorRuntime.async(function onSignIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('yo');
          auth = googleUser.getAuthResponse();
          token = auth.id_token;
          setCookie("id_token", token, 120);
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(pathMain + "/googleAuth", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_token: token
            })
          }));

        case 6:
          response = _context.sent;

          if (response.ok) {
            if (window.location.href.slice(-1) == '/') {
              window.location = pathMain + "/wall";
            }
          } else {
            console.error('Connexion failed', response);
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    auth2.disconnect();
    console.log('User signed out.');
    window.location = pathMain + "/";
  });
} // Chat


if (document.querySelector('.chat-message')) {
  var chatInit = {
    url: "social.network:3001",
    userListEl: document.querySelector('.chat-user-list'),
    inputEl: document.querySelector('#chat-form'),
    displayEl: document.querySelector('.chat-message')
  };
  var chat = new _chat["default"](chatInit);
}