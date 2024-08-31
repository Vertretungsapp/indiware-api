import { AxiosRequestConfig } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { IndiwareAPI } from './api/index.js';
import { IndiwareAPIEndpoints } from './api/routes.js';
import { PlanNotFoundError, RequestFailedError } from './errors/index.js';
import { SubstitutionPlan } from './interface/substitutionPlan.js';
import { SubstitutionPlanParser } from './parser/substitutionPlan.js';
import { parseAvailableDates } from './parser/infoFile.js';

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

	/**
	 * Tests the connection to the Indiware API.
	 * @returns {Promise<boolean>} Whether the connection was successful.
	 * @throws {RequestFailedError} If the request failed.
	 */
	async testConnection(): Promise<boolean> {
		const res = await this.api.makeRequest(IndiwareAPIEndpoints.GET_INFO_TXT);
		switch (res.status) {
			case 200:
				return true;
			case 401:
				return false;
			default:
				throw new RequestFailedError(res.status, res.statusText);
		}
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

	/**
	 * @deprecated Use {@link IndiwareAPIWrapper#fetchSubstitutionPlan} instead.
	 */
	async getNewestSubstitutionPlan(): Promise<SubstitutionPlan> {
		return this.requestSubstitutionPlan(IndiwareAPIEndpoints.GET_NEXT_SUBSTITUTION_PLAN);
	}

	/**
	 * @deprecated Use {@link IndiwareAPIWrapper#fetchSubstitutionPlan} instead.
	 */
	async getSubstitutionPlanForDate(date: Date): Promise<SubstitutionPlan> {
		return this.requestSubstitutionPlan(IndiwareAPIEndpoints.GET_SUBSTITUTION_PLAN(date));
	}

	/**
	 * Fetches a substitution plan from the Indiware API.
	 * @param {Date | undefined} date The date to get the substitution plan for. If not provided, the current substitution plan will be fetched.
	 * @returns {Promise<SubstitutionPlan>} The fetched substitution plan.
	 * @throws {PlanNotFoundError} If the plan could not be found.
	 * @throws {RequestFailedError} If the request failed.
	 */
	async fetchSubstitutionPlan(date?: Date): Promise<SubstitutionPlan> {
		return this.requestSubstitutionPlan(date ? IndiwareAPIEndpoints.GET_SUBSTITUTION_PLAN(date) : IndiwareAPIEndpoints.GET_NEXT_SUBSTITUTION_PLAN);
	}

	/**
	 * Fetches multiple substitution plans from the Indiware API.
	 * @param {Date[]} dates The dates to get the substitution plans for.
	 * @returns {Promise<SubstitutionPlan[]>} The fetched substitution plans.
	 * @throws {PlanNotFoundError} If a plan could not be found.
	 * @throws {RequestFailedError} If the request failed.
	 */
	async fetchSubstitutionPlans(dates: Date[]): Promise<SubstitutionPlan[]> {
		const plans: SubstitutionPlan[] = [];
		for (const date of dates) {
			plans.push(await this.fetchSubstitutionPlan(date));
		}
		return plans;
	}

	/**
	 * Fetches the available dates for the future substitution plans from the Indiware API.
	 * @returns {Promise<Date[]>} The available dates for the future substitution plans.
	 * @throws {RequestFailedError} If the request failed.
	 */
	async fetchAvailableDates(): Promise<Date[]> {
		const res = await this.api.makeRequest(IndiwareAPIEndpoints.GET_INFO_TXT);
		if (res.status !== 200) throw new RequestFailedError(res.status, res.statusText);
		return parseAvailableDates(res.data);
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

export * from './api/index.js';
export * from './errors/index.js';
export * from './interface/index.js';
export * from './parser/index.js';
export { BootstrapOptions };
