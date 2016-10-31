import * as chai from 'chai';
import * as supertest from 'supertest';
import * as User from '../../models/User';
let should = chai.should();
let request = supertest('http://localhost:3000');

let userV = { // valid user
    phone: '0561031000',
    email: 'test@email.com',
    password: 'test123'
};

let userV2 = { // valid user2
    phone: '0561031002',
    email: 'test2@email.com',
    password: 'test123'
};

let userIV = { // unvalid user
    phone: '61031001',
    email: 'test2.com',
    password: '123123'
};

describe('Test Users API', () => {

    after((done) => {
        User.default.remove({phone: userV.phone})
        .then((conf) => { done(); })
        .catch((err) => { done(err); } );
    });

    it('POST /user should create new valid user', (done) => {
        request
            .post('/user')
            .send(userV)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                User.default.findOne({phone: userV.phone})
                .then(done())
                .catch((err) => { done(err); } );
            });
    });

it('POST /user should not accept missing phone number ', (done) => {
        request
            .post('/user')
            .send({ email: userV2.email, password: userV2.password})
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[0].code.should.equal('200');
                 done();
            });
    });

    it('POST /user should not accept an existing phone number', (done) => {
         request
            .post('/user')
            .send(userV)
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                res.body.errors[0].code.should.equal('201');
                done();
            });
    });

    it('POST /user should not accept invalid phone number', (done) => {
         request
            .post('/user')
            .send({phone: userIV.phone, email: userV2.email , password: userV2.password })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                res.body.errors[0].code.should.equal('202');
                done();
            });
    });

    it('POST /user should not accept missing email address ', (done) => {
        request
            .post('/user')
            .send({ phone: userV2.phone, password: userV2.password})
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[0].code.should.equal('203');
                 done();
            });
    });

    it('POST /user should not accept an existing email address ', (done) => {
        request
            .post('/user')
            .send({ phone: userV2.phone, email: userV.email, password: userV2.password})
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[0].code.should.equal('204');
                 done();
            });
    });

    it('POST /user should not accept invalid email address ', (done) => {
        request
            .post('/user')
            .send({ phone: userV2.phone, email: userIV.email, password: userV2.password})
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[0].code.should.equal('205');
                 done();
            });
    });

    it('POST /user should not accept missing password ', (done) => {
        request
            .post('/user')
            .send({ phone: userV2.phone, email: userV2.email })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[0].code.should.equal('206');
                 done();
            });
    });

    it('POST /user should not accept invalid password ', (done) => {
        request
            .post('/user')
            .send({ phone: userV2.phone, email: userV2.email, password: userIV.password })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[0].code.should.equal('207');
                 done();
            });
    });

    it('POST /user should return mitliple error if any ', (done) => {
        request
            .post('/user')
            .send({ phone: userIV.phone, email: userIV.email, password: userIV.password })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                 res.body.errors[2].code.should.equal('202');
                 res.body.errors[1].code.should.equal('205');
                 res.body.errors[0].code.should.equal('207');
                 done();
            });
    });

});
