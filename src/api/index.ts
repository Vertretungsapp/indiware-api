import axios, { AxiosRequestConfig } from 'axios';
import { SchoolnumberUnallowedCharsError, SchoolnumberWrongLengthError } from '../errors';

export interface Credentials {
	schoolnumber: string;
	username: string;
	password: string;
}

export class IndiwareAPI {
	constructor(
		private uri: string,
		private credentials: Credentials,
		private axiosOptions?: AxiosRequestConfig,
	) {
		if (credentials.schoolnumber.length !== 8) {
			throw new SchoolnumberWrongLengthError();
		}

		if (!/^[0-9]*$/.test(credentials.schoolnumber)) {
			throw new SchoolnumberUnallowedCharsError();
		}
	}

	createRequestURL(endpoint: string) {
		const uri = this.uri.endsWith('/') ? this.uri.slice(0, -1) : this.uri;
		return `${uri}/${this.credentials.schoolnumber}${endpoint}`;
	}

	makeRequest(endpoint: string) {
		return axios.get(this.createRequestURL(endpoint), {
			auth: {
				username: this.credentials.username,
				password: this.credentials.password,
			},
			...this.axiosOptions,
		});
	}
}
