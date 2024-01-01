import { Changeable } from '../interface/generic/changeable'
import { PlannedLesson } from '../interface/plannedLesson'
import { IndiwareParser } from './generic/parser'

export class PlannedLessonParser implements IndiwareParser<PlannedLesson> {
  parse(xml: any): PlannedLesson {
    function parseChangeable(input: any): Changeable<string> {
      if (typeof input == 'string') {
        return {
          changed: false,
          value: input,
        }
      } else {
        return {
          changed: true,
          value: input['#text'],
        }
      }
    }

    return {
      id: xml.Nr,
      order: xml.St,
      startTime: new Date(xml.Beginn),
      endTime: new Date(xml.Ende),
      subject: parseChangeable(xml.Fa),
      teacher: parseChangeable(xml.Le),
      room: parseChangeable(xml.Ra),
      schoolClass: xml.Kl,
      info: xml.If || null,
    }
  }
}
