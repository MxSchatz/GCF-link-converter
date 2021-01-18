// $(function() {
//   $('input').on('change', function() {
//     var input = $(this);
//     if (input.val().length) {
//       input.addClass('populated');
//     } else {
//       input.removeClass('populated');
//     }
//   });

//   setTimeout(function() {
//     $('#fname').trigger('focus');
//   }, 500);
// });



function goGrabIt() {

  var path = String.raw`Z:\Clients\Syngenta\Syngenta LG\Turf\2019\Multibrand\Fungicide Efficacy Chart`;
  path = document.getElementById("winLink").value;
  path = path.replace(/\\/g, "/");
  path = path.replace("Z:/");
  path = path.split(' ').join("%20");
  var drive = /(.)\:\//;

  //Turn into URL object
  var uri = new URL(`smb://10.60.50.20/Data/${path}`).href;
  var plainText = document.createTextNode(uri);

  //take current text of div

var thing = document.getElementById('clickResults').textContent;

if (thing.length > 1) {
    //remove current text
      document.getElementById('clickResults').removeChild(resultsLink);
      document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
      document.getElementById('resultsLink').appendChild(plainText);
      console.log("replacing current link");
  } else {
    //deliver to div
    document.getElementById('clickResults').innerHTML = '<a id="resultsLink" href="'+uri+'"></a>';
    document.getElementById('resultsLink').appendChild(plainText);
  }
}

function goGrabItDeux() {
  var submitBtn=document.querySelector('#submit-path');
  submitBtn.addEventListener('click',submitPath);

  function submitPath(e){
  var userPath=document.querySelector('#file-path').value;
  var path = String.raw`${userPath}`;
  }
}

function clipboardGab(){
  // Send to Clipboard
  const el=document.createElement('textarea');
  el.value=uri;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Copied converted path");
}

function clearIt(){
  document.getElementById('winLink').value = '';
}
