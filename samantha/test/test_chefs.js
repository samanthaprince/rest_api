'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;

// var Recipes = require(__dirname + '/../models/recipe_model.js');
var Chefs = require(__dirname + '/../models/chef_model.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require(__dirname + '/../server.js');

describe('test REST api', function () {
  var token;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  before(function(done) {
    request('localhost:3000')
      .post('/signup')
      .auth('testuser', 'testpassword')
      .end(function(err, res) {
        token = res.body.token;
        console.log ('token is =', token);
        expect(err).to.eql(null);
        expect(res).to.have.property('headers');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should be able to create a new chef user', function(done)  {
    request('localhost:3000')
        .post('/signup')
        .auth('token', token)
        .end(function(err, res) {
          token = res.body.token;
          expect(err).to.eql(null);
          expect(res).to.have.property('headers');
          expect(res.body).to.have.property('token');
          done();
        });
  });


  it('should get all chefs in the  db', function(done) {
    request('localhost:3000')
      .get('/chefs')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      });
  });

  describe('tests need a chefs in the db to work with', function() {
    beforeEach(function(done) {
      var testChef = new Chefs({name: 'newchef'});
      testChef.save(function(err, data) {
        if(err) throw err;
        this.testChef = data;
        done();
      }.bind(this));
    });

    it('should be able to make a chef in a beforeEach block', function() {
      expect(this.testChef.name).to.eql('newchef');
      expect(this.testChef).to.have.property('name');
    });

    it('should update a chef page', function(done) {
      var id = this.testChef._id;
      request('localhost:3000')
      .put('/chefs/' + id)
      .auth('token', token)
      .send('{"name": "new chef name"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('name');
        done();
      });
    });

    it('should be able to delete a chef', function(done) {
      var id = this.testChef._id;
      request('localhost:3000')
        .delete('/chefs/' + id)
        .auth('token', token)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({message: 'chef removed'});
          done();
        });
    });
  });
});


// it('should be able to create a new chef', (done) => {
//   chai.request('localhost:3000')
//   .post('/chefs')
//   .send({"name": "Rachel Ray", "funFact":"Loves Dogs", "ingredients":  [{"item":"oatmeal", "amount":"1C"}]})
//   .end((err, res) => {
//     expect(err).to.eql(null);
//     expect(res.body.name).to.eql("Rachel Ray");
//     expect(res.body).to.have.property('_id');
//     done();
//   });
// });
