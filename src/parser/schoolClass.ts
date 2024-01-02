import { Course } from '../interface/course.js';
import { Lesson } from '../interface/lesson.js';
import { PlannedLesson } from '../interface/plannedLesson.js';
import { SchoolClass } from '../interface/schoolclass.js';
import { CourseParser } from './course.js';
import { IndiwareParser } from './generic/parser.js';
import { LessonParser } from './lesson.js';
import { PlannedLessonParser } from './plannedLesson.js';

export class SchoolClassParser implements IndiwareParser<SchoolClass> {
	parse(xml: any): SchoolClass {
		const courses: Course[] = xml.Kurse
			? xml.Kurse.Ku.map((course: any) => new CourseParser().parse(course))
			: [];

		const lessons: Lesson[] = xml.Unterricht
			? xml.Unterricht.Ue.map((lesson: any) => new LessonParser().parse(lesson))
			: [];

		const timetable: Lesson[] = lessons;
		timetable.push(
			...courses.map((course: Course) => {
				return {
					id: -1,
					name: course.subject,
					...course,
				} as Lesson;
			}),
		);

		const plannedLessons: PlannedLesson[] = xml.Pl
			? xml.Pl.Std.map((plannedLesson: any) =>
					new PlannedLessonParser().parse({
						schoolClass: xml.Kurz,
						...plannedLesson,
					}),
				)
			: [];

		return {
			name: xml.Kurz,
			timetable,
			courses,
			lessons,
			plannedLessons,
		};
	}
}
