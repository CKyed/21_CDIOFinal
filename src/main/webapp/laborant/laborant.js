$(document).ready(function loadLaborant() {
    document.getElementById("afvejningButton").disabled = true;
    $('#afvejningsDiv').hide();
    $('#afvejningsInfo').hide();
});
var recept;
var produktBatch;
var currentReceptKompIndex=0;
var currentReceptKomp;
var currentRaavareBatch;

function getProduktBatch() {
    var id = document.getElementById("pbId").value;
    var errorMessage;
    errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML="";
    $.ajax({
        method: 'GET',
        url:'rest/produktbatch/'+id,
        success: function(data){
            produktBatch=data;
            getRecept(data.receptId);
        },
        error(jqXHR){
            errorMessage.innerHTML= jqXHR.responseText;
        }
    })
}
function createProduktionsBatchView(data) {
    console.log(recept);
    console.log(produktBatch);
    $('#receptInfo').empty();
    $('#receptInfo').append(generateReceptView());
    $('#receptRaavareListe').empty();
    $('#receptRaavareListe').append(generateRaavareView());
    generateRaavareView();
    updatePbStatus(1);
    $('#afvejningsInfo').show();
    document.getElementById("afvejningButton").disabled = false;
}


function getRecept(receptID) {
    $.ajax({
        method: 'GET',
        url: 'rest/recept/'+receptID,
        success: function(data){
            recept = data;
            createProduktionsBatchView(data);
        }
    })
}

function generateRaavareView() {
    var x = "test ";
    var i = "";
    for(i in recept.receptKomponenter){
        x += '<tr><td>' + recept.receptKomponenter[i].raavare.raavareNavn + '</td>' +
        '<td>' + recept.receptKomponenter[i].raavare.raavareID + '</td>' +
        '<td>' + recept.receptKomponenter[i].nonNetto  + '</td>' +
        '<td>' + recept.receptKomponenter[i].tolerance + '</td></tr>';
        console.log(recept.receptKomponenter[i].nonNetto);
        console.log(recept.receptKomponenter[i].tolerance);

    }
    return x;
}

function generateReceptView() {
    return '<tr><td>' + recept.receptId + '</td>' +
        '<td>' + recept.receptNavn + '</td>' +
        '<td>' + produktBatch.pbId  + '</td>'

}

function updatePbStatus(status) {
    produktBatch.status = status;
    console.log(produktBatch);
    data=produktBatch;
    
    console.log(data);
    $.ajax({
        method:'PUT',
        contentType: "application/json",
        url:'rest/produktbatch/',
        data: JSON.stringify(data),
        success: function () {
            console.log(data);
            console.log("Put lykkedes: status opdateret");
        },
        error(jqXHR){
            console.log(data);
            console.log("Put fejlede - status ikke opdateret: "+jqXHR);
            alert("Kunne ikke opdatere status af produktbatchen.");
        }
    })
}

function startAfvejning() {
    $('#afvejningsDiv').show();
    $('#finishAfvejningButton').hide();
    document.getElementById("afvejningButton").disabled = true;

    if (recept.receptKomponenter.length >0) {
        currentReceptKomp = recept.receptKomponenter[currentReceptKompIndex];
    } else{
        console.log("Fejl - ingen receptkomponenter.");
        alert("Fejl - ingen receptkomponenter.");
        return;
    }
    var raavare = currentReceptKomp.raavare;

    //Update råvare-text
    document.getElementById("currentRaavare").innerText = "Afvejning af: " + raavare.raavareNavn + ", " + raavare.raavareID;

    //disable næste-afvejning-knap
    document.getElementById("nextAfvejningButton").disabled = true;

    //enable save-afvejning-knap
    document.getElementById("saveAfvejningButton").disabled = false;
}

function validateAfvejningInput() {

    //Validation: tara
    var tara = document.getElementById("tara").value;
    if (!tara){
        alert("Angiv tara.")
        return;
    } else if (tara >999.9999){
        alert("Tara er for stor. Den må maks være 999,9999")
        return;
    } else if (tara < 0.0001){
        alert("Tara er for lille. Den må mininmum være 0,0001")
        return;
    }

    //Validation: netto
    var netto = document.getElementById("netto").value;
    if (!netto){
        alert("Angiv netto.")
        return;
    } else if (netto >999.9999){
        alert("netto er for stor. Den må maks være 999,9999")
        return;
    } else if (netto < 0.0001){
        alert("netto er for lille. Den må mininmum være 0,0001")
        return;
    } else {
        //Bruttokontrol
        var minNetto = currentReceptKomp.nonNetto * (1-(currentReceptKomp.tolerance)*0.01);
        var maxNetto = currentReceptKomp.nonNetto * (1+(currentReceptKomp.tolerance)*0.01);
        if (netto > maxNetto){
            alert("Tolerancekontrollen viser at den angivne nettovægt ikke ligger inde for tolerancen."
            + " Maximal nettovægt er " + maxNetto);
            return;
        } else if (netto < minNetto){
            alert("Tolerancekontrollen viser at den angivne nettovægt ikke ligger inde for tolerancen."
                + " Minimum nettovægt er " + minNetto);
            return;
        } else {
            alert("Tolerancekontrol-status: OK");
        }

    }

    //validation: raavarebatchID
    var rbId = document.getElementById("rbId").value;
    $.ajax({
        method: 'GET',
        url:'rest/raavarebatch/'+rbId+'/',
        success: function (data) {
            console.log("Get-kaldet var en succes");
            //Check that it contains the correct raavare and continue
            if (data.raavare.raavareID === currentReceptKomp.raavare.raavareID){
                currentRaavareBatch = data;

                //Succes - raavareBatchID matches raavare of receptKomp
                saveAfvejningToDatabase();
            } else{
                alert("Den angivne råvarebatch findes, men svarer ikke til den aktuelle råvare.")
            }
        },
        error: function () {
            console.log("Get-kaldet var en fiasko");
            alert("Der kunne ikke findes en raavarebatch i systemet med det angivne ID.")
        }
    })




}
function saveAfvejningToDatabase() {
    alert("HUrra")

    //Rest POST
    var pbKomp = {
        "pbId": produktBatch.pbId,
        "raavareBatchDTO": currentRaavareBatch,
        "tara": document.getElementById("tara").value,
        "netto": document.getElementById("tara").netto,
        "laborant": user
    }
    data =JSON.stringify(pbKomp);

    console.log(data);
    $.ajax({
        url: 'rest/produktbatchkomp',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            saveToDBWasSuccesful
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    })
}

function saveToDBWasSuccesful() {
    //disable gemafvejningbutton
    document.getElementById("saveAfvejningButton").disabled = true;

    //check if there are more receptkomponenter
    if (recept.receptKomponenter.length <= currentReceptKompIndex +1){
        //hide "next afvejning"-button
        $('#nextAfvejningButton').hide();
        $('#finishAfvejningButton').show();

    } else {
        //Enable "next afvejning"-button
        document.getElementById("nextAfvejningButton").disabled = false;
    }

}


function nextAfvejning() {
    //Update currentReceptKomp
    if (recept.receptKomponenter.length > currentReceptKompIndex +1){
        currentReceptKomp = recept.receptKomponenter[++currentReceptKompIndex];
    } else{
        alert("Der er ikke flere receptkomponenenter.")
    }

    var raavare = currentReceptKomp.raavare;

    //Update råvare-text
    document.getElementById("currentRaavare").innerText = "Afvejning af: " + raavare.raavareNavn + ", " + raavare.raavareID;

    //disable næste-afvejning-knap
    document.getElementById("nextAfvejningButton").disabled = true;

    //enable save-afvejning-knap
    document.getElementById("saveAfvejningButton").disabled = false;

    //empty input fields
    document.getElementById("tara").value = "";
    document.getElementById("rbId").value = "";
    document.getElementById("netto").value = "";

}

function finishAfvejning() {

}

/*
function createProduktBatchKomp() {
    event.preventDefault();
    //var data skal være = et produktBatchDTO på JSON format
    var data;
    $.ajax({
        URL: 'rest/produktbatchkomp',
        method: 'POST',
        contentType: 'application/json',
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }

    })

}



function loadProduktBatches() {
    //empty existing list
    produktBatchList = new Array();
    //Load via GET-call to database
    $.get(rest/produktbatch, function (data) {
        $("#produktBatch").empty();
        $.each(data, function (i, elt) {
            produktBatchList.push(elt);
            $('produktBatch').append()
        })


    })
}

function generateProduktBatchOption(id, ) {
    
}*/
