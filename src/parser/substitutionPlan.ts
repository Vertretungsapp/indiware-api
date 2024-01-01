import { SubstitutionPlan } from '../interface/substitutionPlan'
import { IndiwareParser } from './generic/parser'
import { parse as parseDate } from 'date-fns'
import { de } from 'date-fns/locale'

export class SubstitutionPlanParser
  implements IndiwareParser<SubstitutionPlan>
{
  parse(xml: any): SubstitutionPlan {
    return new SubstitutionPlan({
      date: parseDate(
        xml.VpMobil.Kopf.DatumPlan,
        'EEEE, dd. MMMM y',
        new Date(),
        {
          locale: de,
        }
      ),
      lastUpdated: parseDate(
        xml.VpMobil.Kopf.zeitstempel,
        'dd.MM.y, HH:mm',
        new Date()
      ),
      daysPerWeek: +xml.VpMobil.Kopf.tageprowoche,
      week: +xml.VpMobil.Kopf.woche,
      holidays: xml.VpMobil.FreieTage.ft.map((holiday: any) => {
        return parseDate(holiday.toString(), 'yyMMdd', new Date())
      }),
      schoolClasses: [],
      rooms: [],
      teachers: [],
      info: [],
    })
  }
}
