const app = require('../app.js');
const request = require('supertest');

describe('test - rent.js', function() {
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

  describe('GET /rent', function() {
    it('path /rent', function(done) {
      request(app)
        .get('/rent')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });

    it('path /rent/rent_detail', function(done) {
      request(app)
        .get('/rent/rent_detail')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });

  });
});
