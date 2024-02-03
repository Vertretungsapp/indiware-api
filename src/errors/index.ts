class SchoolnumberWrongLengthError extends Error {
	constructor() {
		super('Schoolnumber must be 8 digits long');
	}
}

class SchoolnumberUnallowedCharsError extends Error {
	constructor() {
		super('Schoolnumber can only contain numbers');
	}
}

class RequestFailedError extends Error {
	constructor(
		private status: number,
		private statusText: string,
	) {
		super(`Request failed with status ${status} (${statusText})`);
	}

	getStatus(): number {
		return this.status;
	}

	getStatusText(): string {
		return this.statusText;
	}
}

class PlanNotFoundError extends Error {
	constructor(endpoint: string) {
		super(`Plan not found, requested ${endpoint}`);
	}
}

export {
	PlanNotFoundError,
	RequestFailedError,
	SchoolnumberUnallowedCharsError,
	SchoolnumberWrongLengthError,
};
