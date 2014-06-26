var http = require('http');
var url = require('url');

var tokenBoy = require('./token-boy');
var errBoy = require('./error-boy');

function parseURL(req) {
  var parsedUrl = url.parse(req.url, true);
  for (var k in parsedUrl)
    if (parsedUrl.hasOwnProperty(k))
      req[k] = parsedUrl[k];
  return true;
}

function listener(req, res) {
  var token;
  try {
    parseURL(req);
    if (req.method === 'GET') {
      if (req.pathname === '/' && typeof parseInt(req.query.bits, 10) === 'number') {
        token = tokenBoy(req.query.bits, req.query.digest);
        res.writeHead(200, {
          'Content-Length': token.length,
          'Content-Type': 'text/plain'
        });
        res.end(token);
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
}


http.createServer(listener).listen(process.env.TOKEN_BOY_PORT || 3001);
