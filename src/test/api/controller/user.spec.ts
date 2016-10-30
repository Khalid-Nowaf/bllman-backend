import * as chai from 'chai';
import * as supertest from 'supertest';
import * as  User from '../../../controllers/userController';

let should = chai.should();
let request = supertest('http://localhost:3000');

describe('Test Users Controller', () => {
    it('should create new user', (done) => {
        User.default.create({
            phone: 45532799,
            email: 'f5f@msn.com',
            password: '123123123',
            type: 'cus'
        }).then((res) => {  done(); }).catch((err) => { done(err); });
    });
});
