import { fetchHolidays, IcalHoliday } from "./fetch-holidays";
import { formatCalendarUrl } from "./url";

export async function getHolidays(options: Options) {

    if (typeof options !== 'object') {
        throw new TypeError('`options` param is invalid');
    }

    const url = formatCalendarUrl(options.country, options.lang);
    const holidaysData = await fetchHolidays(url, options.timeout);

    const holidaysList: Holiday[] = []

    if (options.start || options.end) {
        for (let id in holidaysData) {
            if (!passFilter(holidaysData[id], options)) {
                delete holidaysData[id];
            }
        }
    }

    for (let id in holidaysData) {
        holidaysList.push({
            date: holidaysData[id].start,
            name: holidaysData[id].summary,
        })
    }

    return holidaysList.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function passFilter(holiday: IcalHoliday, options: Options) {
    if (options.start && holiday.start < options.start) {
        return false;
    }
    if (options.end && holiday.start > options.end) {
        return false;
    }

    return true;
}

export type Holiday = {
    date: Date
    name: string
}

export type Options = {
    country: string
    lang: string
    start?: Date
    end?: Date
    timeout?: number
}
