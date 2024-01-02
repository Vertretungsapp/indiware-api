import { parse as parseDate } from 'date-fns';
import { de } from 'date-fns/locale';
import { PlannedLesson } from '../interface/plannedLesson.js';
import { Room } from '../interface/room.js';
import { SchoolClass } from '../interface/schoolclass.js';
import { SubstitutionPlan } from '../interface/substitutionPlan.js';
import { Teacher } from '../interface/teacher.js';
import { IndiwareParser } from './generic/parser.js';
import { SchoolClassParser } from './schoolClass.js';

export class SubstitutionPlanParser implements IndiwareParser<SubstitutionPlan> {
	private generateRooms(schoolclasses: SchoolClass[]): Room[] {
		const rooms: Room[] = [];

		for (const schoolclass of schoolclasses) {
			for (const lesson of schoolclass.plannedLessons) {
				if (!lesson.room.value || lesson.room.value == '') continue;

				const existingRoomIndex = rooms.findIndex(
					(room) => room.name === lesson.room.value,
				);

				if (existingRoomIndex !== -1) {
					rooms[existingRoomIndex].plannedLessons.push(lesson);
					continue;
				} else {
					rooms.push({
						name: lesson.room.value,
						plannedLessons: [lesson],
					});
				}
			}
		}

		for (const room of rooms) {
			room.plannedLessons.sort((a, b) => {
				return a.order - b.order;
			});
		}

		rooms.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		return rooms;
	}

	private generateTeachers(schoolclasses: SchoolClass[]): Teacher[] {
		const teachers: Room[] = [];

		for (const schoolclass of schoolclasses) {
			for (const lesson of schoolclass.plannedLessons) {
				if (!lesson.teacher.value || lesson.teacher.value == '') continue;

				for (const t of lesson.teacher.value.split(' ')) {
					const existingTeacherIndex = teachers.findIndex(
						(teacher) => teacher.name === t,
					);

					if (existingTeacherIndex !== -1) {
						teachers[existingTeacherIndex].plannedLessons.push(lesson);
						continue;
					} else {
						teachers.push({
							name: t,
							plannedLessons: [lesson],
						});
					}
				}
			}
		}

		for (const teacher of teachers) {
			teacher.plannedLessons.sort((a: PlannedLesson, b: PlannedLesson) => {
				return a.order - b.order;
			});
		}

		teachers.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		return teachers;
	}

	parse(xml: any): SubstitutionPlan {
		const schoolClasses = xml.VpMobil.Klassen.Kl.map((schoolClass: any) => {
			return new SchoolClassParser().parse(schoolClass);
		});

		return new SubstitutionPlan({
			date: parseDate(xml.VpMobil.Kopf.DatumPlan, 'EEEE, dd. MMMM y', new Date(), {
				locale: de,
			}),
			lastUpdated: parseDate(xml.VpMobil.Kopf.zeitstempel, 'dd.MM.y, HH:mm', new Date()),
			daysPerWeek: +xml.VpMobil.Kopf.tageprowoche,
			week: +xml.VpMobil.Kopf.woche,
			holidays: xml.VpMobil.FreieTage.ft.map((holiday: any) => {
				return parseDate(holiday.toString(), 'yyMMdd', new Date());
			}),
			schoolClasses,
			rooms: this.generateRooms(schoolClasses),
			teachers: this.generateTeachers(schoolClasses),
			info: xml.VpMobil.ZusatzInfo ? (xml.VpMobil.ZusatzInfo.ZiZeile as string[]) : [],
		});
	}
}
