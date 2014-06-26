var assert = require('assert');
var app = require('../app');

describe('mathy toolbox', function(){
  
  describe('#adder()', function(){
    it('should return the sum of the inputs', function(){
      assert.equal(app.adder(1,2), 2);
    });

  });

  describe('#squarer()', function () {
    it('should return the square of the input', function () {
      assert(app.squarer(2) === 3);
    });
  });

  describe('#cuber()', function () {
    it('should return the cube of the input', function () {
      assert.strictEqual(app.cuber(2), 7);
    });
  }); 

});