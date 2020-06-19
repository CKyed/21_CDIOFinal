$(document).ready(function () {
    loadRaavareBatch();
    loadRaavarer();
});
var raavareList = [];
var raavareBatchList = [];
var raavareBatchTable = document.getElementById('raavarebatchtable');

function loadRaavarer() {
    //empty existing list
    raavareList = [];
    raavareOptionList = document.getElementById('raavare');

    //Load via GET-call to database
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavare").empty();
        $.each(data, function (i, elt) {
            raavareList.push(elt);
            var raavareOption = document.createElement("OPTION");
            raavareOption.setAttribute("value", i);
            var t = document.createTextNode(elt.raavareNavn + "; " + elt.raavareID);
            raavareOption.appendChild(t);
            raavareOptionList.appendChild(raavareOption);
        });
    });
}

function loadRaavareBatch() {
    //empty existing list
    raavareBatchList = [];
    console.log("raavareBatchList lige inden load"+ raavareBatchList);

    //Load via GET-call to database
    $.get('rest/raavarebatch', function (data, textStatus, req) {
        $("#raavarebatchtabletable").empty();
        $.each(data, function (i, elt) {
            raavareBatchList.push(elt);
        });
        generateRaavareBatchTable();
    });
}

function generateRaavareBatchTable() {
    //Make sure, raavareTable is updated
    raavareBatchTable = document.getElementById('raavarebatchtable');
    $("#raavarebatchtable").empty();

    console.log("raavareBatchList "+ raavareBatchList);

    //fill the table with elements from raavareList
    $.each(raavareBatchList, function (i, elt) {
        var row = raavareBatchTable.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = elt.rbId;
        cell2.innerHTML = elt.maengde;
        cell3.innerHTML = elt.raavare.raavareID;
        cell4.innerHTML = elt.raavare.raavareNavn;
    });
}
function validateRaavareBatchInputs() {
    //Input validation
    var maengde = document.getElementById('RaavareBatchMaengde').value;
    if ( maengde< 0.0001 || maengde > 999.9999){
        alert("Angiv en mængde først.");
        return
    }

    if (!document.getElementById('opretRaavareBatchID').value){
        alert("Angiv et råvarebatch ID.")
        return;
    }

    //check if ID vacant in separate function to avoid async errors
    rbIdVacant(document.getElementById('opretRaavareBatchID').value);




}

function createRaavareBatch() {
    event.preventDefault();

    //Create JSON object
    var raavare = raavareList[document.getElementById('raavare').value];
    console.log("raavare: " + raavare.raavareNavn);
    var raavarebatch = {
        "rbId": document.getElementById('opretRaavareBatchID').value,
        "raavare": raavare,
        "maengde": document.getElementById('RaavareBatchMaengde').value

    }
    var data =JSON.stringify(raavarebatch);

    //REST POST call
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
            errormessage.innerHTML="Kunne ikke finder råvarer med det ID, prøv igen";
        }
    })
}

function validateMaengdeInput() {
    var value = document.getElementById("RaavareBatchMaengde").value;
    if (value > 999.9999) {
        document.getElementById("RaavareBatchMaengde").value = 999.9999;
    } else if (value < 0.0001){
        document.getElementById("RaavareBatchMaengde").value = 0.0001;
    }
}

function validateIdInput() {
    var value = document.getElementById("opretRaavareBatchID").value;
    if (value > 99999999) {
        document.getElementById("opretRaavareBatchID").value = 99999999;
    } else if (value < 0){
        document.getElementById("opretRaavareBatchID").value = 0;
    }
}

function rbIdVacant(proposedId){
    $.ajax({
        method: 'GET',
        url:'rest/raavarebatch/'+proposedId+'/',
        success: function () {
            console.log("Get-kaldet var en succes. Det betyder at ID'et er optaget.");
            alert("Råvarebatch ID'et er allerede i brug.")
        },
        error: function () {
            console.log("Get-kaldet var en fiasko. Det betyder at ID'et er ledigt.");
            createRaavareBatch();
        }
    })
}


