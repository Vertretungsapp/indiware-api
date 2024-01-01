export interface IndiwareParser<T> {
	parse(xml: any): T;
}
