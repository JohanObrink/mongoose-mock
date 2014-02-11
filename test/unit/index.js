var chai = require('chai'),
  expect = chai.expect,
  mongoose = require('../../index.js'),
  Schema = mongoose.Schema;

describe('mongoose-mocks', function () {
  describe('Schema', function () {
    it('returns Models that can be instantiated', function () {
      var MyModel = new Schema({});
      var myObject = new MyModel();

      expect(MyModel).to.be.a('function');
      expect(myObject).to.be.an('object');
    });
    it('sets passed properties on model instance', function () {
      var MyModel = new Schema({});
      var myObject = new MyModel({ foo: 'bar' });

      expect(myObject.foo).to.equal('bar');
    });
    describe('mongoose Model functions', function () {

      var Model;
      beforeEach(function () {
        Model = new Schema();
      });

      it('adds a stub for aggregate()', function () {
        expect(Model.aggregate).to.be.a('function');
      });
      it('adds a stub for count()', function () {
        expect(Model.count).to.be.a('function');
      });
      it('adds a stub for create()', function () {
        expect(Model.create).to.be.a('function');
      });
      it('adds a stub for distinct()', function () {
        expect(Model.distinct).to.be.a('function');
      });
      it('adds a stub for ensureIndexes()', function () {
        expect(Model.ensureIndexes).to.be.a('function');
      });
      it('adds a stub for find()', function () {
        expect(Model.find).to.be.a('function');
      });
      it('adds a stub for findById()', function () {
        expect(Model.findById).to.be.a('function');
      });
      it('adds a stub for findByIdAndRemove()', function () {
        expect(Model.findByIdAndRemove).to.be.a('function');
      });
      it('adds a stub for findByIdAndUpdate()', function () {
        expect(Model.findByIdAndUpdate).to.be.a('function');
      });
      it('adds a stub for findOne()', function () {
        expect(Model.findOne).to.be.a('function');
      });
      it('adds a stub for findOneAndRemove()', function () {
        expect(Model.findOneAndRemove).to.be.a('function');
      });
      it('adds a stub for findOneAndUpdate()', function () {
        expect(Model.findOneAndUpdate).to.be.a('function');
      });
      it('adds a stub for geoNear()', function () {
        expect(Model.geoNear).to.be.a('function');
      });
      it('adds a stub for geoSearch()', function () {
        expect(Model.geoSearch).to.be.a('function');
      });
      it('adds a stub for mapReduce()', function () {
        expect(Model.mapReduce).to.be.a('function');
      });
      it('adds a stub for populate()', function () {
        expect(Model.populate).to.be.a('function');
      });
      it('adds a stub for remove()', function () {
        expect(Model.remove).to.be.a('function');
      });
      it('adds a stub for update()', function () {
        expect(Model.update).to.be.a('function');
      });
      it('adds a stub for where()', function () {
        expect(Model.where).to.be.a('function');
      });
    });
    describe('mongoose Model prototype functions', function () {
      var model;
      beforeEach(function () {
        var Model = new Schema({});
        model = new Model({foo: 'bar'});
      });
      it('adds a stub for save()', function () {
        expect(model.save).to.be.a('function');
      });
      it('adds a stub for increment()', function () {
        expect(model.increment).to.be.a('function');
      });
      it('adds a stub for remove()', function () {
        expect(model.remove).to.be.a('function');
      });
    });
  });
  describe('#model', function () {
    it('copies functions from statics to Model class', function () {
      var MyModel = new Schema({});
      MyModel.statics.foo = function () {

      };
      var Model = mongoose.model('MyModel', MyModel);
      expect(Model.foo).to.be.a('function');
    });
    it('copies functions from methods to Model prototype', function () {
      var MyModel = new Schema({});
      MyModel.methods.foo = function () {

      };
      var Model = mongoose.model('MyModel', MyModel);
      var obj = new Model();
      expect(obj.foo).to.be.a('function');
    });
  });
});