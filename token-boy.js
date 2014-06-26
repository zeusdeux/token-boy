var crypto = require('crypto');
var debug = require('debug')('token-boy');

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

  //if no defaultEncoding is given then it fallsback to base64
  defaultEncoding = defaultEncoding || 'base64';

  if (!validDigests[defaultEncoding]) throw new Error('token-boy: Invalid defaultEncoding. Valid values: hex, binary, base64');

  return function tokenBoy(bits, encoding, digest) {
    var res = {};
    var token;
    var buf;

    //smart defaults
    var _bits = parseInt(bits, 10) || 128;
    var _digest = true;
    //defaultEncoding is base64 or whatever you passed to the outer fn

    debug('default encoding: %s', defaultEncoding);

    if (digest === '0' || digest === 'false') _digest = false;

    debug('bits: %s', _bits);
    res.bits = _bits;

    try {
      buf = crypto.randomBytes(parseInt(_bits, 10));
      if (_digest) {
        encoding = !! validDigests[encoding] ? encoding : defaultEncoding;
        debug('digest encoding: %s', encoding);
        res.encoding = encoding;
        res.digested = true;
        token = crypto.createHmac('SHA1', buf).update(new Date().toString()).digest(encoding);
      }
      else {
        encoding = !! validEncodings[encoding] ? encoding : defaultEncoding;
        res.encoding = encoding;
        res.digested = false;
        token = buf.toString(encoding);
      }
    }
    catch (e) {
      throw e;
    }
    debug('encoding: %s', encoding);
    res.token = token;
    debug('result: %o', res);
    return res;
  };
};
