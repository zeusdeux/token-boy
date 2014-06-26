var crypto = require('crypto');

module.exports = function(bits, digest) {
  var token;
  var buf;
  try {
    buf = crypto.randomBytes(parseInt(bits, 10));
    if (digest === 'true' || digest === '1') token = crypto.createHmac('SHA1', buf.toString('base64')).update((new Date()).toString()).digest('base64');
    else token = buf.toString('base64');
  }
  catch (e) {
    throw e;
  }
  return token;
};
