$(document).ready(function () {
    loadRaavarerBatch();

});

function loadRaavarerBatch() {
    $.get('rest/raavarebatch', function (data, textStatus, req) {
        $("#raavarebatchtable").empty();
       // $("#raavare").empty();
        $.each(data, function (i, elt) {
            $('#raavarebatchtable').append(generateRaavareBatchTable(elt));
           // $('#raavare').append(generateRaavareList(elt));
        });
    });
}
function generateRaavareBatchTable(raavarebatch) {
    return '<tr><td>' + raavarebatch.raavareBatchID + '</td>' +
        '<td>' + raavarebatch.raavareBatchMængde + '</td>' +
        '<td>' + raavarebatch.raavareBatchLeverandoer + '</td>'+
        '</tr>'
}


function createRaavareBatch() {
    event.preventDefault();
    var data =$('#raavareBatchForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavarebatch',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavarerBatch();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}


