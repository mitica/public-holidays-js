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

	it('should throw error for unsupported locale sua:ro', (done) => {
		holidays({ country: 'sua', lang: 'ro' }, (error) => {
			assert.ok(error);
			assert.equal(error.statusCode, 404);
			done();
		});
	});

	it('should throw a timeout error', (done) => {
		holidays({ country: 'us', lang: 'ro' }, { timeout: 10 }, (error) => {
			assert.ok(error);
			assert.equal(error.code, 'ETIMEDOUT');
			done();
		});
	});

	it('should filter holidays by end date', (done) => {
		const end = new Date();
		holidays({ country: 'ro', lang: 'ro', end: end.getTime() }, (error, result) => {
			assert.ok(result.length);
			end.setMonth(end.getMonth() + 6);
			holidays({ country: 'ro', lang: 'ro', end: end.getTime() }, (error2, result2) => {
				assert.ok(result2.length);
				assert.equal(true, result2.length > result.length);
				done(error);
			});
		});
	});

	it('should get holidays za->sa (South African -> sa code!)', (done) => {
		holidays({ country: 'za', lang: 'en' }, (error, result) => {
			assert.ok(result.length);
			done(error);
		});
	});

	it('should get holidays sa->saudiarabian', (done) => {
		holidays({ country: 'sa', lang: 'en' }, (error, result) => {
			assert.ok(result.length);
			done(error);
		});
	});
});
