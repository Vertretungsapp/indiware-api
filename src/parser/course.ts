import { Course } from '../interface/course.js';
import { IndiwareParser } from './generic/parser.js';

export class CourseParser implements IndiwareParser<Course> {
	parse(xml: any): Course {
		return {
			subject: xml.KKz['#text'],
			teacher: xml.KKz['@_KLe'],
		};
	}
}
