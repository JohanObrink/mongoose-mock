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

## Usage with Babel (ES6)

Use [babel-plugin-rewire](https://github.com/speedskater/babel-plugin-rewire) to require-hook the Mongoose dependency.

#### model/User.js
```JavaScript
import mongoose, { Schema } from 'mongoose'

const User = new Schema({})
User.static('findByName', function (name) {
  return this.find({ name })
})

export default mongoose.model('User', User)
```

#### test/unit/model/User.js
```JavaScript
import chai, { expect } from 'chai'
import mongooseMock from 'mongoose-mock'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import User from '../../../model/User'

chai.use(sinonChai)

describe('User', () => {

  beforeEach(() => {
    User.__Rewire__('mongoose', { mongoose: mongooseMock })
  })

  afterEach(() => {
    User.__ResetDependency__('mongoose')
  })

  describe('.findByName', () => {
    it('finds users by name', () => {
      const spy = sinon.spy(User, 'find')
      User.findByName('White')
      expect(spy).to.have.been.calledOnce
      User.find.restore()
    })
  })
})
```
