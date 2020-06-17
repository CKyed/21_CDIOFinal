$(document).ready(function () {
    loadRaavareBatch();
});
var raavareBatchList = [];
var raavareBatchTable = document.getElementById('raavarebatchtable');

function loadRaavareBatch() {
    //empty existing list
    while (raavareBatchList.pop() != null){}
    raavareBatchList = [];
    console.log("raavareList lige inden load"+ raavareBatchList);

    //Load via GET-call to database
    $.get('rest/raavarebatch', function (data, textStatus, req) {
        $("#raavarebatchtabletable").empty();
       // $("#raavare").empty();
        $.each(data, function (i, elt) {
            raavareBatchList.push(elt);
        });
        generateRaavareBatchTable();
    });
}

function generateRaavareBatchTable() {
    //Make sure, raavareTable is updated
    raavareBatchTable = document.getElementById('raavarebatchtable');
    for(var i = raavareBatchTable.rows.length - 1; i > 0; i--)
    {
        raavareBatchTable.deleteRow(i);
    }
    console.log(raavareBatchList);

    //fill the table with elements from raavareList
    $.each(raavareBatchList, function (i, elt) {
        var row = raavareBatchTable.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = elt.raavareBatchID;
        cell2.innerHTML = elt.raavareBatchMængde;
        cell3.innerHTML = elt.raavareBatchLeverandoer;
    });

    //set the table in the HTML document by id
    //$('#raavaretable').value = raavareTable;
}


function createRaavareBatch() {
    event.preventDefault();
    var data =$('#raavareBatchFormForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavarebatch',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavareBatch();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}
/*
function updateRaavare() {
    event.preventDefault();
    var data =$('#raavareUdateForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavare',
        method: 'PUT',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavareBatch();
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }

    })
}

 */

function loadSpecificRaavare() {
    var id = document.getElementById("RaavareId").value;
    var errormessage;
    errormessage = document.getElementById("errorMessage");
    //  console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/raavare/'+id,
        success: function (data) {
            errormessage.innerHTML="";
            console.log(data);
            console.log(data.aktiv);
            document.getElementById("updateRaavareNavn").value = data.raavareNavn;
            document.getElementById("updateLeverandoer").value = data.leverandoer;
        },
        error: function () {
            errormessage.innerHTML="Kunne ikke finder råvarer med det ID, prøv igen";
        }
    })
}



