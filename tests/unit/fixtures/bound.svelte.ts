export class Bound<T> {
	current = $state() as T;

	constructor(initial: T) {
		this.current = initial;
	}
}
