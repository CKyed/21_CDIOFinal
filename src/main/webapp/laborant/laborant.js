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
var finishedRaaIDs =[];

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

function initializeFinishedRaaIDs() {
    for (let i = 0; i < produktBatch.produktBatchKomponenter.length; i++) {
        finishedRaaIDs.push(produktBatch.produktBatchKomponenter[i].raavareBatchDTO.raavare.raavareID);
    }
}
function createProduktionsBatchView(data) {
    console.log(recept);
    console.log(produktBatch);
    $('#receptInfo').empty();
    $('#receptInfo').append(generateReceptView());
    generateRaavareView();

    if (produktBatch.status ===0){
        updatePbStatus(1);
    } else if (produktBatch.status === 3){
        alert("Den angivne produktbatch er allerede afsluttet.")
        return;
    }
    $('#afvejningsInfo').show();
    document.getElementById("afvejningButton").disabled = false;
}


function getRecept(receptID) {
    $.ajax({
        method: 'GET',
        url: 'rest/recept/'+receptID,
        success: function(data){
            recept = data;
            initializeFinishedRaaIDs();
            createProduktionsBatchView(data);
        }
    })
}

function generateRaavareView() {
    $('#receptRaavareListe').empty();
    var table = document.getElementById("receptRaavareListe");
    console.log(finishedRaaIDs);
    for (let i = 0; i < recept.receptKomponenter.length; i++) {
        komp = recept.receptKomponenter[i];
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = komp.raavare.raavareNavn;
        cell2.innerHTML = komp.raavare.raavareID;
        cell3.innerHTML = komp.nonNetto;
        cell4.innerHTML = komp.tolerance;
        cell5.innerHTML = "Nej";

        for (let j = 0; j < finishedRaaIDs.length; j++) {
            if (finishedRaaIDs[j]===komp.raavare.raavareID){
                cell5.innerHTML = "Ja";
            }
        }

    }


/*
    for(i in recept.receptKomponenter){
        x += '<tr><td>' + recept.receptKomponenter[i].raavare.raavareNavn + '</td>' +
        '<td>' + recept.receptKomponenter[i].raavare.raavareID + '</td>' +
        '<td>' + recept.receptKomponenter[i].nonNetto  + '</td>' +
        '<td>' + recept.receptKomponenter[i].tolerance + '</td></tr>';
        console.log(recept.receptKomponenter[i].nonNetto);
        console.log(recept.receptKomponenter[i].tolerance);

    }
    return x;

 */
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
            if (status==2){
                alert("Produktbatchen er nu afsluttet.");
                switchPage('laborant/laborant.html');
            }
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


}

function validateAfvejningInput() {
    //Check that the råvare is not already afvejet
    var raavrareID = currentReceptKomp.raavare.raavareID;

    for (let j = 0; j < finishedRaaIDs.length; j++) {
        if (finishedRaaIDs[j]===raavrareID){
            alert("Råvaren er allerede afvejet, og kan ikke afvejes igen.")
            return;
        }
    }

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
            saveToDBWasSuccesful();
            alert(JSON.stringify(data));

        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    })
}

function saveToDBWasSuccesful() {

    //Add to finishedRaaIds
    var finishedRaaID= currentReceptKomp.raavare.raavareID;
    finishedRaaIDs.push(finishedRaaID);

    var table = document.getElementById("receptRaavareListe");

    for (var i = 0, row; row = table.rows[i]; i++) {
        console.log("HEJHEJ" + i);
        //iterate through rows and set text to "Ja" if raavareID === finishedRaaID
        if (finishedRaaID == row.cells[1].innerHTML){
            row.cells[4].innerHTML = "Ja";
        }
    }


}


function nextAfvejning() {
    //Update currentReceptKomp
    if (recept.receptKomponenter.length > currentReceptKompIndex +1){
        currentReceptKomp = recept.receptKomponenter[++currentReceptKompIndex];
    } else{
        //Starts over with the first receptkomp
        currentReceptKompIndex=0;
        currentReceptKomp = recept.receptKomponenter[currentReceptKompIndex];
    }

    var raavare = currentReceptKomp.raavare;

    //Update råvare-text
    document.getElementById("currentRaavare").innerText = "Afvejning af: " + raavare.raavareNavn + ", " + raavare.raavareID;

    //disable næste-afvejning-knap
    //document.getElementById("nextAfvejningButton").disabled = true;

    //enable save-afvejning-knap
    //document.getElementById("saveAfvejningButton").disabled = false;

    //empty input fields
    document.getElementById("tara").value = "";
    document.getElementById("rbId").value = "";
    document.getElementById("netto").value = "";

}

function finishAfvejning() {
    //Check that the produktbatch is done
    if (!(finishedRaaIDs.length ===recept.receptKomponenter.length)){
        alert("Der er stadig råvarer som mangler at blive afvejet i denne produktbatch.");
        return;
    }
    //check that the current status is 1 meaning påbegyndt
    if (produktBatch.status==1){
        updatePbStatus(2);
    } else if (produktBatch.status==2){
        alert("Produktbatchen er allerede afsluttet.");
    } else {
        alert("Fejl. Produktbatchens nuværende status er ikke \"Under produktion\" og det kan derfor ikke afsluttes");
        return;
    }


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
