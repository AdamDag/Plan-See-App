const {expect} = require('chai');
const {NumUtil} = require('../utilities/numUtility');
const {ConversionUtil} = require('../utilities/numUtility');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(4)).to.equal( -1);
    });
  });
});


describe('numUtilities', function () {
  describe('random', function () {
    it('random generates a number smaller than or equal to the size of activities', function () {
      const numUtility = new NumUtil();
      expect(numUtility.random(5)).to.be.lte(5);
    });
  });
});

describe('conversionUtilities', function () {
  describe('stringToNum', function () {
    it('convert a number string to a number', function () {
      const convUtility = new ConversionUtil();
      expect(convUtility.stringToNum('5')).to.equal(5);
    });
    it('convert a different number string to a number', function () {
      const convUtility = new ConversionUtil();
      expect(convUtility.stringToNum('14212')).to.equal(14212);
    });
  });
});
