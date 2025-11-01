import config from "../lib/config.js"
import {si} from "../lib/common.js"

async function loadForm() {
	let data = await config.get();

	si("url").value = data.url;
}

async function resetHandler() {
	config.reset();
	loadForm();
}

async function submitHandler() {
	config.save({
		url: si("url").value,
	});
}

si("config").addEventListener("reset", resetHandler);
si("config").addEventListener("submit", submitHandler);

document.addEventListener("DOMContentLoaded", loadForm);
