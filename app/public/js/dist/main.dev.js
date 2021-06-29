"use strict";

var _test = require("./test.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pathMain = document.querySelector('#pathMain').value;

function onSignIn(googleUser) {
  var auth, token, response;
  return regeneratorRuntime.async(function onSignIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          auth = googleUser.getAuthResponse();
          token = auth.id_token;
          setCookie("id_token", token, 120);
          _context.next = 5;
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

        case 5:
          response = _context.sent;

          if (response.ok) {
            if (window.location.href.slice(-1) == '/') {
              window.location = pathMain + "/wall";
            }
          } else {
            console.error('Connexion failed', response);
          }

        case 7:
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


if (document.querySelector('.new-post')) {
  document.querySelector('.new-post').addEventListener('click', function _callee() {
    var content;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(loadContent(pathMain + '/post/new/form'));

          case 2:
            content = _context2.sent;
            displayModal("New post", content);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

var loadContent = function loadContent(url) {
  return fetch(url).then(function (reponse) {
    return reponse.text();
  });
};

var postContent = function postContent(formElement, url) {
  var form, json;
  return regeneratorRuntime.async(function postContent$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          form = new FormData(formElement);
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            body: form
          }).then(function (response) {
            return response.json();
          }));

        case 3:
          json = _context3.sent;
          return _context3.abrupt("return", json);

        case 5:
        case "end":
          return _context3.stop();
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
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            e.preventDefault();
            _context4.next = 3;
            return regeneratorRuntime.awrap(postContent(this, pathMain + this.getAttribute('action')));

          case 3:
            result = _context4.sent;

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
            return _context4.stop();
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
} // Members List


var MemberList =
/*#__PURE__*/
function () {
  function MemberList(el) {
    _classCallCheck(this, MemberList);

    this.rootEl = el;
    this.getList();
  }

  _createClass(MemberList, [{
    key: "getList",
    value: function getList() {
      var _this = this;

      return regeneratorRuntime.async(function getList$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log(pathMain);
              _context5.next = 3;
              return regeneratorRuntime.awrap(fetch(pathMain + '/users').then(function (r) {
                return r.json();
              }));

            case 3:
              this.members = _context5.sent;
              this.members.data.forEach(function (member) {
                return _this.displayMember(member);
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "displayMember",
    value: function displayMember(member) {
      console.log(member);
      var newEl = document.createElement('div');
      newEl.innerHTML = this.formatMember(member);
      this.rootEl.appendChild(newEl);
    }
  }, {
    key: "formatMember",
    value: function formatMember(member) {
      return "\n        <div class=\"media m-2\">\n            <div class=\"media-content\">\n                <a href=\"".concat(pathMain, "/wall/").concat(member.user_pk_id, "\"><p  class=\"title has-text-right is-5\">").concat(member.user_firstname, "<br /><span class=\"is-uppercase\">").concat(member.user_name, "</span></p></a>\n                <p class=\"subtitle has-text-right is-7\">").concat(member.user_mail, "</p>\n            </div>\n            <div class=\"media-left is-vcentered\">\n                <figure class=\"image is-48x48\">\n                    <img class=\"is-rounded\" src=\"").concat(member.user_picture, "\" alt=\"Placeholder image\">\n                </figure>\n            </div>\n        </div>\n        <hr />");
    }
  }]);

  return MemberList;
}();

if (document.querySelector('#members-list')) {
  var members = new MemberList(document.querySelector('#members-list'));
}