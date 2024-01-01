import { XMLParser } from 'fast-xml-parser'
import { SchoolnumberWrongLengthError } from './errors'
import { readFileSync } from 'fs'
import { SubstitutionPlanParser } from './parser/substitutionPlan'

type BootstrapOptions = {
  /**
   * The URI where the Indiware API is located.
   *
   * @example "https://stundenplan24.de"
   */
  uri: string

  /**
   * The school number of the school to get the data from.
   * Has to be 8 digits long.
   *
   * @example "12345678"
   */
  schoolnumber: string

  /**
   * The username of the user to login with.
   * This can be changed later.
   *
   * @example "schueler", "lehrer"
   */
  username: string

  /**
   * The password of the user to login with.
   * This can be changed later.
   */
  password: string
}

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
      throw new SchoolnumberWrongLengthError()
    }
  }

  /**
   * @returns {string} The URI where the Indiware API is located.
   */
  get uri(): string {
    return this.options.uri
  }

  /**
   * @returns {string} The username of the user to login with.
   */
  get username(): string {
    return this.options.username
  }

  /**
   * @returns {string} The password of the user to login with.
   */
  get password(): string {
    return this.options.password
  }
}

//// TEST ////
const xml = readFileSync('./src/parser/example.xml', 'utf-8')
const obj = new XMLParser().parse(xml)
const plan = new SubstitutionPlanParser().parse(obj)
console.log(plan)
