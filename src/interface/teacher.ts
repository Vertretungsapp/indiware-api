import { EducationalUnit } from './generic/eduUnit.js';

/**
 * A teacher represents a teacher in a school (obviously -_-).
 */
export interface Teacher extends EducationalUnit {
	readonly type: 'teacher';
}
