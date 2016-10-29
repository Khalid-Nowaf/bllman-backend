"use strict";
var chai = require('chai');
var supertest = require('supertest');
var should = chai.should();
var request = supertest('http://localhost:3000');
describe('Test Users Route', function () {
    it('should return 200', function (done) {
        request
            .get('/users')
            .expect(200, done);
    });
});
//# sourceMappingURL=user.spec.js.map