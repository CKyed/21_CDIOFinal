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

function addReceptKomp1() {
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

function addReceptKomp() {
    var table = document.getElementById("receptkomptablebody");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = document.getElementById("receptid").value;;
    cell2.innerHTML = document.getElementById("raavare").value;
    cell3.innerHTML = document.getElementById("netto").value;
    cell4.innerHTML = document.getElementById("tolerance").value;
    cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow()"></td>'

}

function deleteRow() {
    var td = event.target.parentNode;
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
}


