// var submitBtn=document.querySelector('#submit-path');
// submitBtn.addEventListener('click',submitPath);

const WINDOWSPREFIX = 'file:///S:\\';
const MACPREFIX = 'smb://gw-file/Shared/';

document.querySelector('#path-input').addEventListener('input', submitPath);

function getOS(path) {
	if (path.search(/^.:\\/) > -1) return 'windows';
	if (path.search(/^\/Volumes/i) > -1) return 'macos';
	return 'error';
	// return path.search(/\\/) > path.search(/\//);
}

function submitPath(e) {
	const userPath = document.querySelector('#path-input').value;

	if (userPath.length === 0) return;

	const path = String.raw`${userPath}`;
	const newPath = processPath(path);

	console.log(newPath);

	if (newPath === 'error') return;

	// document.getElementById('error-wrapper').innerHTML = '';

	//Turn into URL object
	const uri = new URL(newPath).href;

	// sendToClipboard(uri);
	printOutput(uri);
}

function processPath(path) {
	let newPath = '';
	const os = getOS(path);

	document.getElementById('main-content').dataset.os = os;

	if (os === 'error') return 'error';

	if (os === 'windows') {
		newPath = MACPREFIX + path.replace(/^.:\\/, '').replace(/\\/g, '/');
	} else {
		newPath = WINDOWSPREFIX + path.replace('/Volumes/Shared/', '').replace(/\//g, '\\');
	}

	return newPath.split(' ').join('%20');
}

function sendToClipboard(uri) {
	//Turn URI into plain text
	const plainText = document.createTextNode(uri);

	// Send to Clipboard
	const el = document.createElement('textarea');
	el.value = uri;
	document.body.appendChild(el);
	el.select();
	// document.execCommand('copy');
	document.body.removeChild(el);
}

function printOutput(uri) {
	const plainText = document.createTextNode(uri);

	// const resultsLink = document.getElementById('resultsLink');
	// if (resultsLink) document.getElementById('clickResults').removeChild(resultsLink);

	document.querySelector('#converted-output .results-link').setAttribute('href', uri);
	document.getElementById('output-wrapper').classList.remove('hidden');
	document.querySelectorAll('.notification').forEach((el) => {
		el.classList.remove('hidden');
	});
}

// var brokenBtn=document.querySelector('#submit-broken');
// brokenBtn.addEventListener('click',submitBroken);

// function submitPathOld(e){
//   var userPath=document.querySelector('#file-path').value;
//   var path = String.raw`${userPath}`;

//   console.log(isWindows(path));

//   //Show results HTML
//   document.getElementById("demResultsMayne").style.display = "block";

//   path = path.replace(/\\/g, "/");
//   path = path.split(' ').join("%20");
//   path = path.replace('Z:\/',"");
//   path = path.replace('//firm.gibbs-soell.net/data/',"");

//   //Turn into URL object
//   var uri = new URL(`smb://10.60.50.20/Data/${path}`).href;

//   //Turn URI into plain text
//   var plainText = document.createTextNode(uri);

//   // Send to Clipboard
//   const el=document.createElement('textarea');
//   el.value=uri;
//   document.body.appendChild(el);
//   el.select();
//   document.execCommand("copy");
//   document.body.removeChild(el);

//   // Prevent button from duplicating
//   var thing = document.getElementById('clickResults').textContent;
//   if (thing.length > 1) {
//         //remove current text if there is any
//         document.getElementById('clickResults').removeChild(resultsLink);
//         //deliver to div
//         document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
//         document.getElementById('resultsLink').appendChild(plainText);
//       document.getElementById('notification').innerHTML= 'The link has been copied to your clipboard </br> Click link above to mount on mac';
//     } else {
//       //deliver to div
//       document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
//       document.getElementById('resultsLink').appendChild(plainText);
//       document.getElementById('notification').innerHTML= 'The link has been copied to your clipboard </br> click link above to mount on mac';

//   }
// }

// function submitBroken(e){

// var userPath=document.querySelector('#file-path').value;
// var path = String.raw`${userPath}`;

// //Show results HTML
// document.getElementById("demResultsMayne").style.display = "block";

// path = path.replace(/\\/g, "/");
// path=path.split(' ').join("%20");

// path=path.replace('afp://10.60.20.46/',"");
// //Turn into URL object
// var uri = new URL(`afp://10.60.20.46/${path}`).href;

// //Turn URI into plain text
// var plainText = document.createTextNode(uri);

// // Send to Clipboard
// const el=document.createElement('textarea');
// el.value=uri;
// document.body.appendChild(el);
// el.select();
// document.execCommand("copy");
// document.body.removeChild(el);

// // Prevent button from duplicating
// var thing = document.getElementById('clickResults').textContent;
// if (thing.length > 1) {
//         //remove current text if there is any
//         document.getElementById('clickResults').removeChild(resultsLink);
//         //deliver to div
//         document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
//         document.getElementById('resultsLink').appendChild(plainText);
//         document.getElementById('notification').innerHTML= 'The link has been copied to your clipboard </br>It can now be pasted';

//         document.getElementById('demResultsMayne').style.display = "block";
//     } else {
//       //deliver to div
//       document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
//       document.getElementById('resultsLink').appendChild(plainText);
//       document.getElementById('notification').innerHTML= 'The link has been copied to your clipboard </br>It can now be pasted';

//       document.getElementById("demResultsMayne").style.display = "block";
//   }
// }

//Clear text field when selected
// function clearIt(){
//   document.getElementById('file-path').value = '';
//   document.getElementById("demResultsMayne").style.display = "none";
// }
