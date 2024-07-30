import { Changeable } from '../interface/generic/changeable.js';
import { PlannedLesson } from '../interface/plannedLesson.js';
import { parseLocalizedDate } from './generic/date.js';
import { IndiwareParser } from './generic/parser.js';

export class PlannedLessonParser implements IndiwareParser<PlannedLesson> {
	parse(xml: any): PlannedLesson {
		function parseChangeable(input: any): Changeable<string> {
			// Rooms can have different structures, based on the school
			// While some schools have rooms with letters, others only have numbers
			if (typeof input == 'string' || typeof input == 'number') {
				return {
					changed: false,
					value: input.toString() || null,
				};
			} else {
				return {
					changed: true,
					value: input['#text'] || null,
				};
			}
		}

		return {
			id: xml.Nr || null,
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
