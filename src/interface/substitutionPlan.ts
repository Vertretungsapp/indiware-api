import { Room } from './room'
import { SchoolClass } from './schoolclass'
import { Teacher } from './teacher'

export interface ISubstitutionPlan {
  date: Date
  lastUpdated: Date

  daysPerWeek: number
  week: number
  holidays: Date[]

  info: string[] | null

  schoolClasses: SchoolClass[]
  teachers: Teacher[]
  rooms: Room[]
}

export class SubstitutionPlan {
  constructor(private _data: ISubstitutionPlan) {}

  public get date(): Date {
    return this._data.date
  }

  public get lastUpdated(): Date {
    return this._data.lastUpdated
  }

  public get daysPerWeek(): number {
    return this._data.daysPerWeek
  }

  public get week(): number {
    return this._data.week
  }

  public get holidays(): Date[] {
    return this._data.holidays
  }

  public get info(): string[] | null {
    return this._data.info
  }

  public get schoolClasses(): SchoolClass[] {
    return this._data.schoolClasses
  }

  public get teachers(): Teacher[] {
    return this._data.teachers
  }

  public get rooms(): Room[] {
    return this._data.rooms
  }
}
