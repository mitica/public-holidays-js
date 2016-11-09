'use strict';

const ical = require('ical');
const request = require('request');

module.exports = function(url, options, callback) {

	options.method = 'GET';

	request(url, options, (error, response, body) => {
		if (error) {
			return callback(error);
		}
		if (response.statusCode.toString()[0] === '4') {
			error = new Error('Page not found!');
			error.statusCode = response.statusCode;
			return callback(error);
		}
		if (response.statusCode.toString()[0] !== '2') {
			error = new Error('Invalid status code: ' + response.statusCode);
			error.statusCode = response.statusCode;
			return callback(error);
		}

		try {
			body = ical.parseICS(body);
		} catch (e) {
			return callback(e);
		}

		callback(undefined, body);
	});
};
