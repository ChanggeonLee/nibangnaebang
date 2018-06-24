const assert = require("assert"); //nodejs에서 제공하는 aseert 모듈
const httpMocks = require('node-mocks-http');
const app = require('../app.js');
const request = require('supertest');

describe('test - user.js', function() {
  before(function() {
    // excuted before test suite
  });

  after(function() {
    // excuted after test suite
  });

  beforeEach(function() {
    // excuted// excuted before every test
  });

  afterEach(function() {
    // excuted after every test
  });

  describe('test users', function() {
    console.log("users");
    it('path /users .', function(done) {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
  });
});
