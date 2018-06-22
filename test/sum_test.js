var assert = require("assert"); //nodejs에서 제공하는 aseert 모듈
var index  = require("../routes/api/index.js");

describe('Sum 테스트', function() {
	describe('sum() 메서드', function () {
		it('두 값을 더한 값을 반환', function () {
			assert.equal(2 , sum(1,1));
		});
	});
});

