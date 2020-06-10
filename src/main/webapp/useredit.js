$(document).ready(function () {
    loadBruger();
});


function loadBruger() {
    $.get('rest/user', function (data, textStatus, req) {
        $("#burgerTable").empty();
        $.each(data, function (i, elt) {
            $('#burgerTable').append(generateBrugerTable(elt));
        });
    });
}

function generateBrugerTable(bruger) {
    return '<tr><td>' + bruger.brugerID + '</td>' +
        '<td>' + bruger.rolle + '</td>' +
        '<td>' + bruger.brugerNavn + '</td>' +
        '<td>' + bruger.initialer + '</td>' +
        '<td>' + bruger.cpr + '</td>'
}


