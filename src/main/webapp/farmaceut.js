$(document).ready(function () {
    loadRaavarer();
    loadRecepter();
});
var raavareList = new Array();
var receptList = new Array();
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
};

function validateToleranceInput() {
    var value = document.getElementById("tolerance").value;
    if (value > maxTolerance) {
        document.getElementById("tolerance").value = maxTolerance;
    } else if (value < minTolerance){
        document.getElementById("tolerance").value = minTolerance;
    }
};



function loadRecepter() {
    //empty existing list
    receptList = new Array();

    //Load via GET-call to database
    $.get('rest/recept', function (data, textStatus, req) {
        $.each(data, function (i, elt) {
            receptList.push(elt);
        });
    });
}

function loadRaavarer() {
    //empty existing list
    raavareList = new Array();

    //Load via GET-call to database
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable").empty();
        $("#raavare").empty();
        $.each(data, function (i, elt) {
            raavareList.push(elt);
            $('#raavaretable').append(generateRaavareTable(elt));
            $('#raavare').append(generateRaavareOptionList(elt));
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


function generateRaavareOptionList(raavare) {
    //This formatting makes sure, that the whole raavareNavn gets shown - not just first word
    var navn = raavare.raavareNavn;
    var id = raavare.raavareID;
    //When hovered over, the raavareNavn corresponding til the ID is shown
    return '<option> ' +navn+ '; ' + id + ' </option>'
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


