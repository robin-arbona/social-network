"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cookie = require("./cookie.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chat =
/*#__PURE__*/
function () {
  function Chat(options) {
    _classCallCheck(this, Chat);

    this.state = {
      userList: [],
      mainChat: [],
      room: {}
    };
    this.connect(options.url);
    this.userListEl = options.userListEl;
    this.inputEl = options.inputEl;
    this.displayEl = options.displayEl;
    this.initialiseSocket();
    this.initialiseChatForm();
  }

  _createClass(Chat, [{
    key: "connect",
    value: function connect(url) {
      this.socket = io(url);
      this.socket.emit('identification', (0, _cookie.getCookie)('id_token'));
    }
  }, {
    key: "initialiseSocket",
    value: function initialiseSocket() {
      var _this = this;

      this.socket.on('chat message', function (msg) {
        var newState = {
          mainChat: [].concat(_toConsumableArray(_this.getState().mainChat), [msg])
        };

        _this.setState(newState);

        _this.updateMessage(msg);
      });
      this.socket.on('private message', function (objMsg) {
        var msg = objMsg.message;
        var userName = objMsg.from.userName.split(' ').join('_').toLowerCase();
        var tab = document.querySelector('#tab-' + userName);

        if (!tab) {
          createNewPrivateChat(objMsg.from.userName, false);
        } else {
          notify(tab);
        }

        var room = {};

        if (typeof _this.getState().room[userName] !== 'undefined') {
          room[userName] = [].concat(_toConsumableArray(_this.getState().room[userName]), [msg]);
        } else {
          room[userName] = [msg];
        }

        _this.updateMessage(msg, document.querySelector('#chat-' + userName));

        _this.setState({
          room: room
        });
      });
      this.socket.on('user list', function (list) {
        _this.setState({
          userList: list
        });

        _this.updateUserList(_this.getState());
      });
    }
  }, {
    key: "setState",
    value: function setState(newState) {
      this.state = Object.assign(this.getState(), newState);
      this.onStateChanges(this.getState());
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "onStateChanges",
    value: function onStateChanges(state) {//console.log(state);
    }
  }, {
    key: "updateMessage",
    value: function updateMessage(msg) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.displayEl;
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
      element.innerHTML += "<p class=\"has-text-".concat(position, "\">").concat(msg, "</p>");

      if (element.id === 'chat-main') {
        notify(document.querySelector('#tab-main'));
      }
    }
  }, {
    key: "updateUserList",
    value: function updateUserList(state) {
      if (state.userList.length <= 0) {
        return;
      }

      var list = state.userList.map(function (user) {
        return formatUser(user);
      }).join('');
      this.userListEl.innerHTML = list;
      document.querySelectorAll('.user-item').forEach(initiateUserItem.bind(this));
    }
  }, {
    key: "initialiseChatForm",
    value: function initialiseChatForm() {
      var _this2 = this;

      this.inputEl.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = document.querySelector("#".concat(_this2.inputEl.id, " #chat-input"));

        _this2.sendMessage(input.value);

        input.value = '';
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(msg) {
      var to = document.querySelector(".panel-tabs > a.is-active").innerText;

      if (to == "Main") {
        this.socket.emit('chat message', msg);
      } else {
        var obj = {
          to: {
            userName: to
          },
          message: msg
        };
        this.socket.emit('private message', obj);
        var chatWindow = document.querySelector('#chat-' + to.split(' ').join('_').toLowerCase());
        this.updateMessage(msg, chatWindow, 'right');
      }
    }
  }]);

  return Chat;
}();

exports["default"] = Chat;

var initiateUserItem = function initiateUserItem(user) {
  var callback = function callback(e) {
    var userName = e.target.innerText;
    var tabId = '#tab-' + userName.split(' ').join('_').toLowerCase();

    if (!document.querySelector(tabId)) {
      createNewPrivateChat(user.innerText, true);
    }
  };

  user.removeEventListener('click', callback.bind(this));
  user.addEventListener('click', callback.bind(this));
};

var createNewPrivateChat = function createNewPrivateChat(user, selected) {
  var newTab = document.createElement("a");
  newTab.innerText = user;
  newTab.id = 'tab-' + user.split(' ').join('_').toLowerCase();
  document.querySelector(".panel-chat").appendChild(newTab);
  var chatWindow = document.createElement("div");
  chatWindow.classList.add('chat-message');
  chatWindow.id = 'chat-' + user.split(' ').join('_').toLowerCase();
  chatWindow.style = "display:none";
  document.querySelector(".chat-place-holder").appendChild(chatWindow);

  if (selected) {
    select(newTab);
  } else {
    notify(newTab);
  }

  initTabNavigation();
};

var initTabNavigation = function initTabNavigation() {
  var tabs = document.querySelectorAll(".panel-tabs > a").forEach(function (tab) {
    tab.addEventListener('click', function () {
      select(this);
    });
  });
};

var notify = function notify(tab) {
  if (!tab.classList.contains('is-active')) {
    tab.classList.add('notify');
  }
};

var select = function select(tab) {
  var activeEl = document.querySelector(".panel-tabs > a.is-active");
  activeEl.classList.remove('is-active');
  document.querySelector('#' + activeEl.id.replace('tab-', 'chat-')).style = "display:none";
  tab.classList.add("is-active");
  tab.classList.remove('notify');
  document.querySelector('#' + tab.id.replace('tab-', 'chat-')).style = "display:block";
};

var formatUser = function formatUser(user) {
  return "\n    <a class=\"panel-block is-active user-item\">".concat(user, "</a>");
};