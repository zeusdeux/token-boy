var http = require('http');
var tokenBoy = require('./token-boy');

http.createServer(tokenBoy).listen(process.env.TOKEN_BOY_PORT || 3001);
