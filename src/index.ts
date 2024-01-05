import { AxiosRequestConfig } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { Credentials, IndiwareAPI } from './api/index.js';
import { IndiwareAPIEndpoints } from './api/routes.js';
import { PlanNotFoundError, RequestFailedError } from './errors/index.js';
import { Course } from './interface/course.js';
import { Lesson } from './interface/lesson.js';
import { PlannedLesson } from './interface/plannedLesson.js';
import { Room } from './interface/room.js';
import { SchoolClass } from './interface/schoolclass.js';
import { ISubstitutionPlan, SubstitutionPlan } from './interface/substitutionPlan.js';
import { Teacher } from './interface/teacher.js';
import { CourseParser } from './parser/course.js';
import { LessonParser } from './parser/lesson.js';
import { PlannedLessonParser } from './parser/plannedLesson.js';
import { SchoolClassParser } from './parser/schoolClass.js';
import { SubstitutionPlanParser } from './parser/substitutionPlan.js';

/**
 * An array of paths that should always be an array when parsing the XML.
 */
export const ALWAYS_ARRAY_PATHS = [
	'VpMobil.ZusatzInfo.ZiZeile',
	'VpMobil.FreieTage.ft',
	'VpMobil.Klassen.Kl',
	'VpMobil.Klassen.Kl.KlStunden.KlSt',
	'VpMobil.Klassen.Kl.Kurse.Ku',
	'VpMobil.Klassen.Kl.Unterricht.Ue',
	'VpMobil.Klassen.Kl.Pl.Std',
];

type BootstrapOptions = {
	/**
	 * The URI where the Indiware API is located.
	 *
	 * @example "https://stundenplan24.de"
	 */
	uri: string;

	/**
	 * The school number of the school to get the data from.
	 * Has to be 8 digits long.
	 *
	 * @example "12345678"
	 */
	schoolnumber: string;

	/**
	 * The username of the user to login with.
	 * This can be changed later.
	 *
	 * @example "schueler", "lehrer"
	 */
	username: string;

	/**
	 * The password of the user to login with.
	 * This can be changed later.
	 */
	password: string;

	/**
	 * The options to pass to axios.
	 * Can be used to set a proxy or something else.
	 */
	axiosOptions?: AxiosRequestConfig;
};

/**
 * The main class of the Indiware API.
 */
export default class IndiwareAPIWrapper {
	private api: IndiwareAPI;

	/**
	 * Creates a new instance of the Indiware API.
	 * @param {BootstrapOptions} options The options to bootstrap the API with.
	 */
	constructor(private options: BootstrapOptions) {
		this.api = new IndiwareAPI(
			options.uri,
			{
				schoolnumber: options.schoolnumber,
				username: options.username,
				password: options.password,
			},
			options.axiosOptions,
		);
	}

	private parseXML(xml: string) {
		return new XMLParser({
			ignoreAttributes: false,
			parseAttributeValue: true,
			trimValues: true,
			// This is for security in parsing, so type-safty is better
			isArray: (_name, jpath, _isLeafNode, _isAttribute) => {
				if (ALWAYS_ARRAY_PATHS.indexOf(jpath) !== -1) return true;
				return false;
			},
		}).parse(xml);
	}

	private async requestSubstitutionPlan(endpoint: string): Promise<SubstitutionPlan> {
		const res = await this.api.makeRequest(endpoint);
		if (res.status === 404) throw new PlanNotFoundError(endpoint);
		if (res.status !== 200) throw new RequestFailedError(res.status, res.statusText);
		return new SubstitutionPlanParser().parse(this.parseXML(res.data));
	}

	async getNewestSubstitutionPlan(): Promise<SubstitutionPlan> {
		return this.requestSubstitutionPlan(IndiwareAPIEndpoints.GET_NEXT_SUBSTITUTION_PLAN);
	}

	async getSubstitutionPlanForDate(date: Date): Promise<SubstitutionPlan> {
		return this.requestSubstitutionPlan(IndiwareAPIEndpoints.GET_SUBSTITUTION_PLAN(date));
	}

	/**
	 * @returns {string} The URI where the Indiware API is located.
	 */
	get uri(): string {
		return this.options.uri;
	}

	/**
	 * @returns {string} The username of the user to login with.
	 */
	get username(): string {
		return this.options.username;
	}

	/**
	 * @returns {string} The password of the user to login with.
	 */
	get password(): string {
		return this.options.password;
	}
}

// Export all interfaces
export {
	Course,
	Credentials,
	ISubstitutionPlan,
	Lesson,
	PlannedLesson,
	Room,
	SchoolClass,
	SubstitutionPlan,
	Teacher,
};

// Export all parsers
export {
	CourseParser,
	LessonParser,
	PlannedLessonParser,
	SchoolClassParser,
	SubstitutionPlanParser,
};
