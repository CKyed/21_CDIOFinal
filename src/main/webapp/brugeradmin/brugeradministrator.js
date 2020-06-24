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

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function validateBrugerInput(brugerID, brugerNavn, ini, CPR) {
    //Validate BrugerID
    if (!brugerID){
        alert("Du skal angive et bruger ID");
        return false;
    } else if (brugerID > 999){
        alert("Bruger ID'et er for langt. Det må maks være 3 cifre.");
        return false;
    } else if (brugerID < 0){
        alert("Bruger ID'et skal være et helt tal.");
        return false;
    }

    //Validate BrugerNavn
    if (!brugerNavn){
        alert("Du skal angive et brugernavn");
        return false;
    } else if (brugerNavn.length > 20){
        alert("Brugernavnet er for langt. Det må maks være 20 tegn.");
        return false;
    } else if (brugerNavn.trim().length===0){
        alert("Brugernavnet må ikke udelukkende indeholde whitespace.");
        return false;
    }

    //Validate initialer
    if (!ini){
        alert("Du skal angive initialer.");
        return false;
    } else if (ini.length > 4){
        alert("Initialerne må maks være 4 tegn.");
        return false;
    } else if (!/^[A-Z]+$/.test(ini)) {
        //If there are other chars than uppercase letters
        alert("Initialerne udelukkende indeholde store bogstaver fra A til Z");
        return false;
    } else if (ini.length < 2) {
        alert("Initialerne skal være af minimum 2 tegn.");
        return false;
    }

    //Validate CPR
    if (!CPR){
        alert("Du skal angive CPR-nummer.");
        return false;
    } else if (CPR.length != 10){
        alert("CPR-nummeret skal være præcis 10 cifre.");
        return false;
    }

    return true;
}

function createBruger() {
    var brugerID = document.getElementById("opretBrugerID").value;
    var brugerNavn = document.getElementById("opretBrugerNavn").value;
    var ini = document.getElementById("opretInitialer").value;
    var CPR = document.getElementById("opretCPR").value;

    if (!validateBrugerInput(brugerID,brugerNavn,ini,CPR)){
        return;
    }
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
            error: function (jqXHR) {
                console.log(jqXHR.responseJSON.technicalMSG);
                alert(jqXHR.responseJSON.userMSG);
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
                errormessage.innerHTML="Kan ikke finde bruger uden ID. Indtast et brugerID";
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


function validateUpdateBrugerInput() {
    updateBruger();
}



function updateBruger() {
    var brugerID = document.getElementById("BrugerId").value;
    var brugerNavn = document.getElementById("updateBrugerNavn").value;
    var ini = document.getElementById("updateInitialer").value;
    var CPR = document.getElementById("updateCPR").value;
    if (!validateBrugerInput(brugerID,brugerNavn,ini,CPR)){
        return;
    }
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
        error: function (jqXHR) {
            console.log(jqXHR.responseJSON.technicalMSG);
            alert(jqXHR.responseText);

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


