import { Course } from '../interface/course';
import { IndiwareParser } from './generic/parser';

export class CourseParser implements IndiwareParser<Course> {
	parse(xml: any): Course {
		return {
			subject: xml.KKz['#text'],
			teacher: xml.UeNr['@_KLe'],
		};
	}
}
