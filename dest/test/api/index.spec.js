"use strict";
var chai = require('chai');
var supertest = require('supertest');
var should = chai.should();
var request = supertest('http://localhost:3000');
describe('Test Root Path', function () {
    it('should return 200', function (done) {
        request
            .get('/')
            .expect(200, done);
    });
});
//# sourceMappingURL=index.spec.js.map