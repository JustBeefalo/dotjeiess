import config from "../lib/config.js"

function* subdomains(hostname) {
	let names = hostname.split(".");
	for (let i = names.length - 1; i >= 0; --i) {
		yield names.slice(i, names.length).join(".");
	}

	yield "_." + hostname;
}

function* paths(pathname) {
	let normalized = pathname.replace(/^[/]+|[/]+$/g, "").replace(/[/]+/, "/");
	normalized = (normalized.length > 0 ? "/" : "") + normalized;

	let segments = normalized.split("/");
	for (let i = 0; i <= segments.length; ++i) {
		yield segments.slice(0, i).join("/");
	}
}

function* files(location) {
	yield "_global.js";
	yield "_global.css";

	for (let subdomain of subdomains(location.hostname)) {
		for (let path of paths(location.pathname)) {
			for (let ext of [".js", ".css"]) {
				yield "/" + subdomain + path + ext;
			}
		}
	}
}

async function fetchFile(url) {
	try {
		let response = await fetch(url);
		if (response.ok) {
			return await response.text();
		}
	}
	catch (e) {}

	return null;
}

async function inject(baseUrl, file, target) {
	let url = baseUrl + file;
	let text = await fetchFile(url);
	if (text == null) {
		console.debug("Failed to load script at " + url);
		return;
	}
	else {
		console.info("Attempting to load script at " + url);
	}

	if (file.endsWith(".js")) {
		await browser.scripting.executeScript({
			args: [text],
			func: (text) => {Function(text)();},
			injectImmediately: true,
			target: target,
			world: "MAIN",
		});
	}

	if (file.endsWith(".css")) {
		await browser.scripting.insertCSS({
			css: text,
			target: target,
		});
	}
}

async function injectAll(location, tab, frame) {
	let baseUrl = (await config.get()).url;
	let target = {
		frameIds: [frame],
		tabId: tab,
	};

	for (let file of files(location)) {
		try {
			await inject(baseUrl, file, target);
		}
		catch (e) {}
	}
}

browser.runtime.onMessage.addListener(async (message, sender) => {
	console.info("Page loaded at " + message.hostname + message.pathname);
	await injectAll(message, sender.tab.id, sender.frameId);

	return true;
});
