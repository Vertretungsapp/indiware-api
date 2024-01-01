import { Course } from '../interface/course';
import { Lesson } from '../interface/lesson';
import { PlannedLesson } from '../interface/plannedLesson';
import { SchoolClass } from '../interface/schoolclass';
import { CourseParser } from './course';
import { IndiwareParser } from './generic/parser';
import { LessonParser } from './lesson';
import { PlannedLessonParser } from './plannedLesson';

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
