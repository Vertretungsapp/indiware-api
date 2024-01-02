import { Course } from './course.js';
import { EducationalUnit } from './generic/eduUnit.js';
import { Lesson } from './lesson.js';

/**
 * A school class represents a classical class or course in a school.
 */
export interface SchoolClass extends EducationalUnit {
	/**
	 * The timetable of the school class.
	 * It is a merge of all lessons and courses, where all courses get an id of `-1`.
	 * Can be replaced by a substitution (see plannedLessons field).
	 */
	timetable: Lesson[];

	/**
	 * Contains all lessons.
	 */
	lessons: Lesson[];

	/**
	 * Contains all courses.
	 */
	courses: Course[];
}
