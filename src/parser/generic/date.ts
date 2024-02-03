import { DateTime } from 'luxon';

export function parseLocalizedDate(
	date: string,
	format: string,
	timezone: string = 'Europe/Berlin',
	locale: string = 'de-DE',
) {
	return DateTime.fromFormat(date, format, {
		zone: timezone,
		locale: locale,
	}).toJSDate();
}
