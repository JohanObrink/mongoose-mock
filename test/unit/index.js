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
    describe('mongoose Types', function() {
      it('should have an ObjectId type', function() {
        expect(Schema.Types).to.have.a.property('ObjectId');
      });
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
      it('adds a stub for path()', function() {
        expect(Model.path).to.be.a('function');
      });
      describe('path()', function () {
        it('returns an object with a stub to validate', function () {
          expect(Model.path()).to.be.an('object');
          expect(Model.path().validate).to.exist.and.to.be.a('function');
        });
      });
      it('adds a stub for virtual', function () {
        expect(Model.virtual).to.be.a('function');
      });
      describe('virtual()', function () {
        it('returns an object with a .get() and a .set()', function () {
          expect(Model.virtual).to.be.a('function');
          expect(Model.virtual()).to.be.an('object');
          expect(Model.virtual()).to.be.an('object');
        });
        it('.get() and .set() return an object with .set() and .get()', function () {
          expect(Model.virtual().get()).to.be.a('object').and.to.have.a.property('set').that.is.a('function');
          expect(Model.virtual().set()).to.be.a('object').and.to.have.a.property('get').that.is.a('function');
        });
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
    it('stores and returns a model by name', function () {
      var MyModel = new Schema({});
      mongoose.model('MyModel', MyModel);
      var MyModelAgain = mongoose.model('MyModel');
      expect(MyModel).to.deep.equal(MyModelAgain);
    });
  });
  describe('#on', function () {
    it('register a callback for event \'model\'invoked when a new Schema is created', function () {
      var MyModel = null;
      mongoose.on('model', function(model) {
        expect(model).to.be.a('function');
        MyModel = model;
      });
      new mongoose.Schema({});
      expect(MyModel).to.be.not.null;
    });
    it('registers a callback for event \'document\' invoked when a new Model is created', function () {
      var MyDocument = null;
      mongoose.on('document', function(document) {
        expect(document).to.be.an('object');
        MyDocument = document;
      }); 
      var Model = new mongoose.Schema({});
      new Model();
      expect(MyDocument).to.be.not.null;
    });
  });
});
