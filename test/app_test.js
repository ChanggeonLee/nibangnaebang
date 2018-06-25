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

  describe('test index', function() {
    console.log("index");
    it('path / .', function(done) {
        request(app)
            .get('')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
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

  describe('test home', function() {
    console.log("home");
    it('path /home .', function(done) {
        request(app)
            .get('/home')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
  });

  describe('test assessment', function() {
    console.log("assessment");
    it('path /assessment .', function(done) {
        request(app)
            .get('/assessment')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
  });

  describe('test recipe', function() {
    console.log("recipe");
    it('path /recipe .', function(done) {
        request(app)
            .get('/recipe')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
  });

  describe('test shopping', function() {
    console.log("shopping");
    it('path /shopping .', function(done) {
        request(app)
            .get('/shopping')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });
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
