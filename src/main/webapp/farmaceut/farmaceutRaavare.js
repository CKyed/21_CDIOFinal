$(document).ready(function () {
    loadRaavarer();
});
var raavareList = [];
var raavareTable = document.getElementById('raavaretable');

function loadRaavarer() {
    //empty existing list
    while (raavareList.pop() != null){}
    raavareList = [];
    console.log("raavareList lige inden load"+ raavareList);

    //Load via GET-call to database
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable").empty();
        $("#raavare").empty();
        $.each(data, function (i, elt) {
            raavareList.push(elt);
        });
        generateRaavareTable();
    });
}

function generateRaavareTable() {
    //Make sure, raavareTable is updated
    raavareTable = document.getElementById('raavaretable');
    for(var i = raavareTable.rows.length - 1; i > 0; i--)
    {
        raavareTable.deleteRow(i);
    }
    console.log(raavareList);

    //fill the table with elements from raavareList
    $.each(raavareList, function (i, elt) {
        var row = raavareTable.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = elt.raavareID;
        cell2.innerHTML = elt.raavareNavn;
        cell3.innerHTML = elt.leverandoer;
    });

    //set the table in the HTML document by id
    //$('#raavaretable').value = raavareTable;
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
        error: function (jqXHR) {
            alert(jqXHR.responseText);

        }
    })
}

function validateOpdateInputs() {
    //Input validation
    if (!document.getElementById('opretRaavareID').value) {
        alert("Venligst! Angiv et gyldigt Råvare ID.")
        return
    } else if (!document.getElementById('opretRaavareNavn').value) {
        alert("Venligst! Skriv navnet på det råvare du gerne vil oprette.")
    } else if (!document.getElementById('opretLeverandoer').value) {
        alert("Skriv venligst navnet på leverandøren")
    } else {
        createRaavare()
        return;
        //check if ID vacant in separate function to avoid async errors
        //rbIdVacant(document.getElementById('opretRaavareBatchID').value);

    }
}

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
            loadRaavarer();
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }

    })
}

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
            errormessage.innerHTML="Kunne ikke finde råvarer med det ID, prøv igen";
        }
    })
}




