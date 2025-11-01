export function sc(className, element) {
	if (!element) {
		element = document;
	}

	return element.querySelector(`.${className}`);
}

export function si(id, element) {
	if (!element) {
		element = document;
	}

	return element.getElementById(id);
}

export default {
	sc,
	si,
}
