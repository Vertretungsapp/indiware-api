import { EducationalUnit } from './generic/eduUnit'
import { Lesson } from './lesson'

/**
 * A school class represents a classical class or course in a school.
 */
export interface SchoolClass extends EducationalUnit {
  /**
   * The timetable of the school class.
   * The timetable is an array of lessons, which are used to represent the normal timetable.
   * The timetable can be replaced by a substitution (see plannedLessons field).
   */
  timetable: Lesson[]
}
