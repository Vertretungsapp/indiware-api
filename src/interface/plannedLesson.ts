import { Changeable } from './generic/changeable';

/**
 * A planned lesson is the actual scheduled lesson in a substitution plan.
 * It can be equal to a normal lesson, but can also be a different lesson, depending on the substitution plan.
 */
export interface PlannedLesson {
	id: number;
	/**
	 * The order of the planned lesson in the substitution plan.
	 * @example 1, 2, ...
	 */
	order: number;
	subject: Changeable<string>;

	schoolClass: number;
	room: Changeable<string>;
	teacher: Changeable<string>;

	startTime: Date;
	endTime: Date;

	info: string | null;
}
