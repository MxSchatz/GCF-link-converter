const WINDOWSPREFIX = 'file:///S:\\';
const MACPREFIX = 'smb://gw-file/Shared/';
const userOS = window.navigator.platform;

console.log('js loaded');
console.log(window.location.pathname);

if (window.location.pathname.search(/\/link\/$/) > -1) {
	processLink(window.location.search);
}

const pathInput = document.querySelector('#path-input');

if (pathInput) {
	pathInput.addEventListener('input', submitPath);
}

function processLink(queryString) {
	const params = new URLSearchParams(queryString);
	const pathFromLink = params.get('path');
	console.log(pathFromLink);

	const newPath = processPath(pathFromLink, true);
	console.log(newPath);

	const windowsURI = new URL(newPath.windows).href;
	const macosURI = new URL(newPath.macos).href;

	if (userOS === 'MacIntel') {
		copyToClipboard(macosURI);
	} else {
		copyToClipboard(windowsURI);
	}

	printOutputFromLink(windowsURI, macosURI);
	handleRedirects(windowsURI, macosURI);
}

function getOS(path, isFromLink) {
	// Important: the returned OS will be the OS used in the file path, which will be different from the user's OS
	if (isFromLink) return 'N/A';
	if (path.search(/^.:\\/) > -1 || path.search(/^file:\/\/\/.:/) > -1) return 'windows';
	if (path.search(/^\/Volumes/i) > -1 || path.search(/^smb:\/\/gw-file/) > -1) return 'macos';
	return 'error';
}

function submitPath(e) {
	const userPath = e.target.value.trim();

	if (userPath.length === 0) return;

	const path = String.raw`${userPath}`;
	const newPath = processPath(path);

	if (newPath === 'error') {
		document.getElementById('output-wrapper').classList.add('hidden');
		return;
	}

	const uri = new URL(newPath.local).href;
	const universal = new URL(getUniversalURL(newPath.webSafe));

	console.log(uri);
	copyToClipboard(uri);
	printOutput(uri, universal);
}

function processPath(path, isFromLink) {
	let newPath = '';
	let mainPath = '';
	const os = getOS(path, isFromLink);
	console.log('os:', os);

	if (!isFromLink) {
		document.getElementById('main-content').dataset.os = os;
	}

	if (os === 'windows' || isFromLink) {
		mainPath = path
			.replace(/smb:\/\//, '')
			.replace(/file:\/\/\//, '')
			.replace(/^.:[\\\/]/, '')
			.replace(/\\/g, '/');
	} else if (os === 'macos') {
		mainPath = path.replace('/Volumes/Shared/', '').replace(/^smb:\/\/gw-file\/Shared\//, '');
	} else if (!isFromLink) {
		return 'error';
	}

	mainPath = mainPath.split(' ').join('%20');

	const windowsPath = WINDOWSPREFIX + mainPath.replace(/\//g, '\\');
	console.log(windowsPath);
	const macosPath = MACPREFIX + mainPath;

	return {
		local: os === 'macos' ? windowsPath : macosPath,
		windows: windowsPath,
		macos: macosPath,
		webSafe: encodeURI(mainPath)
	};
}

function getUniversalURL(webSafe) {
	console.log('location', window.location);
	return window.location.protocol + window.location.host + window.location.pathname + 'link/?path=' + webSafe;
}

function sendToClipboardFallback(uri) {
	const el = document.createElement('textarea');

	el.value = uri;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	console.log(el.value);
	document.body.removeChild(el);
}

async function copyToClipboard(uri) {
	try {
		await navigator.clipboard.writeText(uri);
	} catch (err) {
		console.error('Failed to copy, will attempt fallback: ', err);
		sendToClipboardFallback(uri);
	}
}

function printOutput(uri, universal) {
	document.querySelector('#converted-output .results-link').setAttribute('href', uri);
	document.querySelector('#converted-output .results-link').innerText = uri;
	document.querySelector('#converted-output .results-text').innerText = uri;

	document.querySelector('#universal-output .results-link').innerText = universal;

	document.getElementById('output-wrapper').classList.remove('hidden');
}

function printOutputFromLink(windowsURI, macosURI) {
	document.querySelector('#windows-output .results-link').setAttribute('href', windowsURI);
	document.querySelector('#windows-output .results-link').innerText = windowsURI;
	document.querySelector('#macos-output .results-link').setAttribute('href', macosURI);
	document.querySelector('#macos-output .results-link').innerText = macosURI;
}

function handleRedirects(windowsURI, macosURI) {
	// currently only redirects for Mac users
	if (userOS === 'MacIntel') {
		window.location = macosURI;
	}
}
