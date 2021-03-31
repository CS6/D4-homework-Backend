import { add } from '../index'
import * as assert from 'assert'
import supertest, { Request, SuperTest, Test } from 'supertest';
import app from '../../src/index';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { Server } from 'node:http';

chai.use(chaiHttp);
chai.config.includeStack = true;

const expect = chai.expect;

describe('Hello API Request', () => {
  it('should return response on call', () => {
    return supertest(app).get('/')
      .then(res => {
        chai.expect(res.text).to.equal("Hi");
      })
  })
  it('x-ratelimit-headers', () => {
    return supertest(app).get('/api/draw/test')
      .then(res => {
        chai.expect(res.headers['x-ratelimit-limit']).to.equal("1000");
        chai.expect(parseInt(res.headers['x-ratelimit-remaining'])).to.at.below(1000);
        chai.expect(res.headers['x-ratelimit-reset']).to.equal("3600");
      })
  })
})

describe('routes', () => {
  var server: Server;
  server = app;

  afterEach(function () {
    server.close();
  });

  // Test to make sure URLs respond correctly.
  it("url /", function (done) {
    supertest(server)
      .get("/")
      .end(function (err, res) {
        assert.equal(res.text, "Hi");
        done();
      });
  });
});
