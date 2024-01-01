class SchoolnumberWrongLengthError extends Error {
	constructor() {
		super('Schoolnumber must be 8 digits long');
	}
}

export { SchoolnumberWrongLengthError };
