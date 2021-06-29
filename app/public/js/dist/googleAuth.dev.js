"use strict";

function onSignIn(googleUser) {
  var auth, token, path, response;
  return regeneratorRuntime.async(function onSignIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          auth = googleUser.getAuthResponse();
          token = auth.id_token;
          setCookie("id_token", token, 120);
          path = document.querySelector('#pathMain').value;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(path + "/googleAuth", {
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
              window.location = path + "/wall";
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
}

function setCookie(cname, cvalue, exmins) {
  var d = new Date();
  d.setTime(d.getTime() + exmins * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}