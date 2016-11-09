'use strict';

const formatUrl = require('./url');
const ical = require('ical');
const passFilter = require('./filter');

module.exports = function(data, options, callback) {
	if (typeof data !== 'object') {
		throw new Error('`data` param is invalid');
	}

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (typeof callback !== 'function') {
		throw new Error('`callback` is required');
	}

	const url = formatUrl(data.country, data.lang);

	options.timeout = options.timeout || 1000 * 5;

	ical.fromURL(url, options, (error, result) => {
		if (error) {
			return callback(error);
		}

		if (data.start || data.end) {
			for (let prop in result) {
				if (!passFilter(result[prop], data)) {
					delete result[prop];
				}
			}
		}

		callback(null, result);
	});
};
