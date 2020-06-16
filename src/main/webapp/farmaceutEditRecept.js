$(document).ready(function () {
    loadRaavarer_edit();
    loadRecepter_edit();
});
var raavareList_edit = [];
var raavareOptionList_edit = document.getElementById('raavare_edit');
var receptOptionList_edit = document.getElementById('selectReceptId');
var receptList_edit = [];
var maxReceptId = 99999999;
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



function loadRecepter_edit() {
    //empty existing list
    receptList_edit = [];
    console.log("receptlist_edit:"+ receptList_edit);

    //Load via GET-call to database
    $.get('rest/recept', function (data, textStatus, req) {
        $.each(data, function (i, elt) {
            receptList_edit.push(elt);
            if (i == data.length-1){
                generateReceptOptionList_edit();
                console.log("Oprettet receptlisten");
            }
        });
    });
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
        raavareOption.setAttribute("value", i);
        var t = document.createTextNode(elt.raavareNavn + "; " + elt.raavareID);
        raavareOption.appendChild(t);
        raavareOptionList_edit.appendChild(raavareOption);
    });

}

function addReceptKomp_edit() {
    // TODO find ud af, hvorfor denne giver fejlen Uncaught TypeError: Cannot read property 'value' of undefined
    //Men alligevel virker

    if (raavareOptionList_edit.length==0){
        return;
    }

    var table = document.getElementById("receptkomptablebody_edit");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var selectedRaavareId = raavareList_edit[document.getElementById("raavare_edit").value].raavareID;
    cell1.innerHTML = raavareList_edit[document.getElementById("raavare_edit").value].raavareNavn;
    cell2.innerHTML = selectedRaavareId;
    cell3.innerHTML = document.getElementById("netto_edit").value;
    cell4.innerHTML = document.getElementById("tolerance_edit").value;
    cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow_edit()"></td>';

    //Remove the option from the raavareOptionList
    raavareOptionList_edit = document.getElementById('raavare_edit');
    const index = document.getElementById("raavare_edit").value;
    console.log(raavareOptionList_edit);
    $.each(raavareOptionList_edit, function (i, elt) {
        if (elt.value == index){
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

function checkIfReceptIdValid_edit() {
    //Returns true only if the id was valid. Gives explaination otherwise
    //Also updates the headline of the Recept box

    var receptID =document.getElementById('selectReceptId').value;
    var vacant = receptIdVacant_edit(receptID);

    if (receptID> maxReceptId){
        alert("Receptens ID er for langt.");
        return false;
    } else if (receptList_edit.length ==0){
        alert("Vent et øjeblik til recepterne er loadet færdigt.");
        return false;
    } else if (vacant){
        var header = document.getElementById("selectedReceptnavn").value + ", " + receptID;
        document.getElementById("receptHeadline_edit").innerText = header;
        return true;
    } else {
        alert("Receptens ID er allerede i brug.");
        return false;
    }
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


function receptIdVacant_edit(proposedId){
    var valid = true;
    $.each(receptList_edit, function (i,elt) {
        console.log("proposed ID: " + proposedId + ", list ID: " + elt.receptId)
        if (elt.receptId == proposedId){
            valid = false;
            return valid;
        }
    });
    return valid;
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

function generateReceptOptionList_edit(){
    $("#selectReceptId").empty();
    receptOptionList_edit = document.getElementById('selectReceptId');
    console.log(receptOptionList_edit);
    $.each(receptList_edit, function (i, elt) {
        var receptOption = document.createElement("OPTION");
        receptOption.setAttribute("value", elt);
        var t = document.createTextNode(elt.receptNavn + "; " + elt.receptId);
        receptOption.appendChild(t);
        receptOptionList_edit.appendChild(receptOption);
    });
    console.log(receptOptionList_edit);
}


