import { Room } from '../interface/room.js';
import { SchoolClass } from '../interface/schoolclass.js';
import { SubstitutionPlan } from '../interface/substitutionPlan.js';
import { Teacher } from '../interface/teacher.js';
import { parseLocalizedDate } from './generic/date.js';
import { IndiwareParser } from './generic/parser.js';
import { SchoolClassParser } from './schoolClass.js';

export class SubstitutionPlanParser implements IndiwareParser<SubstitutionPlan> {
	private generateRoomsAndTeachers(schoolClasses: SchoolClass[]): [Room[], Teacher[]] {
		const rooms: Room[] = [];
		const teachers: Teacher[] = [];

		for (const schoolClass of schoolClasses) {
			for (const lesson of schoolClass.plannedLessons) {
				if (lesson.room.value && lesson.room.value != '') {
					// TODO: Find a better way to handle multiple rooms in one lesson
					// Since this breaks rooms like "TH 1" but also fixes "S2.14 S2.15"

					// for (const room of lesson.room.value.split(' ')) {
					// 	const existingRoomIndex = rooms.findIndex((r) => r.name === room);
					// 	if (existingRoomIndex !== -1) {
					// 		rooms[existingRoomIndex].plannedLessons.push(lesson);
					// 		continue;
					// 	} else {
					// 		rooms.push({
					// 			name: room,
					// 			plannedLessons: [lesson],
					// 		});
					// 	}
					// }

					const existingRoomIndex = rooms.findIndex((r) => r.name === lesson.room.value);
					if (existingRoomIndex !== -1) {
						rooms[existingRoomIndex].plannedLessons.push(lesson);
					} else {
						rooms.push({
							name: lesson.room.value,
							plannedLessons: [lesson],
						});
					}
				}

				if (lesson.teacher.value && lesson.teacher.value != '') {
					for (const teacher of lesson.teacher.value.split(' ')) {
						const existingTeacherIndex = teachers.findIndex((t) => t.name === teacher);

						if (existingTeacherIndex !== -1) {
							teachers[existingTeacherIndex].plannedLessons.push(lesson);
						} else {
							teachers.push({
								name: teacher,
								plannedLessons: [lesson],
							});
						}
					}
				}
			}
		}

		rooms.sort((a, b) => a.name.localeCompare(b.name));
		teachers.sort((a, b) => a.name.localeCompare(b.name));
		teachers.forEach((teacher) => {
			teacher.plannedLessons.sort((a, b) => a.order - b.order);
		});

		return [rooms, teachers];
	}

	parse(xml: any): SubstitutionPlan {
		const schoolClasses = xml.VpMobil.Klassen.Kl.map((schoolClass: any) => {
			return new SchoolClassParser().parse(schoolClass);
		});

		const [rooms, teachers] = this.generateRoomsAndTeachers(schoolClasses);

		return new SubstitutionPlan({
			date: parseLocalizedDate(xml.VpMobil.Kopf.DatumPlan, 'EEEE, dd. MMMM y'),
			lastUpdated: parseLocalizedDate(xml.VpMobil.Kopf.zeitstempel, 'dd.MM.y, HH:mm'),
			daysPerWeek: +xml.VpMobil.Kopf.tageprowoche,
			week: +xml.VpMobil.Kopf.woche,
			holidays: xml.VpMobil.FreieTage.ft.map((holiday: any) => {
				return parseLocalizedDate(holiday.toString(), 'yyMMdd');
			}),
			schoolClasses,
			info: xml.VpMobil.ZusatzInfo ? (xml.VpMobil.ZusatzInfo.ZiZeile as string[]) : [],
			rooms,
			teachers,
		});
	}
}
