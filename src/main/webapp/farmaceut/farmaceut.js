/*
$(document).ready(function () {
    loadRaavarer();
    loadRecepter();
});
var raavareList = [];
var raavareOptionList = document.getElementById('raavare');
var raavareTable = document.getElementById('raavaretable');

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
        generateRaavareTable();
        generateRaavareOptionList();
    });
}
function generateRaavareTable() {
    //Make sure, raavareTable is updated
    raavareTable = document.getElementById('raavaretable');

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
    $('#raavaretable').value = raavareTable;
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

function generateRaavareOptionList() {
    raavareOptionList = document.getElementById('raavare');


    var raavareOptionHTML;
    var navn;
    var id;
    $.each(raavareList, function (i, elt) {
        var raavareOption = document.createElement("OPTION");
        raavareOption.setAttribute("value", elt.raavareNavn + "; " + elt.raavareID);
        var t = document.createTextNode(elt.raavareNavn + "; " + elt.raavareNavn);
        raavareOption.appendChild(t);
        raavareOptionList.appendChild(x);

        //var navn =elt.raavareNavn;
        //var id = elt.raavareID;
        //raavareOptionHTML = '<option> ' +navn+ '; ' + id + ' </option>';
        //$('#raavare').append(raavareOptionHTML);
    });
    document.getElementById("raavare").append(raavareOptionList);
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

function addReceptKomp() {
    var table = document.getElementById("receptkomptablebody");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = document.getElementById("raavare").value;
    cell2.innerHTML = document.getElementById("netto").value;
    cell3.innerHTML = document.getElementById("tolerance").value;
    cell4.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow()"></td>'
}

function deleteRow() {
    var td = event.target.parentNode;
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
}

function lockReceptForm() {
    var receptID =document.getElementById('receptid').value;
    var valid = receptIdVacant(receptID);

    if (receptID> maxReceptId){
        alert("Receptens ID er for langt.");
    } else if (receptList.length ==0){
        alert("Vent et øjeblik til recepterne er loadet færdigt.");
    } else if (valid){
        document.getElementById('receptid').disabled = true;
        document.getElementById('receptnavn').disabled = true;
        document.getElementById('lockReceptIdButton').disabled = true;
        document.getElementById('raavare').disabled = false;
        document.getElementById('netto').disabled = false;
        document.getElementById('tolerance').disabled = false;
    } else if (!valid){
        alert("Receptens ID er allerede i brug.");
    } else {
        alert("Uventet fejl.")
    }
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
    //TableData.shift();  // first row will be empty - so remove
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

 */


