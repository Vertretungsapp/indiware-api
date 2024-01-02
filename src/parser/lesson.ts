import { Lesson } from '../interface/lesson.js';
import { IndiwareParser } from '../parser/generic/parser.js';

export class LessonParser implements IndiwareParser<Lesson> {
	parse(xml: any): Lesson {
		function getName(subject: string, group?: string) {
			if (group) {
				return `${subject} (${group})`;
			} else {
				return subject;
			}
		}

		return {
			id: xml.UeNr['#text'],
			name: getName(xml.UeNr['@_UeFa'], xml.UeNr['@_UeGr']),
			subject: xml.UeNr['@_UeFa'],
			group: xml.UeNr['@_UeGr'] || null,
			teacher: xml.UeNr['@_LeNr'],
		};
	}
}
