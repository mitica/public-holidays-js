'use strict';

const formatUrl = require('./url');

module.exports = exports = require('./holidays');

exports.url = formatUrl;

exports.toList = (holidays) => {
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
};
