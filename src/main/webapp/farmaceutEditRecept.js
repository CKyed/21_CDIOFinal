$(document).ready(function () {
    loadRaavarer_edit();
});
var chosenRecept;
var raavareList_edit = [];
var raavareOptionList_edit = document.getElementById('raavare_edit');
var maxTolerance = 10;
var minTolerance = 0.1;
var maxNetto = 10;
var minNetto = 0.1;

function validateNettoInput_edit() {
    var value = document.getElementById("netto_edit").value;
    if (value > maxNetto) {
        document.getElementById("netto_edit").value = maxNetto;
    } else if (value < minNetto){
        document.getElementById("netto_edit").value = minTolerance;
    }
}

function validateToleranceInput_edit() {
    var value = document.getElementById("tolerance_edit").value;
    if (value > maxTolerance) {
        document.getElementById("tolerance_edit").value = maxTolerance;
    } else if (value < minTolerance){
        document.getElementById("tolerance_edit").value = minTolerance;
    }
}




function loadRaavarer_edit() {
    //empty existing list
    raavareList_edit = [];

    //Load via GET-call to database
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable_edit").empty();
        $("#raavare_edit").empty();
        $.each(data, function (i, elt) {
            raavareList_edit.push(elt);
        });
        generateRaavareOptionList_edit();
    });
}

function generateRaavareOptionList_edit() {
    $("#raavare_edit").empty();
    raavareOptionList_edit = document.getElementById('raavare_edit');


    $.each(raavareList_edit, function (i, elt) {
        var raavareOption = document.createElement("OPTION");
        raavareOption.setAttribute("value", elt.raavareID);
        var t = document.createTextNode(elt.raavareNavn + "; " + elt.raavareID);
        raavareOption.appendChild(t);
        raavareOptionList_edit.appendChild(raavareOption);
    });

}

function addReceptKomp_edit() {
    // TODO find ud af, hvorfor denne giver fejlen Uncaught TypeError: Cannot read property 'value' of undefined
    //Men alligevel virker
    if (raavareOptionList_edit.length==0){
        console.log("Har ikke loadet raavareOptionList endnu");
        return;
    }

    var table = document.getElementById("receptkomptablebody_edit");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var selectedRaavareId = document.getElementById("raavare_edit").value;
    var selectedRaavare = getRaavareById_edit(selectedRaavareId);
    cell1.innerHTML = selectedRaavare.raavareNavn;
    cell2.innerHTML = selectedRaavareId;
    cell3.innerHTML = document.getElementById("netto_edit").value;
    cell4.innerHTML = document.getElementById("tolerance_edit").value;
    cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow_edit()"></td>';


    //Remove the option from the raavareOptionList
    console.log("Forsøger at slette raavaren med Id "+ selectedRaavareId + " fra raavareListen.");
    $.each(raavareOptionList_edit, function (i, elt) {
        if (elt.value == selectedRaavareId){
            raavareOptionList_edit.removeChild(elt);
        }
    });

}

function deleteRow_edit() {
    var td = event.target.parentNode;

    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);

    //Return the raavare to the raavareOptionList
    var removedRaavareId = $(tr).find('td:eq(1)').text();
    console.log("removed raavareId:" + removedRaavareId);
    addToRaavareOptionList_edit(removedRaavareId);



}

function updateReceptToDatabase() {
    //First runs some checks to see, if everything is fine. Then writes to database
    //checks if all input fields are valid - otherwise returns (does not write to DB)


    if (!validateReceptInputFields_edit()){
        alert("Noget gik galt");
        return;
    }

    event.preventDefault();

    var recept = {
        "receptId": document.getElementById('selectReceptId').value,
        "receptNavn": document.getElementById('selectedReceptnavn').value,
        "receptKomponenter": getReceptKomponenterJSON_edit()

    }
    data =JSON.stringify(recept);

    console.log(data);
    $.ajax({
        url: 'rest/recept',
        method: 'PUT',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            switchPage("farmaceutEditRecept.html");
        },
        error: function (jqXHR, textStatus) {
            alert(jqXHR.responseText);
        }
    })
}


function getReceptKomponenterJSON_edit() {
    var TableData = new Array();
    $('#receptkomptablebody_edit tr').each(function(row, tr){
        var raavareId = $(tr).find('td:eq(1)').text();
        var raavare = getRaavareById_edit(raavareId);
        TableData[row]={
            "nonNetto" : $(tr).find('td:eq(2)').text()
            , "tolerance" : $(tr).find('td:eq(3)').text()
            , "raavare" : {
                "raavareID": raavare.raavareID,
                "raavareNavn": raavare.raavareNavn,
                "leverandoer": raavare.leverandoer
            } ,"receptId" : document.getElementById('selectReceptId').value
        }
    });
    console.log(TableData);
    return TableData;
}


function validateReceptInputFields_edit() {
    //Returns true, if everything is fine. Returns false otherwise and displays messages.

    var everyThingOK = checkIfReceptNavnValid_edit() && checkIfReceptIdValid_edit();
    console.log("EverythingOK: " + everyThingOK);
    return everyThingOK;
}

function checkIfReceptNavnValid_edit(){
    //Returns true only if the receptNavn is valid

    var valid = true;
    var receptNavn =document.getElementById("selectedReceptnavn").value;
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

function getRaavareById_edit(raavareId){
    var returnObject;
    $.each(raavareList_edit, function (i,elt) {
        if (elt.raavareID == raavareId){
            returnObject = elt;
            return;
        }
    });
    return returnObject;
}

function addToRaavareOptionList_edit(raavareId) {
    var raavare;
    var index;
    $.each(raavareList_edit, function (i,elt) {
        if (elt.raavareID == raavareId){
            raavare = elt;
            index = i;
            return;
        }
    });
    console.log(raavare);
    console.log(index);

    raavareOptionList_edit = document.getElementById('raavare_edit');
    var raavareOption = document.createElement("OPTION");
    raavareOption.setAttribute("value", index);
    var t = document.createTextNode(raavare.raavareNavn + "; " + raavare.raavareID);
    raavareOption.appendChild(t);
    raavareOptionList_edit.appendChild(raavareOption);
}

function getRecept_edit() {
    var receptId = document.getElementById("selectReceptId").value;
    console.log(receptId);
    if (receptId.length ===0){
        console.log("undefined recept id");
        return;
    }

    $.get('rest/recept/' + receptId + '/', function (data, textStatus, req) {
        chosenRecept = data;
        console.log(chosenRecept);
    });

    //Set the header of the recept
    document.getElementById("receptHeadline_edit").innerText = chosenRecept.receptNavn + ', ' +chosenRecept.receptId;

    //set the input values corresponding to the chosen recept
    document.getElementById("receptnavn_edit").value = chosenRecept.receptNavn;

    $("#receptkomptablebody_edit tr").remove();
    var optionsToremove = [];

    for (let j = 0; j < chosenRecept.receptKomponenter.length; j++) {
        raavareOptionList_edit = document.getElementById('raavare_edit');
        var komp = chosenRecept.receptKomponenter[j];
        console.log("Betragter elementet:" +komp);
        var table = document.getElementById("receptkomptablebody_edit");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = komp.raavare.raavareNavn;
        cell2.innerHTML = komp.raavare.raavareID;
        cell3.innerHTML = komp.nonNetto;
        cell4.innerHTML = komp.tolerance;
        cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow_edit()"></td>';

        const selectedRaavareId = komp.raavare.raavareID;
        //Remove the option from the raavareOptionList
        console.log("Forsøger at slette raavaren med Id "+ selectedRaavareId + " fra raavareListen.");
        $.each(document.getElementById('raavare_edit'), function (i, elt) {
            console.log(elt.value + "==" + selectedRaavareId + " = "+ (elt.value ==selectedRaavareId));
            if (elt.value == selectedRaavareId){
                optionsToremove.push(elt);
            }
        });
    }
        //TODO har ikke formået at få funktionen til at slette elementer fra raavareOptionslist

}



