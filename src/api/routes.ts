import { DateTime } from 'luxon';

export const IndiwareAPIEndpoints = {
	GET_INFO_TXT: '/mobil/mobdaten/vpinfok.txt',
	GET_NEXT_SUBSTITUTION_PLAN: '/mobil/mobdaten/Klassen.xml',
	GET_SUBSTITUTION_PLAN: (date: Date) =>
		`/mobil/mobdaten/PlanKl${DateTime.fromJSDate(date).toFormat('yMMdd')}.xml`,
};
