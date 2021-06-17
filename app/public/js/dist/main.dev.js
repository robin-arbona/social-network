"use strict";

console.log("Main lié");
var pathMain = $('#pathMain').val();
window.location.href.slice(-1);

function onSignIn(googleUser) {
  var auth = googleUser.getAuthResponse();
  var token = auth.id_token;
  setCookie("id_token", token, 120);
  $.ajax({
    url: pathMain + "/googleAuth",
    type: "POST",
    data: {
      id_token: token
    }
  }).done(function () {
    if (window.location.href.slice(-1) == '/') {
      window.location = pathMain + "/wall";
    }
  }).fail(function () {
    console.log("Fail");
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    auth2.disconnect();
    console.log('User signed out.');
    window.location = pathMain + "/";
  });
} // Navbar
// Get all "navbar-burger" elements


var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0); // Check if there are any navbar burgers

if ($navbarBurgers.length > 0) {
  // Add a click event on each of them
  $navbarBurgers.forEach(function (el) {
    el.addEventListener('click', function () {
      // Get the target from the "data-target" attribute
      var target = el.dataset.target;
      var $target = document.getElementById(target); // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
} // New post


document.querySelector('.new-post').addEventListener('click', function _callee() {
  var content;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(loadContent(pathMain + '/post/new/form'));

        case 2:
          content = _context.sent;
          displayModal("New post", content);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

var loadContent = function loadContent(url) {
  return fetch(url).then(function (reponse) {
    return reponse.text();
  });
};

var postContent = function postContent(formElement, url) {
  var form, json;
  return regeneratorRuntime.async(function postContent$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          form = new FormData(formElement);
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            body: form
          }).then(function (response) {
            return response.json();
          }));

        case 3:
          json = _context2.sent;
          return _context2.abrupt("return", json);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var displayModal = function displayModal(title, content) {
  var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  title & (document.querySelector("#modal-title").innerHTML = title);
  content & (document.querySelector("#modal-content").innerHTML = content);
  var form = document.querySelector(".form-modal");

  if (param != null) {
    form.setAttribute('action', form.getAttribute('action') + '/' + param);
  }

  content & form.addEventListener('submit', function _callee2(e) {
    var message, key, element;
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            e.preventDefault();
            _context3.next = 3;
            return regeneratorRuntime.awrap(postContent(this, pathMain + this.getAttribute('action')));

          case 3:
            result = _context3.sent;

            if (result.success) {
              closeModal(true);
            } else {
              message = result.message + ': ';

              for (key in result.errors) {
                element = result.errors[key];
                message += key + '-->' + element + '. ';
              }

              document.querySelector("#modal-footer").innerHTML = message;
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  document.querySelector(".delete").addEventListener('click', function () {
    closeModal(false);
  });
  document.querySelector(".modal").classList.toggle("is-active");
};

var closeModal = function closeModal(reload) {
  document.querySelector(".modal").classList.toggle("is-active");

  if (reload) {
    document.querySelector("#modal-title").innerHTML = "";
    document.querySelector("#modal-content").innerHTML = "";
    removeAllChildNodes(document.querySelector('.post'));
    pageLoader = new PageLoader(path + '/post', param, target);
  }
};

var removeAllChildNodes = function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function setCookie(cname, cvalue, exmins) {
  var d = new Date();
  d.setTime(d.getTime() + exmins * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}