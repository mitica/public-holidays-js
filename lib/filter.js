'use strict';

module.exports = (holiday, options) => {
	if (options.start && holiday.start.getTime() < options.start) {
		return false;
	}
	if (options.end && holiday.end.getTime() > options.end) {
		return false;
	}

	return true;
};
