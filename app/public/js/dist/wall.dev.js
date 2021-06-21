"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PageLoader =
/*#__PURE__*/
function () {
  function PageLoader(APIEntryPoint) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var target = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, PageLoader);

    this.entryPoint = APIEntryPoint;
    this.param = param;
    this.target = target;
    this.currentPage = 1;
    this.totalPage = 1;
    this.initIntersectionObserver();
  }

  _createClass(PageLoader, [{
    key: "initIntersectionObserver",
    value: function initIntersectionObserver() {
      var options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };

      var callback = function callback(entries, observer) {
        var _this = this;

        entries.forEach(function (entry) {
          if (entry.intersectionRatio == 1) {
            _this.setTargetMsg('Loading..');

            _this.loadContent();
          }
        });
      };

      this.observer = new IntersectionObserver(callback.bind(this), options);
      this.observer.observe(this.target);
    }
  }, {
    key: "setTargetMsg",
    value: function setTargetMsg(msg) {
      document.querySelector('#loadContent').innerHTML = msg;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      var url = this.entryPoint + '/' + this.currentPage;
      return this.param == null ? url : url + '/' + this.param;
    }
  }, {
    key: "loadContent",
    value: function loadContent() {
      var results;
      return regeneratorRuntime.async(function loadContent$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.currentPage <= this.totalPage)) {
                _context.next = 10;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(this.fetchJson(this.getUrl()));

            case 3:
              results = _context.sent;
              this.totalPage = results.totalPage;
              this.displayResults(results.posts);
              this.currentPage = this.currentPage + 1;
              this.setTargetMsg('Loaded');
              _context.next = 12;
              break;

            case 10:
              this.setTargetMsg('Nothing more to load');
              this.observer.disconnect();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "fetchJson",
    value: function fetchJson(url) {
      var json;
      return regeneratorRuntime.async(function fetchJson$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(fetch(url).then(function (reponse) {
                return reponse.json();
              }).then(function (json) {
                return json;
              }));

            case 2:
              json = _context2.sent;
              return _context2.abrupt("return", json);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "displayResults",
    value: function displayResults(results) {
      results.forEach(function (result) {
        var postElement = document.createElement("div");
        postElement.innerHTML = formatPost(result);
        document.querySelector(".post").appendChild(postElement);
      });
    }
  }]);

  return PageLoader;
}();

var path = document.querySelector('#pathMain').getAttribute('value');
var urlParsed = window.location.pathname.split('/');
var param = urlParsed[urlParsed.indexOf('wall') + 1] != undefined ? urlParsed[urlParsed.indexOf('wall') + 1] : null;
var target = document.querySelector('#loadContent');
var pageLoader = new PageLoader(path + '/post', param, target);

var formatPost = function formatPost(post) {
  var comments = post.comments.length > 0 ? post.comments.map(function (comment) {
    return formatComment(comment);
  }).join('') : '<div>no comment</div>';
  var postLikes = formatLikes(post.likes, post.post_pk_id, "post");
  return "\n    <div class=\"card mb-6\">\n        <div class=\"card-content p-0\">\n            <div class=\"media p-4 mb-0\">\n                <div class=\"media-left\">\n                <figure class=\"image is-48x48\">\n                    <img class=\"is-rounded\" src=\"".concat(post.user_picture, "\" alt=\"Placeholder image\">\n                </figure>\n                </div>\n                <div class=\"media-content\">\n                    <p class=\"title is-4\">").concat(post.post_name, "</p>\n                    <p class=\"subtitle is-6\">@").concat(post.user_name, " ").concat(post.user_firstname, " <time datetime=\"2016-1-1\">").concat(post.post_date, "</time></p>\n                    \n                </div>\n            </div>\n            <hr class=\"m-0\"/>\n            <div class=\"content p-4 mb-0 is-small\">\n                ").concat(post.post_content, "\n                <br />\n                <details class=\"content mt-2\">\n                    <summary>Commentaire</summary>\n                    <div class=\"pl-5\">").concat(comments, "</div>\n                </details>\n            </div>\n            <footer class=\"card-footer\">\n                <a href=\"#\" class=\"card-footer-item new-comment\" onClick=\"reply(").concat(post.post_pk_id, ")\">Add comment</a>\n                <a href=\"#\" class=\"card-footer-item\">").concat(postLikes, "</a>\n            </footer>\n        </div>\n        \n    </div>");
};

var formatComment = function formatComment(comment) {
  var commentLikes = formatLikes(comment.likes, comment.comment_pk_id, 'comment', 'small');
  return "<details>\n                <summary>".concat(comment.comment_name, " from @").concat(comment.user_name, " ").concat(comment.user_firstname, " ").concat(commentLikes, " </summary>\n                ").concat(comment.comment_content, "\n            </details>");
};

var formatLikes = function formatLikes(likes, id, type) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'normal';
  var like = likes ? likes.likes_likes : '';
  var disslike = like ? likes.likes_disslikes : '';

  if (size == 'small') {
    return "<span>\n                    <button id=\"like-".concat(id, "-").concat(type, "\" class=\"has-text-success is-small\" onClick=\"vote('like',").concat(id, ",'").concat(type, "')\">+ ").concat(like, "</button>\n                    <button id=\"disslike-").concat(id, "-").concat(type, "\" class=\"has-text-danger is-small\" onClick=\"vote('disslike',").concat(id, ",'").concat(type, "')\">- ").concat(disslike, "</button>\n                </span>");
  }

  return "<span>\n                <button id=\"like-".concat(id, "-").concat(type, "\" class=\"button is-success is-small is-rounded\" onClick=\"vote('like',").concat(id, ",'").concat(type, "')\">+ ").concat(like, "</button>\n                <button id=\"disslike-").concat(id, "-").concat(type, "\" class=\"button is-danger is-small is-rounded\" onClick=\"vote('disslike',").concat(id, ",'").concat(type, "')\">- ").concat(disslike, "</button>\n            </span>");
};

var vote = function vote(type, id, element) {
  var vote, result;
  return regeneratorRuntime.async(function vote$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          vote = new FormData();
          vote.append("type", type);
          vote.append("id", id);
          vote.append("element", element);
          _context3.next = 6;
          return regeneratorRuntime.awrap(fetch("/vote", {
            method: "POST",
            body: vote
          }).then(function (reponse) {
            return reponse.json();
          }));

        case 6:
          result = _context3.sent;
          document.querySelector("#like-".concat(id, "-").concat(element)).innerText = "+ ".concat(result.total.likes_likes);
          document.querySelector("#disslike-".concat(id, "-").concat(element)).innerText = "- ".concat(result.total.likes_disslikes);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var reply = function reply(id) {
  var content;
  return regeneratorRuntime.async(function reply$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(loadContent(pathMain + '/comment/form'));

        case 2:
          content = _context4.sent;
          displayModal("New comment", content, id);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};