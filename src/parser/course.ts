import { Course } from '../interface/course'
import { Lesson } from '../interface/lesson'
import { IndiwareParser } from './generic/parser'

export class CourseParser implements IndiwareParser<Course> {
  parse(xml: any): Course {
    return {
      subject: xml.KKz['#text'],
      teacherName: xml.UeNr['@_KLe'],
    }
  }
}
