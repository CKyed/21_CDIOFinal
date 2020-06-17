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
    console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/produktbatch/'+id,
        success: function(data){
            produktBatch=data;
            console.log(data);
            createProduktionsBatchView(data)
        },
        error(jqXHR){
            errorMessage.innerHTML= jqXHR.responseText;
        }
    })
}
function createProduktionsBatchView(data) {
    console.log("createProduktBatchView metoden er startet");
    getRecept(data.receptId);
    $('#receptRaavareListe').append(generateReceptView());

    $('#afvejningsInfo').show();
}


function getRecept(receptID) {
    $.ajax({
        method: 'GET',
        url: 'rest/recept/'+receptID,
        success: function(data){
            recept = data;
        }
    })
}

function generateReceptView() {
    return '<tr><td>' + recept.receptId + '</td>' +
        '<td>' + recept.receptNavn + '</td>' +
        '<td>' + produktBatch.pbId  + '</td>'
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
