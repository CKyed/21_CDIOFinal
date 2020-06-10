$(document).ready(function () {
    loadBruger();
    hideElements()
});

function loadBruger() {
    $.get('rest/bruger', function (data, textStatus, req) {
        $("#brugertable").empty();
        $.each(data, function (i, elt) {
            $('#brugertable').append(generateBrugerTable(elt));
        });
    });
}

function generateBrugerTable(bruger){
    return '<tr><td>' + bruger.brugerID + '</td>' +
        '<td>' + bruger.rolle + '</td>' +
        '<td>' + bruger.brugerNavn + '</td>' +
        '<td>' + bruger.initialer + '</td>' +
        '<td>' + bruger.cpr + '</td>'
}

function createBruger() {
    event.preventDefault();
    var data =$('#brugerform').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/bruger',
            method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadBruger();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
    
}

function checkLogin(brugerID) {
    event.preventDefault();
    $.ajax({
        url:'rest/bruger/'+brugerID,
        method: 'GET',
        data: data

    })
}
//Hides the create user menu, so far. More can be added.
function hideElements() {
    var x = document.getElementById("createBruger");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function showCreateBruger() {

}