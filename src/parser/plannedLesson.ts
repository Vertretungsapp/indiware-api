import { Changeable } from '../interface/generic/changeable';
import { PlannedLesson } from '../interface/plannedLesson';
import { parseLocalizedDate } from './generic/date';
import { IndiwareParser } from './generic/parser';

export class PlannedLessonParser implements IndiwareParser<PlannedLesson> {
	parse(xml: any): PlannedLesson {
		function parseChangeable(input: any): Changeable<string> {
			if (typeof input == 'string') {
				return {
					changed: false,
					value: input || null,
				};
			} else {
				return {
					changed: true,
					value: input['#text'] || null,
				};
			}
		}

		return {
			id: xml.Nr,
			order: xml.St,
			startTime: parseLocalizedDate(xml.Beginn, 'HH:mm'),
			endTime: parseLocalizedDate(xml.Ende, 'HH:mm'),
			subject: parseChangeable(xml.Fa),
			teacher: parseChangeable(xml.Le),
			room: parseChangeable(xml.Ra),
			schoolClass: xml.schoolClass || '???',
			info: xml.If || null,
		};
	}
}
