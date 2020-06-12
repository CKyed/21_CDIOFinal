$(document).ready(function () {
    loadRaavarer();

});

function loadRaavarer() {
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable").empty();
        $.each(data, function (i, elt) {
            $('#raavaretable').append(generateRaavareTable(elt));
        });
    });
}
function generateRaavareTable(raavare) {
    return '<tr><td>' + raavare.raavareID + '</td>' +
        '<td>' + raavare.raavareNavn + '</td>' +
        '<td>' + raavare.leverandoer + '</td>'+
        '</tr>'
}

function createRaavare() {
    event.preventDefault();
    var data =$('#raavareForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavare',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavarer();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}

function addReceptKomp() {
    var HTML = '<tr><td>' + receptId + '</td>' +
        '<td>' + raavareid + '</td>' +
        '<td>' + netto + '</td>' +
        '<td>' + tolerance + '</td>' + '</tr>'
    $('#receptkomptablebody').append(HTML);
    console.log(HTML);
}


