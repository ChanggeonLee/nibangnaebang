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

  describe('GET /', function() {
    it('path /', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done();
        })
    });
  });
  
});
