var chosenRecept;

function getRecept() {
    var receptId = document.getElementById("selectReceptId").value;
    console.log(receptId);
    if (receptId.length ===0){
        console.log("undefined recept id");
        return;
    }

    $.get('rest/recept/' + receptId + '/', function (data, textStatus, req) {
        chosenRecept = data;
        console.log(chosenRecept);
        generateReceptTable();
    });
}

function generateReceptTable() {
    //Set the header of the recept
    document.getElementById("receptHeadline_edit").innerText = chosenRecept.receptNavn + ', ' +chosenRecept.receptId;

    $("#receptkomptablebody_edit tr").remove();

    for (let j = 0; j < chosenRecept.receptKomponenter.length; j++) {
        var komp = chosenRecept.receptKomponenter[j];
        console.log("Betragter elementet:" +komp);
        var table = document.getElementById("receptkomptablebody_edit");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = komp.raavare.raavareNavn;
        cell2.innerHTML = komp.raavare.raavareID;
        cell3.innerHTML = komp.nonNetto;
        cell4.innerHTML = komp.tolerance;
        cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow_edit()"></td>';
    }
}



