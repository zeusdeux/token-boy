test:
	mocha --ui bdd --check-leaks --colors

debug:
	DEBUG=app,token-boy TOKEN_BOY_PORT=8000 node node_modules/nodemon/bin/nodemon.js app.js

start:
	node app.js

.PHONY: test debug start