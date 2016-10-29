import * as chai from 'chai';
import * as supertest from 'supertest';

let should = chai.should();
let request = supertest('http://localhost:3000');

describe('Test Root Path', () => {
    it('should return 200', (done) => {
        request
            .get('/')
            .expect(200, done);
    });
});