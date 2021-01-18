var uri = "my test.asp?name=ståle&car=saab";
var macInput = ""
var winImput = "Z:\Clients\Syngenta\Syngenta LG\Turf\2019\Multibrand\Fungicide Efficacy Chart"
var res = encodeURI(winImput);
var serverName = "smb://10.60.50.20/Data/"
var driveName = "\\\\10.60.20.46\\"
var baseUrl = "smb://10.60.50.20/Data/"

$(function() {
  $('input').on('change', function() {
    var input = $(this);
    if (input.val().length) {
      input.addClass('populated');
    } else {
      input.removeClass('populated');
    }
  });

  setTimeout(function() {
    $('#fname').trigger('focus');
  }, 500);
});

