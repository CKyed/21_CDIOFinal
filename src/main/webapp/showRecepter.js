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
    var pbIds = getPbIdsForRecept(elt.receptId);
    return '<tr ><td>' + elt.receptId + '</td>' +
        '<td>' + elt.receptNavn + '</td>+' +
        '<td>' + pbIds[0] + '</td>+' +
        '<td>' + pbIds[1] + '</td>+' +
        '<td >' + pbIds[2] + '</td></tr> ';
}

function getPbIdsForRecept(receptId) {
    var produktBatchIds= [];
    var status0 = "";
    var status1= "";
    var status2= "";
    produktBatchIds.push(status0); produktBatchIds.push(status1); produktBatchIds.push(status2);

    var status;
    for (let i = 0; i < produktBatches.length; i++) {
        if (produktBatches[i].receptId === receptId){
            status = produktBatches[i].status;
            produktBatchIds[status] += produktBatches[i].pbId + ", \n";
        }
    }
    return produktBatchIds;
}