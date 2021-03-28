import * as assert from 'assert';
import * as chai from 'chai';
import { add } from '../index';

describe('Testing Example', () => {
  it('add', () => {
    assert.strictEqual(3, add(1, 2));
  });
  it('add', () => {
    chai.expect(add(5, 2)).to.equal(7);
  });
});
