const defaults = {
	url: "http://localhost:5743",
}

async function get() {
	return await browser.storage.sync.get(defaults);
}

async function reset() {
	await browser.storage.sync.set(defaults);
}

async function save(obj) {
	await browser.storage.sync.set(obj);
}

export default {
	defaults,
	get,
	reset,
	save,
}
