/**
 * A lesson is a single lesson in a timetable, but can be replaced by a substitution.
 * It is used to represent the normal timetable.
 */
export interface Lesson {
  id: number
  name: string
  subject: string
  group: string | null
  teacher: number
}
