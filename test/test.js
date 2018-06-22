var assert = require("assert"); //nodejs에서 제공하는 aseert 모듈

describe('Array 테스트', function() {
	describe('indexOf() 메서드', function () {
		it('값이 없을 때에는 -1 을 리턴함', function () {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});
