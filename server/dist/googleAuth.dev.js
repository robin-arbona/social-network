"use strict";

var _require = require('google-auth-library'),
    OAuth2Client = _require.OAuth2Client;

var CLIENT_ID = '779360460594-5hbuevfqve7uur0a2ds2284se901qf2l.apps.googleusercontent.com';
var client = new OAuth2Client(CLIENT_ID);
var googleAuth = {};

googleAuth.verify = function _callee(client_token) {
  var ticket, payload;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: client_token,
            audience: CLIENT_ID
          })["catch"](function (error) {
            console.log(error, 'Veriy failed');
          }));

        case 2:
          ticket = _context.sent;
          payload = ticket.getPayload();
          return _context.abrupt("return", payload);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = googleAuth;