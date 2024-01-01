import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import { SchoolnumberWrongLengthError } from './errors';
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
export default class IndiwareAPI {
	/**
	 * Creates a new instance of the Indiware API.
	 * @param {BootstrapOptions} options The options to bootstrap the API with.
	 */
	constructor(private options: BootstrapOptions) {
		if (options.schoolnumber.length !== 8) {
			throw new SchoolnumberWrongLengthError();
		}
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

//// TEST ////
const xml = readFileSync('./src/parser/example.xml', 'utf-8');
const obj = new XMLParser({
	ignoreAttributes: false,
	parseAttributeValue: true,
	trimValues: true,
	// This is for security in parsing, so type-safty is better
	isArray: (_name, jpath, _isLeafNode, _isAttribute) => {
		if (ALWAYS_ARRAY_PATHS.indexOf(jpath) !== -1) return true;
		return false;
	},
}).parse(xml);
const plan = new SubstitutionPlanParser().parse(obj);
console.log(plan);
