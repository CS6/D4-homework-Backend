import supertest from 'supertest';
import * as chai from 'chai';
import HttpStatusCodes from 'http-status-codes';
import app from '../../src/index';
import 'mocha';

describe('Testing Draw Request', () => {
  it('Draw Dcard User', () => supertest(app).get('/api/draw/random')
    .then((res) => {
      // console.log(res.body);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      chai.expect(res.body[0]).to.not.be.undefined;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      chai.expect(res.body[0].school).to.not.be.undefined;
      chai.expect(res.body[0].name.length).to.at.least(2);
      chai.expect(res.status).to.equal(HttpStatusCodes.OK);
    }));
});
