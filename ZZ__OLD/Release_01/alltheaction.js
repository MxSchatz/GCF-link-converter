var submitBtn=document.querySelector('#submit-path');
submitBtn.addEventListener('click',submitPath);

function submitPath(e){
var userPath=document.querySelector('#file-path').value;
var path = String.raw`${userPath}`;

document.getElementById("demResultsMayne").style.display = "block";
// Tidying
path = path.replace(/\\/g, "/");
path=path.split(' ').join("%20");
path=path.replace('Z:\/',"");

//Turn into URL object
var uri = new URL(`smb://10.60.50.20/Data/${path}`).href;
var plainText = document.createTextNode(uri);

// Send to Clipboard
const el=document.createElement('textarea');
el.value=uri;
document.body.appendChild(el);
el.select();
document.execCommand("copy");
document.body.removeChild(el);

var thing = document.getElementById('clickResults').textContent;
if (thing.length > 1) {

        //remove current text if there is any
        document.getElementById('clickResults').removeChild(resultsLink);

        //deliver to div
        document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
        document.getElementById('resultsLink').appendChild(plainText);

    } else {

      //deliver to div
      document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
      document.getElementById('resultsLink').appendChild(plainText);
  }

}

function goGrabIt() {

  //show results
  document.getElementById("demResultsMayne").style.display = "block";

  // var  = document.getElementById("winLink").value;
  var path = document.getElementById("winLink").value;

  path = path.replace(/\\/g, "/");
  path = path.replace("Z:/");
  path = path.split(' ').join("%20");
  var drive = /(.)\:\//;

  //Turn into URL object
  var uri = new URL(`smb://10.60.50.20/Data/${path}`).href;
  console.log(uri);
  var plainText = document.createTextNode(uri);
  console.log(plainText);


  //sore variable for if statement
  var thing = document.getElementById('clickResults').textContent;

  if (thing.length > 1) {

        //remove current text if there is any
        document.getElementById('clickResults').removeChild(resultsLink);

        //deliver to div
        document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
        document.getElementById('resultsLink').appendChild(plainText);

    } else {

      //deliver to div
      document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
      document.getElementById('resultsLink').appendChild(plainText);
  }

}

  function clearIt(){
    document.getElementById('file-path').value = '';
  }
