import { parseIniFromString } from 'cool-ini-parser';
import { parseLocalizedDate } from './generic/date.js';
	
export function parseAvailableDates(file: any): Date[] {
	const parsed = parseIniFromString(file);
	const dates: Date[] = []
	
	parsed.sections[0].entries.forEach((line) => {
		if (line.key.startsWith("Plan")) dates.push(parseLocalizedDate(line.value.split("\\")[0], "yyMMdd"));
	})
	
	return dates.filter((d) => !isNaN(d.valueOf()))
}
