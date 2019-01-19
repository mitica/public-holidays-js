
import fetch from 'cross-fetch';

import ical from './ical';

export function fetchHolidays(url: string, timeout?: number): Promise<{ [key: string]: IcalHoliday }> {
    timeout = timeout || 5000;

    const promise = fetch(url, {
        method: 'GET',
    })
        .then(response => {
            if (response.status && response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.text();
        })
        .then(data => ical.parseICS(data));

    return timeoutPromise(promise, timeout);
}

function timeoutPromise<T>(promise: Promise<T>, ms: number) {
    const timeout = new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject('Timed out in ' + ms + 'ms.')
        }, ms)
    });

    return Promise.race([
        promise,
        timeout,
    ]);
}

export type IcalHoliday = {
    summary: string
    start: Date
}
