import * as chai from 'chai';
import * as supertest from 'supertest';

let should = chai.should();
let request = supertest('http://localhost:3000');

describe('Test Users Route', () => {
    it('should return 200', (done) => {
        request
            .get('/users')
            .expect(200, done);
    });
});
