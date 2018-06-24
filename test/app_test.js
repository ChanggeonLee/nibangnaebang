const assert = require("assert"); //nodejs에서 제공하는 aseert 모듈
const app = require('../app.js');
const request = require('supertest');

describe('test - index.js', function() {
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

  describe('test 404', function() {
    console.log("404 not found");
    it('path /error .', function(done) {
        request(app)
            .get('/error')
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
  });
});
