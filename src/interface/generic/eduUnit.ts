import { PlannedLesson } from '../plannedLesson.js';

/**
 * An interface for educational unit
 * An educational unit is a unit of education, such as a class, course, or program, that is part of a school and can have a substition plan.
 */
export interface EducationalUnit {
	name: string;

	/**
	 * The planned lessons of this educational unit.
	 * The planned lessons are used to represent the substitution plan.
	 */
	plannedLessons: PlannedLesson[];
}
