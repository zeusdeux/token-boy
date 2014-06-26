module.exports = function errBoy(e, status, req, res) {
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
};
