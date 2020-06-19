$(document).ready(function () {
    console.log("Loader dokumentet");
    loadProduktBatches();

});
var produktBatches;

function loadProduktBatches() {
    console.log("Loader produktbatches");
    $.get('rest/produktbatch/', function (data, textStatus, req) {
        produktBatches = data;
        loadRecepter();
    });
}

function loadRecepter() {
    console.log("Loader recepter");
    $.get('rest/recept/', function (data, textStatus, req) {
        $("#receptTable").empty();
        $.each(data, function (i, elt) {
            $('#receptTable').append(generateReceptHTML(elt));
        });
        document.getElementById("loadMSG").innerText = "Viser alle recepter og ID på deres tilhørende produktbatches."
    });
}

function generateReceptHTML(elt) {
    return '<tr ><td>' + elt.receptId + '</td>' +
        '<td>' + elt.receptNavn + '</td>+' +
        '<td >' + getPbIdsForRecept(elt.receptId) + '</td></tr> ';
}

function getPbIdsForRecept(receptId) {
    var produktBatchIds="";
    for (let i = 0; i < produktBatches.length; i++) {
        if (produktBatches[i].receptId === receptId){
            produktBatchIds += produktBatches[i].pbId + ", \n";
        }
    }
    return produktBatchIds;
}