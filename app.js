var http = require('http');
var url = require('url');
var debug = require('debug')('app');

var tokenBoy = require('./token-boy')('hex');
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
  debug('New request -------------->');
  try {
    parseURL(req);
    debug('Method: ',req.method);
    if (req.method === 'GET') {
      debug('Pathname: ',req.pathname);
      debug('bits raw: ',req.query.bits);
      debug('bits parsed: ', parseInt(req.query.bits, 10));
      if (req.pathname === '/' && !isNaN(parseInt(req.query.bits, 10))) {
        token = JSON.stringify(tokenBoy(req.query.bits, req.query.enc, req.query.digest));
        res.writeHead(200, {
          'Content-Length': token.length,
          'Content-Type': 'application/json'
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
