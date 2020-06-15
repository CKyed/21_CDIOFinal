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
    
}
