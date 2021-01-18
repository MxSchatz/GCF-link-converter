$(document).ready(function () {
    $('#toUrl').click(toUrl);
    $('#toLink').click(toLink);
});

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

function filePathToUrl(path) {
    path = path.replaceAll('\\', '/');
    path = path.replaceAll(' ', '%20');
    var drive = /(.)\:\//
    return path.replace(drive, 'file:///$1:/');
}

function toUrl() {
    var string = $('#textArea ').val();
    $('#textArea ').val(filePathToUrl(string));
}

function toLink() {
    var string = $('#textArea').val();
    var link = $('<a>', {
        text: string,
        //text: string.replaceAll('\\','\\\\'),
        //text: string.slice(string.lastIndexOf('\\')+1),
        title: 'open file',
        href: filePathToUrl(string)
    });
    $('#textArea ').val(link.outerHTML());
    $('#test').append(link.wrap('<li>'));
}

/*
 * Return outerHTML for the first element in a jQuery object,
 * or an empty string if the jQuery object is empty;
 */
jQuery.fn.outerHTML = function () {
    return (this[0]) ? this[0].outerHTML : '';
};
