'use strict';

module.exports = (holiday, options) => {
	if (options.start && holiday.start < options.start) {
		return false;
	}
	if (options.end && holiday.end > options.end) {
		return false;
	}

	return true;
};
