$(document).ready(function () {
    loadRecepter();
});

function loadRecepter() {
    $.get('rest/recept/', function (data, textStatus, req) {
        $("#receptTable").empty();
        $.each(data, function (i, elt) {
            $('#receptTable').append(generateReceptHTML(elt));
        });
    });
}

function generateReceptHTML(elt) {
    return '<tr><td>' + elt.receptId + '</td>' +
        '<td>' + elt.receptNavn + '</td></tr> ';
}