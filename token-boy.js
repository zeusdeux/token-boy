var crypto = require('crypto');
var url = require('url');

function parseURL(req) {
  var parsedUrl = url.parse(req.url, true);
  for (var k in parsedUrl)
    if (parsedUrl.hasOwnProperty(k))
      req[k] = parsedUrl[k];
  return true;
}

function errBoy(e, status, req, res) {
  var codes = {};
  var headers = {};

  codes['404'] = '404: /' + req.method + ' ' + req.url + ' not found.';
  headers['404'] = function() {
    res.writeHead(404, {
      'Content-Length': codes[status].length,
      'Content-Type': 'text/plain'
    });
  };

  if (e) {
    codes['500'] = '500: Internal Server Error \n' + e.stack;
    headers['500'] = function() {
      res.writeHead(500, {
        'Content-Length': codes[status].length,
        'Content-Type': 'text/plain'
      });
    };
  }

  headers[status]();
  return codes[status];
}

module.exports = function(req, res) {
  var token;
  try {
    parseURL(req);
    if (req.method === 'GET') {
      if (req.pathname === '/' && typeof parseInt(req.query.bits, 10) === 'number') {
        crypto.randomBytes(parseInt(req.query.bits, 10), function(err, buf) {
          try {
            if (err) throw err;
            else token = crypto.createHmac('SHA1', buf.toString('base64')).update((new Date()).toString()).digest('base64');
            res.writeHead(200, {
              'Content-Length': token.length,
              'Content-Type': 'text/plain'
            });
            res.end(token);
          }
          catch (e) {
            res.end(errBoy(e, '500', req, res));
          }
        });
      }
      else {
        res.end(errBoy(null, '404', req, res));
      }
    }
    else {
      res.end(errBoy(null, '404', req, res));
    }
  }
  catch (e) {
    res.end(errBoy(e, '500', req, res));
  }
};
