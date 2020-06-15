$(document).ready(function () {
    loadRaavarer();
    loadRecepter();
});
var raavareList = [];
var raavareOptionList = document.getElementById('raavare');
var receptList = [];
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



function loadRecepter() {
    //empty existing list
    receptList = [];

    //Load via GET-call to database
    $.get('rest/recept', function (data, textStatus, req) {
        $.each(data, function (i, elt) {
            receptList.push(elt);
        });
    });
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


    $.each(raavareList, function (i, elt) {
        if (elt.raavareID ===selectedRaavareId){
            raavareList.remove(i);
        }
    });

}

function deleteRow() {
    var td = event.target.parentNode;
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
}

function checkIfReceptIdValid() {
    //Returns true only if the id was valid. Gives explaination otherwise
    //Also updates the headline of the Recept box

    var receptID =document.getElementById('receptid').value;
    var vacant = receptIdVacant(receptID);

    if (receptID> maxReceptId){
        alert("Receptens ID er for langt.");
        return false;
    } else if (receptList.length ==0){
        alert("Vent et øjeblik til recepterne er loadet færdigt.");
        return false;
    } else if (vacant){
        var header = document.getElementById("receptnavn").value + ", " + receptID;
        document.getElementById("receptHeadline").innerText = header;
        return true;
    } else {
        alert("Receptens ID er allerede i brug.");
        return false;
    }
}

function saveReceptToDatabase() {
    //First runs some checks to see, if everything is fine. Then writes to database
    //checks if all input fields are valid - otherwise returns (does not write to DB)

    validateReceptInputFields();

    if (!validateReceptInputFields()){
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
            switchPage("farmaceutCreateRecept.html");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}


function getReceptKomponenterJSON() {
    var TableData = new Array();
    $('#receptkomptablebody tr').each(function(row, tr){
        var raavareText = $(tr).find('td:eq(0)').text();
        console.log(raavareText);
        var raavareIdList = raavareText.split(";");
        console.log(raavareIdList);
        var raavareId = raavareIdList[1];
        console.log(raavareId);

        TableData[row]={
            "nonNetto" : $(tr).find('td:eq(1)').text()
            , "tolerance" : $(tr).find('td:eq(2)').text()
            , "raavare" : {
                "raavareID": raavareId,
                "raavareNavn": "ligemeget",
                "leverandoer": "ligemeget"
            } ,"receptId" : document.getElementById('receptid').value
        }
    });
    console.log(TableData);
    return TableData;
}


function receptIdVacant(proposedId){
    var valid = true;
    $.each(receptList, function (i,elt) {
        console.log("proposed ID: " + proposedId + ", list ID: " + elt.receptId)
        if (elt.receptId == proposedId){
            valid = false;
            return valid;
        }
    });
    return valid;
}

function validateReceptInputFields() {
    //Returns true, if everything is fine. Returns false otherwise and displays messages.

    var everyThingOK = checkIfReceptNavnValid() && checkIfReceptIdValid();
    console.log("EverythingOK: " + everyThingOK);
    return everyThingOK;
}

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


