var receptIdValid=false;


function showProduktBatchFromReceptID() {
    console.log("Kalder funktionen showProd...");
    var receptId = document.getElementById("pb_receptId").value;
    console.log("hentet receptId: "+ receptId);

    $.ajax({
        url: 'rest/recept/'+receptId,
        method: 'GET',
        success: function (data) {
            console.log(data);
            showPrintablePB(data);
            receptIdValid=true;
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
            receptIdValid=false;
        }
    })

}

function showPrintablePB(recept){
    console.log("So far so good.");
    var receptKomponenter = recept.receptKomponenter;
    var komp;
    $("#ProduktBatchPrintable").empty();
    var table = document.getElementById("ProduktBatchPrintable");

    for (let i = 0; i < receptKomponenter.length; i++) {
        komp = receptKomponenter[i];
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = komp.raavare.raavareID;
        cell2.innerHTML = komp.raavare.raavareNavn;
        cell3.innerHTML = komp.nonNetto;
        cell4.innerHTML = komp.tolerance;
        cell5.innerHTML = "";
        cell6.innerHTML = "";
        cell7.innerHTML = "";
    }
}

function validateInputs() {
    //Check that input is valid in all fields

    //TODO valider datoen

    if (!receptIdValid){
        alert("Du skal indlæse en gyldig recept først.")
        return;
    }

    var proposedId = document.getElementById("produktbatchid").value;

    if (proposedId.length ===0){
        alert("Du skal angive et produktbatch ID.");
        return;
    }

    $.ajax({
        method: 'GET',
        url:'rest/produktbatch/'+proposedId+'/',
        success: function () {
            console.log("Get-kaldet var en succes");
            alert("Der eksisterer allerede en produktbatch med dette ID")
        },
        error: function () {
            console.log("Get-kaldet var en fiasko");
            savePBtoDatabase();
        }
    })
}

function savePBtoDatabase() {
    //Save to database
    var produktBatch = {
        "pbId": document.getElementById('produktbatchid').value,
        "receptId": document.getElementById('pb_receptId').value,
        "status": 0,
        "produktBatchKomponenter": []

    }
    data =JSON.stringify(produktBatch);

    console.log(data);

    $.ajax({
        url: 'rest/produktbatch',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            printToPDF();
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    })


}

function printToPDF() {

    //TODO print

}
