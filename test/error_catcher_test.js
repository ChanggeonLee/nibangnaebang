const assert = require("assert"); //nodejs에서 제공하는 aseert 모듈
const catchErrors = require('../lib/async-error');
const httpMocks = require('node-mocks-http');

describe('test - async-error catcher', function() {
  before(function() {
    // excuted before test suite
  });

  after(function() {
    // excuted after test suite
  });

  beforeEach(function() {
    // excuted before every test
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
  });

  afterEach(function() {
    // excuted after every test
  });
  
  describe('async catecher', function() {
    it('test catch error.', function() {
      assert(catchErrors( async(req, res, next)=>{
      }));
    });
  });

  describe('async catch error', function() {
    it('test catch error - error', function() {
      assert(catchErrors( async(req, res, next)=>{
        error
        error
      }));
    });
  });

});
