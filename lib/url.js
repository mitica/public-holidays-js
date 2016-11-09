'use strict';

const COUNTRIES = require('../countries');

module.exports = (country, lang) => {
	if (typeof country !== 'string') {
		throw new Error('`country` is required!');
	}

	if (typeof lang !== 'string') {
		throw new Error('`lang` is required!');
	}

	lang = lang.trim().toLowerCase();

	country = country.trim().toLowerCase();
	country = COUNTRIES[country] || country;

	return 'https://calendar.google.com/calendar/ical/' + lang + '.' + country + '%23holiday%40group.v.calendar.google.com/public/basic.ics';
};
