import supertest from 'supertest';
import * as chai from 'chai';
import app from '../../src/index';
import 'mocha';
import { fakeDcardUser, fakeDcardALLUser } from '../index';

describe('Testing fakeDcardUser', () => {
  it('should return response on call', () => {
    // console.log('fakeDcardUser', fakeDcardUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    chai.expect(fakeDcardUser).to.not.be.undefined;
    // chai.expect(fakeDcardUser).to.equal('Hi');
  });

  it('Set ALL Fake Dcard Users', (done) => {
    // console.log(`fakeDcardUser:${fakeDcardUser.name}`);
    // console.log(`fakeDcardALLUser:${fakeDcardALLUser.name}`);
    supertest(app).post('/api/user/setmore')
      .send(fakeDcardALLUser())
      // .expect(404)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('Set One Fake Dcard Users', (done) => {
    // console.log(`fakeDcardUser:${fakeDcardUser.name}`);
    supertest(app).post('/api/user/setuser')
      .send(fakeDcardUser())
      // .expect(404)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
