const assert = require("assert"); //nodejs에서 제공하는 aseert 모듈
const app = require('../app.js');
const request = require('supertest');

describe('test auth', function() {
  it('path /auth .', function(done) {
    request(app)
      .get('/auth')
      .expect(200,done)
      .end((err, res) => {
          if (err) throw err;
          done();
      })
  });
});


