# public-holidays

Gets public holidays from google calendar.


## Usage
```ts
import { getHolidays } from 'public-holidays';
// public holidays for US in English
const options = { country: 'us', lang: 'en' };

const holidays = await getHolidays(options);
```

## API (v0.2)

### formatCalendarUrl(country, lang): string

Format google calendar url by country and language.

### getHolidays(options): Promise<Holiday[]>

Get public holidays by options.

#### options:

- **country** (string) (required) - country 2 letters code: `us`, `ru`
- **lang** (string) (required) - language 2 letters code: `en`, `ru`
- **start** (Date) (optional) - start date
- **end** (Date) (optional) - end date
- **timeout** (number) (optional) - request timeout in ms

#### types:

```ts
type Holiday = {
    date: Date
    name: string
}
type Options = {
    country: string
    lang: string
    start?: Date
    end?: Date
    timeout?: number
}
```
