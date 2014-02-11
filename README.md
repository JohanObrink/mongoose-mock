mongoose-mock
=============

[![Build Status](https://secure.travis-ci.org/JohanObrink/mongoose-mock.png?branch=master)](http://travis-ci.org/JohanObrink/mongoose-mock)

## Installation

      npm install mongoose-mock
      
## Usage

mongoose-mock is used for swapping out mongoose in unit tests. Use something like [proxyquire](https://github.com/thlorenz/proxyquire) to change the dependency.

#### model/User.js
```JavaScript
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var User = new Schema({});
User.statics.createAndSave = function (props, callback) {
  var user = new User(props);
  user.save(function(err, result) {
    callback(err, result);
  });
  return user;
};

module.exports = mongoose.model('User', User);
```

#### test/unit/model/User.js
```JavaScript
var mongooseMock = require('mongoose-mock'),
  proxyquire = require('proxyquire'),
  chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('User', function () {

  var User;

  beforeEach(function () {
    User = proxyquire('../../../model/User', { 'mongoose': mongooseMock });
  });

  describe('.createAndSave', function () {
    it('saves the user', function () {
      var callback = sinon.spy();
      var user = User.createAndSave({ title: 'Mr', lastName: 'White' }, callback);
      expect(user.save).calledOnce;
    });
  });
});
```
