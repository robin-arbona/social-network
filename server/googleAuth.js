const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '779360460594-5hbuevfqve7uur0a2ds2284se901qf2l.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

let googleAuth = {};

googleAuth.verify =  async (client_token) => {
  const ticket = await client.verifyIdToken({
      idToken: client_token,
      audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = googleAuth;