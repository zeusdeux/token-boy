test:
	./node_modules/.bin/mocha -r should
min:
	./node_modules/.bin/uglifyjs browser/token-boy.js \
	-o browser/token-boy.min.js \
	-c -m \
	--source-map browser/token-boy.min.map \
	--comments \
	--stats
bundle:
	./node_modules/.bin/browserify -r ./index.js:token-boy -o browser/token-boy.js
watch:
	./node_modules/.bin/watchify -r ./index.js:token-boy -o browser/token-boy.js
build: test bundle min
.PHONY: test min bundle build watch