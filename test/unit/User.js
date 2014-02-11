var mongooseMock = require('../../index.js'),
  proxyquire = require('proxyquire'),
  chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('User', function () {

  var User;

  beforeEach(function () {
    User = proxyquire('../fixtures/User', { 'mongoose': mongooseMock });
  });

  describe('.createAndSave', function () {
    it('saves the user', function () {
      var callback = sinon.spy();
      var user = User.createAndSave({ title: 'Mr', lastName: 'White' }, callback);
      expect(user.save).calledOnce;
    });
  });
});