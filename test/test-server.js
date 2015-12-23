var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var chai = require('chai');
var expect = chai.expect;

chai.use(chaiHttp);

var agent =
  chai.request.agent(server);
describe('Accounts', function() {
  this.timeout(10000);
  //Login Testing
  it('should login and redirect on /login POST', function(done) {
    agent
      .post('/login')
      .send({"username": "six","password": "pass"})
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        done();
      });
  });
  //SchemCreation
  it('Should create a new schema on /new/schem POST', function(done){
    agent
      .post('/new/schem')
      .send({"objName":"customName","property1":"Phone Number","typeOfProperty1":"unique","property2":"Service Provider","typeOfProp2":"shared","property3":"Plan Cost","typeOfProp3":"shared","property4":"Owner's Name","typeOfProp4":"unique"})
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      })
  });
  //Object Creation
  it('should create a new object on /new/object POST',function(done){
    agent
      .post('/new/object')
      .send({"Phone Number":6107932623,"Service Provider":"Fios","Plan Cost":"60$","Owner's Name":"Walker"})
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      })
  });
  it('should add another object on a second /new/object POST',function(done){
    agent
      .post('/new/object')
      .send({"Phone Number":1234567890,"Service Provider":"AT&T","Plan Cost":"60$","Owner's Name":"Runner"})
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      })
  });
  it('should return a nice list of objects on /home/all GET',function(done){
    agent
      .get('/home/all')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });

});
