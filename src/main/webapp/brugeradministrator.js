$(document).ready(function () {
    loadBruger();

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
        '<td>' + bruger.cpr + '</td>' +
        '<td>' + bruger.aktiv + '</td>'
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

function loadSpecificBruger() {
    var id = document.getElementById("BrugerId").value;
    console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            console.log(data);
           /* console.log("status : "+toString(data.status))
            console.log(typeof data.status)
            var statusElt = document.getElementById("updateStatus");
            console.log(statusElt);
            statusElt.style.backgroundColor = "pink";
            var brugernavnElt = document.getElementById("updateBrugerNavn");
            brugernavnElt.value = data.brugerNavn;*/
            document.getElementById("updateBrugerNavn").value = data.brugerNavn;
            document.getElementById("updateInitialer").value = data.initialer;
            document.getElementById("updateRolle").value = data.rolle;
            document.getElementById("updateCPR").value = data.cpr;
          //  document.getElementById("updateStatus").value = data.status;
        }
    })

}

function updateBruger() {
    var id = document.getElementById("BrugerId").value;
    var data =$('#brugerformUpdate').serializeJSON();
    console.log(data);

}




function showCreateBruger() {
    var x = document.getElementById("createBruger");
    if (x.style.display === "block") {
        x.style.display = "none";

    } else {
        x.style.display = "block";
    }
}

function showUpdateBruger() {
    var x = document.getElementById("updateBruger");
    if (x.style.display === "block") {
        x.style.display = "none";

    } else {
        x.style.display = "block";
    }


/*function checkLogin() {
    var id =document.getElementById("loginBrugerID").value;
    console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            console.log(data);
            switch (data.rolle) {
                case "Administrator":
                    switchPage('brugeradministrator.html');
                    break;
                case "Farmaceut":
                    switchPage('farmaceut.html');
                    break;
                case "Produktionsleder":
                    switchPage('produktionsleder.html');
                    break;
                case "Laborant":
                    switchPage('laborant.html');
                    break;
            }
        }
  })
}
*/


}