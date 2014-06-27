require('should');
var tokenBoy = require('../');

describe('token-boy', function() {
  describe('when no params are passed', function() {
    it('should return a 128 bit base64 encoded digested value', function() {
      var res = tokenBoy()();
      res.bits.should.be.exactly(128, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('base64', 'default encoding is not base64');
      res.digested.should.be.exactly(true);
    });
  });
  describe('when only bits is set', function() {
    it('should return a base64 encoded n bit value', function() {
      var res = tokenBoy()(256);
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('base64', 'default encoding is not base64');
    });
  });
  describe('when only bits and encoding are set', function() {
    it('should return an n bit value encoded in the given encoding', function() {
      var res = tokenBoy()(256, 'hex');
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding has skewed from request value');
    });
  });
  describe('when bits, encoding and digest are set', function() {
    it('should return a digested value with the given encoding', function() {
      var res = tokenBoy()(256, 'hex', true);
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding has skewed from request value');
      res.token.length.should.be.exactly(40);
    });
  });
  describe('when no bits are provided but other params are', function() {
    it('should default to 128bits and use the given encoding and digest', function() {
      var res = tokenBoy()(null, 'hex', 1);
      res.bits.should.be.exactly(128, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding is not base64');
      res.digested.should.be.exactly(true);
    });
  });
  describe('when n bits are provided but no enc [digest on default]', function() {
    it('should return n bit value with default encoding and digested', function() {
      var res = tokenBoy('hex')(256);
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding is not base64');
      res.digested.should.be.exactly(true);

      res = tokenBoy('base64')(128);
      res.bits.should.be.exactly(128, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('base64', 'default encoding is not base64');
      res.digested.should.be.exactly(true);
    });
  });
  describe('when a default encoding other than hex, base64 or binary is provided', function() {
    it('should throw', function() {
      tokenBoy.bind(null, 'ascii').should.
      throw ();
    });
  });
  describe('when invalid encoding is given',function(){
    it('should use the default encoding',function(){
      var res = tokenBoy('hex')(256,'hajgfjhsgf');
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding is not base64');
      res.digested.should.be.exactly(true);
    });
  });
});
