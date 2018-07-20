
import * as got from 'got';

const ical = require('ical');

export function fetchHolidays(url: string, timeout?: number): Promise<{ [key: string]: IcalHoliday }> {
    timeout = timeout || 5000;

    return got(url, {
        method: 'GET',
        timeout,
    })
        .then(response => {
            if (response.statusCode && response.statusCode >= 400) {
                throw new Error("Bad response from server");
            }
            return response.body;
        })
        .then(data => ical.parseICS(data));
}

export type IcalHoliday = {
    summary: string
    start: Date
}
