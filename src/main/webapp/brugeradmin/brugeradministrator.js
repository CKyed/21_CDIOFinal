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
            console.log(data);
            alert(JSON.stringify(data));
            loadBruger();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }
    })

}

function loadSpecificBruger() {
    var id = document.getElementById("BrugerId").value;
    var errormessage;
    errormessage = document.getElementById("errorMessage");
  //  console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            errormessage.innerHTML="";
            //console.log(data);
            //console.log("status : "+toString(data.aktiv));
            //console.log(data.aktiv);
            document.getElementById("updateBrugerNavn").value = data.brugerNavn;
            document.getElementById("updateInitialer").value = data.initialer;
            document.getElementById("updateRolle").value = data.rolle;
            document.getElementById("updateCPR").value = data.cpr;
            if(data.aktiv == 1){
                document.getElementById("aktiv2").checked = true;
                document.getElementById("aktiv2").value = 1;
            }else{
                document.getElementById("inaktiv2").checked = true;
                document.getElementById("inaktiv2").value = 0;
            }
            if(data.brugerNavn == undefined){
                console.log("mangler ID");
                errormessage.innerHTML="Kan ikke finde bruger uden ID";
                document.getElementById("updateBrugerNavn").value=" ";
                document.getElementById("updateInitialer").value=" ";
                document.getElementById("updateCPR").value=" ";
            }
           },
        error: function () {
            errormessage.innerHTML="Kunne ikke finder bruger med det ID, prøv igen";
        }
    })
}




function updateBruger() {
    event.preventDefault();
    var data =$('#brugerformUpdate').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/bruger',
        method: 'PUT',
        contentType: "application/json",
        data: data,
        success: function (data) {
            console.log("Det lykkedes")
            alert(JSON.stringify(data));
            loadBruger();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            // alert(textStatus);
            // alert(errorThrown);
        }

    })
}



function updateRaavare() {
    event.preventDefault();
    var data =$('#raavareUdateForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavare',
        method: 'PUT',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavarer();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            // alert(textStatus);
            // alert(errorThrown);
        }

    })
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
}


