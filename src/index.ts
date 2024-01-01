import { log } from 'console';
import { XMLParser } from 'fast-xml-parser';
import { Credentials, IndiwareAPI } from './api';
import { IndiwareAPIEndpoints } from './api/routes';
import { PlanNotFoundError, RequestFailedError } from './errors';
import { SubstitutionPlan } from './interface/substitutionPlan';
import { SubstitutionPlanParser } from './parser/substitutionPlan';

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
		this.api = new IndiwareAPI(options.uri, {
			schoolnumber: options.schoolnumber,
			username: options.username,
			password: options.password,
		});
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
		if (!res.ok) throw new RequestFailedError(res.status, res.statusText);
		const body = await res.text();
		return new SubstitutionPlanParser().parse(this.parseXML(body));
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

const wrapper = new IndiwareAPIWrapper({
	uri: 'https://stundenplan24.de',
	schoolnumber: '10000000',
	username: 'schueler',
	password: 'schueler',
});

wrapper.getSubstitutionPlanForDate(new Date('2023-12-18')).then((plan) => {
	log(plan);
});

export { Credentials };
