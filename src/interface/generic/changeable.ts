/**
 * A changeable is an object that can be changed, which will be marked.
 */
export interface Changeable<T> {
	changed: boolean;
	value: T | null;
}
