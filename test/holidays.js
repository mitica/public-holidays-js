'use strict';

const assert = require('assert');
const holidays = require('../lib');

describe('holidays', () => {
	it('should get holidays by known country code', (done) => {
		holidays({ country: 'ro', lang: 'ro' }, done);
	});

	it('should get holidays by unknown country code', (done) => {
		holidays({ country: 'md', lang: 'ro' }, done);
	});

	it('should throw error for unsupported locale us:ro', (done) => {
		holidays({ country: 'us', lang: 'ro' }, (error) => {
			assert.ok(error);
			assert.equal(error.statusCode, 404);
			done();
		});
	});

	it('should throw a timeout error', (done) => {
		holidays({ country: 'us', lang: 'ro' }, {timeout: 10}, (error) => {
			assert.ok(error);
			assert.equal(error.code, 'ETIMEDOUT');
			done();
		});
	});

	it('should filter holidays by start date', (done) => {
		const start = new Date();
		holidays({ country: 'ro', lang: 'ro', start: start }, (error, result) => {
			assert.equal(true, result[0].start > start);
			assert.equal(true, result[result.length - 1].start > result[0].start);
			done(error);
		});
	});
});
