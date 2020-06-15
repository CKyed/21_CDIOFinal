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
  //  console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            console.log(data);
            //console.log("status : "+toString(data.aktiv));
            console.log(data.aktiv);
            document.getElementById("updateBrugerNavn").value = data.brugerNavn;
            document.getElementById("updateInitialer").value = data.initialer;
            document.getElementById("updateRolle").value = data.rolle;
            document.getElementById("updateCPR").value = data.cpr;
            if(data.aktiv == 1){
                document.getElementById("aktiv2").checked = true;
            }else{
                document.getElementById("inaktiv2").checked = true;
            }
           }
    })

}

function getStatusofBruger(){
    var id = document.getElementById("BrugerId").value;
   // console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            console.log("")
     //       console.log(data);
      //      console.log("status : "+toString(data.status));
            console.log(data.status);
        }
    })
}


function updateBruger() {
    var id = document.getElementById("BrugerId").value;
    var data =$('#brugerformUpdate').serializeJSON();
//
//   console.log(data);

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


