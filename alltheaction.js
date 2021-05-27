const WINDOWSPREFIX = 'smb://S:\\';
const MACPREFIX = 'smb://gw-file/Shared/';

document.querySelector('#path-input').addEventListener('input', submitPath);

function getOS(path) {
	if (path.search(/^.:\\/) > -1) return 'windows';
	if (path.search(/^\/Volumes/i) > -1 || path.search(/^smb:\/\/gw-file/) > -1) return 'macos';
	return 'error';
}

function submitPath(e) {
	const userPath = e.target.value;

	if (userPath.length === 0) return;

	const path = String.raw`${userPath}`;
	const newPath = processPath(path);

	if (newPath === 'error') return;

	const uri = new URL(newPath).href;

	sendToClipboard(uri);
	printOutput(uri);
}

function processPath(path) {
	let newPath = '';
	const os = getOS(path);

	document.getElementById('main-content').dataset.os = os;

	if (os === 'windows') {
		newPath = MACPREFIX + path.replace(/^.:\\/, '').replace(/\\/g, '/');
	} else if (os === 'macos') {
		newPath =
			WINDOWSPREFIX +
			path
				.replace('/Volumes/Shared/', '')
				.replace(/^smb:\/\/gw-file\/Shared\//, '')
				.replace(/\//g, '\\');
	} else {
		return 'error';
	}

	return newPath.split(' ').join('%20');
}

function sendToClipboard(uri) {
	const el = document.createElement('textarea');

	el.value = uri;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function printOutput(uri) {
	document.querySelector('#converted-output .results-link').setAttribute('href', uri);
	document.querySelector('#converted-output .results-link').innerText = uri;
	// document.querySelector('#converted-output .results-text').innerText = uri;
	document.getElementById('output-wrapper').classList.remove('hidden');
}
