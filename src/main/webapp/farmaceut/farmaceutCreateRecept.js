$(document).ready(function () {
    loadRaavarer();
});
var raavareList = [];
var raavareOptionList = document.getElementById('raavare');
var maxReceptId = 99999999;
var maxTolerance = 10;
var minTolerance = 0.1;
var maxNetto = 10;
var minNetto = 0.1;

function validateNettoInput() {
    var value = document.getElementById("netto").value;
    if (value > maxNetto) {
        document.getElementById("netto").value = maxNetto;
    } else if (value < minNetto){
        document.getElementById("netto").value = minTolerance;
    }
}

function validateToleranceInput() {
    var value = document.getElementById("tolerance").value;
    if (value > maxTolerance) {
        document.getElementById("tolerance").value = maxTolerance;
    } else if (value < minTolerance){
        document.getElementById("tolerance").value = minTolerance;
    }
}



function loadRaavarer() {
    //empty existing list
    raavareList = [];

    //Load via GET-call to database
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable").empty();
        $("#raavare").empty();
        $.each(data, function (i, elt) {
            raavareList.push(elt);
        });
        generateRaavareOptionList();
    });
}


function generateRaavareOptionList() {
    $("#raavare").empty();
    raavareOptionList = document.getElementById('raavare');


    $.each(raavareList, function (i, elt) {
        var raavareOption = document.createElement("OPTION");
        raavareOption.setAttribute("value", i);
        var t = document.createTextNode(elt.raavareNavn + "; " + elt.raavareID);
        raavareOption.appendChild(t);
        raavareOptionList.appendChild(raavareOption);
    });

}

function addReceptKomp() {
    // TODO find ud af, hvorfor denne giver fejlen Uncaught TypeError: Cannot read property 'value' of undefined
    //Men alligevel virker

    if (raavareOptionList.length==0){
        return;
    }

    var table = document.getElementById("receptkomptablebody");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var selectedRaavareId = raavareList[document.getElementById("raavare").value].raavareID;
    cell1.innerHTML = raavareList[document.getElementById("raavare").value].raavareNavn;
    cell2.innerHTML = selectedRaavareId;
    cell3.innerHTML = document.getElementById("netto").value;
    cell4.innerHTML = document.getElementById("tolerance").value;
    cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow()"></td>';

    //Remove the option from the raavareOptionList
    raavareOptionList = document.getElementById('raavare');
    const index = document.getElementById("raavare").value;
    console.log(raavareOptionList);
    $.each(raavareOptionList, function (i, elt) {
        if (elt.value == index){
            raavareOptionList.removeChild(elt);
        }
    });

}

function deleteRow() {
    var td = event.target.parentNode;

    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);

    //Return the raavare to the raavareOptionList
    var removedRaavareId = $(tr).find('td:eq(1)').text();
    console.log("removed raavareId:" + removedRaavareId);
    addToRaavareOptionList(removedRaavareId);
}

function checkIfReceptIdValid() {
    //Returns true only if the id was valid. Gives explaination otherwise
    //Also updates the headline of the Recept box

    var receptID =document.getElementById('receptid').value;
    var vacant = receptIdVacant(receptID);
    console.log("vacant "+vacant);

    if (receptID> maxReceptId){
        alert("Receptens ID er for langt.");
        return false;
    } else if (vacant){
        if (checkIfReceptNavnValid()){
            var header = document.getElementById("receptnavn").value + ", " + receptID;
            document.getElementById("receptHeadline").innerText = header;
            return true;
        }

    } else {
        alert("Receptens ID er allerede i brug");
        return false;
    }
}

function saveReceptToDatabase() {
    //First runs some checks to see, if everything is fine. Then writes to database
    //checks if all input fields are valid - otherwise returns (does not write to DB)

    //TODO denne fejlmeddelelse kommer samtidig med "receptens ID/navn er for langt/allerede i brug" når man forsøger at gemme til databasen
    if (!checkIfReceptIdValid()){
        alert("Noget gik galt");
        return;
    }

    event.preventDefault();

    var recept = {
        "receptId": document.getElementById('receptid').value,
        "receptNavn": document.getElementById('receptnavn').value,
        "receptKomponenter": getReceptKomponenterJSON()

    }
    data =JSON.stringify(recept);

    console.log(data);
    $.ajax({
        url: 'rest/recept',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            switchPage("farmaceut/farmaceutCreateRecept.html");
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    })
}


function getReceptKomponenterJSON() {
    var TableData = new Array();
    $('#receptkomptablebody tr').each(function(row, tr){
        var raavareId = $(tr).find('td:eq(1)').text();
        var raavare = getRaavareById(raavareId);
        TableData[row]={
            "nonNetto" : $(tr).find('td:eq(2)').text()
            , "tolerance" : $(tr).find('td:eq(3)').text()
            , "raavare" : {
                "raavareID": raavare.raavareID,
                "raavareNavn": raavare.raavareNavn,
                "leverandoer": raavare.leverandoer
            } ,"receptId" : document.getElementById('receptid').value
        }
    });
    console.log(TableData);
    return TableData;
}


function receptIdVacant(proposedId){
    var vacant;
    $.ajax({
        async: false,//TODO overvej om dette er smart
        method: 'GET',
        url:'rest/recept/'+proposedId+'/',
        success: function () {
            vacant = false;
            console.log("Get-kaldet var en succes");
        },
        error: function () {
            vacant = true;
            console.log("Get-kaldet var en fiasko");

        }
    })
    return vacant;

}
/*
function validateReceptInputFields() {
    //Returns true, if everything is fine. Returns false otherwise and displays messages.

    var everyThingOK = checkIfReceptNavnValid() && checkIfReceptIdValid();
    console.log("EverythingOK: " + everyThingOK);
    return everyThingOK;
}

 */

function checkIfReceptNavnValid(){
    //Returns true only if the receptNavn is valid

    var valid = true;
    var receptNavn =document.getElementById("receptnavn").value;
    if (receptNavn.length ===0){
        alert("Recepten skal have et navn");
        valid = false;
    } else if (receptNavn.length >20){
        alert("Receptens navn er for langt");
        valid = false;
    } else if (receptNavn.includes(";")){
        alert("Receptens navn må ikke indeholde semikolon");
        valid = false;
    }
    return valid;
}

function getRaavareById(raavareId){
    var returnObject;
    $.each(raavareList, function (i,elt) {
        if (elt.raavareID == raavareId){
            returnObject = elt;
            return;
        }
    });
    return returnObject;
}

function addToRaavareOptionList(raavareId) {
    var raavare;
    var index;
    $.each(raavareList, function (i,elt) {
        if (elt.raavareID == raavareId){
            raavare = elt;
            index = i;
            return;
        }
    });
    console.log(raavare);
    console.log(index);

    raavareOptionList = document.getElementById('raavare');
    console.log(raavare);
    var raavareOption = document.createElement("OPTION");
    raavareOption.setAttribute("value", index);
    var t = document.createTextNode(raavare.raavareNavn + "; " + raavare.raavareID);
    raavareOption.appendChild(t);
    raavareOptionList.appendChild(raavareOption);
}


