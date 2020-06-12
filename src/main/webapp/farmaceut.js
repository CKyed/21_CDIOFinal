$(document).ready(function () {
    loadRaavarer();

});

function loadRaavarer() {
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable").empty();
        $("#raavare").empty();
        $.each(data, function (i, elt) {
            $('#raavaretable').append(generateRaavareTable(elt));
            $('#raavare').append(generateRaavareList(elt));
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
    var HTML = '<tr><td>' + 'receptId' + '</td>' +
        '<td>' + document.getElementById("raavare").value + '</td>' +
        '<td>' + document.getElementById("netto").value + '</td>' +
        '<td>' + document.getElementById("tolerance").value + '</td>' +
        '<td><button>Slet linje</button></td></tr> '
    console.log(HTML);
    $('#receptkomptablebody').append(HTML);

}

function  generateRaavareList(raavare) {
    return '<option>' +raavare.raavareNavn +'</option>'
}


