//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Books', () => {
  it('This is a Controller.', (done) => {
    describe('AssertTest', function () {
      var foo = 'Hello';
      // var bar = "World";  
      var bar = "Hello";


      it('should be equal', function () {
        chai.assert(foo === bar, 'foo is not bar');
      });
    });
    /*
     * Test the /GET route
     */
    describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request('http://localhost:3000')
          .get('/demo')
          .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eql(0);
            return done();
          });
      });
    });
    describe('/GET controller', () => {
      it('it should GET all the books', (done) => {
        chai.request('http://localhost:3000')
          .get('/demo/controller')
          .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('message');
            // res.body.should.be.assert.eql('Use API!');
            chai.assert(res.body.message === 'Use API!', 'body is not message');
            // console.log(res.body.message.should)
            res.body.should.have.property('message').eql('Use API!');
            res.body.should.length.be.not.eql(0);
            return done();
          });
      });
    });
    return done();
  });
});
// expect(res.body.data.some((item) => item.message === "Good")).to.equal(true);
