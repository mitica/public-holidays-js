# public-holidays

Gets public holidays from google calendar.


## Usage
```
const holidays = require('public-holidays');
// public holidays for US in English
const filter = {country: 'us', lang: 'en'};

holidays(filter, (error, result) => {
  
});

// public holidays for FR in French
filter = {country: 'fr', lang: 'fr'};

holidays(filter, (error, result) => {
  
});
```

## API

### holidays.url(country, lang)

Format google calendar url by country and language.

### (filter, options, callback)

Get public holidays by filter.

#### filter:

- **country** (string) (required) - country 2 letters code: `us`, `ru`
- **lang** (string) (required) - language 2 letters code: `en`, `ru`
- **start** (int) (optional) - start date: milliseconds
- **end** (int) (optional) - end date: milliseconds

#### options

[request](https://www.npmjs.com/package/request) options.

Result is an array of ordered holidays parsed by [ical](https://www.npmjs.com/package/ical).
