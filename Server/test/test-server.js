var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Todos', function() {
  it('should list ALL Todos on /todos GET', function(done) {
    chai.request('http://localhost:4000/todos')
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});
