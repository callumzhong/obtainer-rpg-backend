const { describe, it } = require('mocha');
const { faker } = require('@faker-js/faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();

chai.use(chaiHttp);
// Our parent block
describe('api/user', () => {
  /*
   * Test the /POST route
   */
  describe('/POST sign_up', () => {
    it('它應該註冊用戶', (done) => {
      (async () => {
        const body = {
          account: faker.finance.account(6),
          email: faker.internet.email(),
          password: '12345678',
          confirmPassword: '12345678',
        };
        chai
          .request(app)
          .post('/api/user/sign_up')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
          });
      })();
    });
  });

  describe('/POST sign_in', () => {
    it('它應該登入用戶', (done) => {
      (async () => {
        const body = {
          account: 'qq123',
          password: '12345678',
        };
        chai
          .request(app)
          .post('/api/user/sign_in')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
          });
      })();
    });
  });
});
