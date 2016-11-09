'use strict';

const formatUrl = require('./url');
const fetchFolidays = require('./fetch');
const passFilter = require('./filter');

function toList(holidays) {
	if (!holidays) {
		return [];
	}
	return Object.keys(holidays)
		.map((key) => {
			return holidays[key];
		})
		.sort((a, b) => {
			return a.start - b.start;
		});
}

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

	fetchFolidays(url, options, (error, result) => {
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

		result = toList(result);

		callback(null, result);
	});
};
