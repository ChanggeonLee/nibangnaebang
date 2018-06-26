const app = require('../app.js');
const request = require('supertest');

describe('test - auth.js', function() {
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

  describe('/GET /auth', function() {
    
    it('path /auth.', function(done) {
      request(app)
        .get('/auth')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });

    it('path /auth/signin', function(done) {
      request(app)
        .get('/auth/signin')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });

    it('path /auth/signup', function(done) {
      request(app)
        .get('/auth/signup')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });

    it('path /auth/mypage', function(done) {
      request(app)
        .get('/auth/mypage')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });

  });
});