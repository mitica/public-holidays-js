
import test from 'ava';
import { getHolidays } from './holidays';


test('should get holidays by known country code', async t => {
    const holidays = await getHolidays({ country: 'ro', lang: 'ro' });
    t.truthy(holidays);
    t.truthy(holidays.length);
    t.true(typeof holidays[0].date === 'object')
    t.true(typeof holidays[0].name === 'string')
    t.true(holidays[0].date < holidays[1].date);
});

test('should get holidays by unknown country code', async t => {
    const holidays = await getHolidays({ country: 'md', lang: 'ro' });
    t.truthy(holidays);
    t.truthy(holidays.length);
});

test('should throw error for unsupported locale sua:ro', async t => {
    await t.throws(getHolidays({ country: 'sua', lang: 'ro' }));
});

test('should filter holidays by end date', async t => {
    const end = new Date();
    const holidays = await getHolidays({ country: 'ro', lang: 'ro', end });
    t.truthy(holidays.length);
    end.setMonth(end.getMonth() + 6);
    const holidays2 = await getHolidays({ country: 'ro', lang: 'ro', end });
    t.truthy(holidays2.length);
    t.true(holidays2.length > holidays.length);
});

test('should get holidays za->sa (South African -> sa code!)', async t => {
    const holidays = await getHolidays({ country: 'za', lang: 'en' });
    t.truthy(holidays);
    t.truthy(holidays.length);
});

test('should get holidays sa->saudiarabian', async t => {
    const holidays = await getHolidays({ country: 'sa', lang: 'en' });
    t.truthy(holidays);
    t.truthy(holidays.length);
});
