$(document).ready(function loadLaborant() {
    $('#laborantID').append(brugerID);
    $('#laborantBrugernavn').append(brugerNavn);

});
var recept;
var produktBatch;

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
        url:'rest/produktbatch',
        data: JSON.stringify(data),
        success: console.log("Put lykkedes"),
        error(jqXHR) {
            console.log("Put fejlede: "+jqXHR);
        }

    })
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
