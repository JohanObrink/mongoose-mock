'use strict';

var sinon = require('sinon');

// ## Schema
var Schema = function () {
  function Model(properties) {
    var self = this;

    if(properties) {
      Object.keys(properties).forEach(function (key) {
        self[key] = properties[key];
      });
    }
    this.save = sinon.stub();
    this.increment = sinon.stub();
    this.remove = sinon.stub();
  }
  Model.statics = {};
  Model.methods = {};

  Model.aggregate = sinon.stub();
  Model.count = sinon.stub();
  Model.create = sinon.stub();
  Model.distinct = sinon.stub();
  Model.ensureIndexes = sinon.stub();
  Model.find = sinon.stub();
  Model.findById = sinon.stub();
  Model.findByIdAndRemove = sinon.stub();
  Model.findByIdAndUpdate = sinon.stub();
  Model.findOne = sinon.stub();
  Model.findOneAndRemove = sinon.stub();
  Model.findOneAndUpdate = sinon.stub();
  Model.geoNear = sinon.stub();
  Model.geoSearch = sinon.stub();
  Model.mapReduce = sinon.stub();
  Model.populate = sinon.stub();
  Model.remove = sinon.stub();
  Model.update = sinon.stub();
  Model.where = sinon.stub();

  return Model;
};

var mongoose = exports.mongoose = {
  Schema: Schema,
  model: function (name, Type) {
    Object.keys(Type.statics).forEach(function (key) {
      Type[key] = Type.statics[key];
    });
    Object.keys(Type.methods).forEach(function (key) {
      Type.prototype[key] = Type.methods[key];
    });
    return Type;
  },
  connect: sinon.stub()
};