var crypto = require('crypto');

module.exports = function(defaultEncoding) {
  //as per node 0.10.29 docs
  var validDigests = {
    'hex': true,
    'binary': true,
    'base64': true
  };
  var validEncodings = {
    'ascii': true,
    'utf8': true,
    'utf16le': true,
    'ucs2': true,
    'base64': true,
    'binary': true,
    'hex': true
  };

  //if no defaultEncoding is given then it falls back to base64
  defaultEncoding = defaultEncoding || 'base64';

  if (!validDigests[defaultEncoding]) throw new Error('token-boy: Invalid defaultEncoding. Valid values: hex, binary, base64');

  return function tokenBoy(bits, encoding, digest) {
    var res = {};
    var token;
    var buf;

    //smart-ish defaults
    var _bits = parseInt(bits, 10) || 128;
    var _digest = true;

    //defaultEncoding is base64 or whatever you passed while requiring
    if (typeof digest !== 'undefined' && digest !== null && (digest.toString() === '0' || digest.toString() === 'false')) _digest = false;

    res.bits = _bits;

    try {
      buf = crypto.randomBytes(parseInt(_bits, 10));
      if (_digest) {
        encoding = !!validDigests[encoding] ? encoding : defaultEncoding;
        res.encoding = encoding;
        res.digested = true;
        token = crypto.createHmac('sha1', buf).update(new Date().toString()).digest(encoding);
      }
      else {
        encoding = !!validEncodings[encoding] ? encoding : defaultEncoding;
        res.encoding = encoding;
        res.digested = false;
        token = buf.toString(encoding);
      }
    }
    catch (e) {
      throw e;
    }
    res.token = token;
    return res;
  };
};
