token-boy
=========

Serves a token of given bit length with given encoding, digested by default.   

Collision detection logic is left out as it should be specific to your application.

##Install

```javascript
npm install token-boy
```

##Usage

###Simple usage
```javascript
var tokenBoy = require('token-boy')()
var token = tokenBoy(); //returns a 128 bit, base64 encoded, digested token
```

###Advanced usage
```javascript
var tokenBoy = require('token-boy')('hex') //specifying default encoding to be hex
var token;

token = tokenBoy() //returns a 128 bit, hex encoded, digested token
token = tokenBoy(256,'base64') //returns a 256 bit, base64 encoded, digested token
token = tokenBoy(128,'base64',false) //returns a 256 bit, base64 encoded, non-digested token
token = tokenBoy(512, 'ascii', false) //returns a 512 bit, ascii encoded, non-digested token

//note:
//both of these return a 512 bit, default encoding ('hex' in this case) encoded, digested token
//this is because ascii is not a valid digest encoding type as of node v0.10.29
token = tokenBoy(512, 'ascii', true)
token = tokenBoy(512, 'ascii')
```
As of Node v0.10.29   
Encodings supported are:

- `ascii`
- `utf8`
- `utf16le`
- `ucs2`
- `base64`
- `binary`
- `hex`

Default encodings supported are:

- `binary`
- `base64`
- `hex`

The default encodings supported are only a subset of encodings as the `digest()` method documentation asks us to only 
use these. If it is needed, I shall add support for all encodings to be used as default encodings but I don't see 
the need for it right now.