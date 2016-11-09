'use strict';

const assert = require('assert');
const formatUrl = require('../lib').url;

describe('url', () => {
	it('shoult throw error on no data', () => {
		assert.throws(() => {
			formatUrl();
		});
	});

	it('shoult throw error on invalid country code', () => {
		assert.throws(() => {
			formatUrl(1);
		});

		assert.throws(() => {
			formatUrl(new Date());
		});
	});

	it('shoult throw error on invalid language code', () => {
		assert.throws(() => {
			formatUrl('us');
		});

		assert.throws(() => {
			formatUrl('us', 1);
		});
	});

	it('shoult create url for unknown country code', () => {
		const url = formatUrl('md', 'ro');
		assert.ok(url);
	});

	it('shoult create url for known country code', () => {
		const url = formatUrl('ro', 'ro');
		assert.ok(url);
	});
});
