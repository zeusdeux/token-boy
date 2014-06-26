require('should');
var tokenBoy = require('../token-boy');

describe('token-boy', function(){
  describe('when no params are passed', function(){
    it('should return a 128 bit base64 encoded digested value', function(){
      var res = tokenBoy()();
      res.bits.should.be.exactly(128, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('base64', 'default encoding is not base64');
      res.digested.should.be.exactly(true);
    });
  });
  describe('when only bits is set', function(){
    it('should return a base64 encoded n bit value', function(){
      var res = tokenBoy()(256);
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('base64', 'default encoding is not base64');
    });
  });
  describe('when only bits and encoding are set', function(){
    it('should return an n bit value encoded in the given encoding', function(){
      var res = tokenBoy()(256, 'hex');
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding has skewed from request value');
    });
  });
  describe('when bits, encoding and digest are set', function(){
    it('should return a digested value with the given encoding', function(){
      var res = tokenBoy()(256, 'hex', true);
      res.bits.should.be.exactly(256, 'no of bits have skewed from requested bits');
      res.encoding.should.be.exactly('hex', 'default encoding has skewed from request value');
      res.token.length.should.be.exactly(40);
    });
  });
  //when no bits are provided but other params are it should default to 128bits
  //when n bits but no enc but digest is should return base64 encoded n bit value
  //when no params are provided it should return a 128 bit base64 encoded digested value
  //when n bits and enc it should return an n bit value with default encoding and ignore enc
});
