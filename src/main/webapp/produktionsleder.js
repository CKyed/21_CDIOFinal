$(document).ready(function () {
    loadRaavarerBatch();

});

function loadRaavarerBatch() {
    $.get('rest/raavarebatch', function (data, textStatus, req) {
        $("#raavarebatchtable").empty();
       // $("#raavare").empty();
        $.each(data, function (i, elt) {
            $('#raavarebatchtable').append(generateRaavareBatchTable(elt));
           // $('#raavare').append(generateRaavareList(elt));
        });
    });
}
function generateRaavareBatchTable(raavarebatch) {
    return '<tr><td>' + raavarebatch.raavareBatchID + '</td>' +
        '<td>' + raavarebatch.raavareBatchMængde + '</td>' +
        '<td>' + raavarebatch.raavareBatchLeverandoer + '</td>'+
        '</tr>'
}


function createRaavareBatch() {
    event.preventDefault();
    var data =$('#raavareBatchForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavarebatch',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavarerBatch();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}

/*
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

*/
