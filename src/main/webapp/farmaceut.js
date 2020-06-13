$(document).ready(function () {
    loadRaavarer();
});
var raavareList = new Array();

function loadRaavarer() {
    $.get('rest/raavare', function (data, textStatus, req) {
        $("#raavaretable").empty();
        $("#raavare").empty();
        $.each(data, function (i, elt) {
            raavareList.push(elt);
            $('#raavaretable').append(generateRaavareTable(elt));
            $('#raavare').append(generateRaavareOptionList(elt));
        });
    });
}
function generateRaavareTable(raavare) {
    return '<tr><td>' + raavare.raavareID + '</td>' +
        '<td>' + raavare.raavareNavn + '</td>' +
        '<td>' + raavare.leverandoer + '</td>'+
        '</tr>'
}


function createRaavare() {
    event.preventDefault();
    var data =$('#raavareForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/raavare',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
            loadRaavarer();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}


function generateRaavareOptionList(raavare) {
    return '<option>' +raavare.raavareID +'</option>'
}

function addReceptKomp() {
    var table = document.getElementById("receptkomptablebody");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = document.getElementById("receptid").value;;
    cell2.innerHTML = document.getElementById("raavare").value;
    cell3.innerHTML = document.getElementById("netto").value;
    cell4.innerHTML = document.getElementById("tolerance").value;
    cell5.innerHTML = '<td><input type="button" value="Slet linje" onclick="deleteRow()"></td>'

}

function deleteRow() {
    var td = event.target.parentNode;
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
}

function lockReceptForm() {
    document.getElementById('receptid').disabled = true;
    document.getElementById('receptnavn').disabled = true;
    document.getElementById('raavare').disabled = false;
    document.getElementById('netto').disabled = false;
    document.getElementById('tolerance').disabled = false;
}

function saveReceptToDatabase() {
    //VIRKER IKKE
    event.preventDefault();
    var recept = {
        "receptId": document.getElementById('receptid').value,
        "receptNavn": document.getElementById('receptnavn').value,
        "receptKomponenter": getReceptKomponenterJSON()

    }
    data =JSON.stringify(recept);

    console.log(data);
    $.ajax({
        url: 'rest/recept',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
            alert(JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(textStatus);
            alert(errorThrown);
        }
    })
}


function getReceptKomponenterJSON() {
    var TableData = new Array();

    $('#receptkomptablebody tr').each(function(row, tr){
        TableData[row]={
            "nonNetto" : $(tr).find('td:eq(2)').text()
            , "tolerance" : $(tr).find('td:eq(3)').text()
            , "raavare" : {
            "raavareID": $(tr).find('td:eq(1)').text(),
                "raavareNavn": "ligemeget",
                "leverandoer": "ligemeget"
        } ,"receptId" : $(tr).find('td:eq(0)').text()
        }
    });
    //TableData.shift();  // first row will be empty - so remove
    console.log(TableData);
    return TableData;
}

function getRaavareNameById(id) {
    raavareList.forEach(function (item) {
        if (id = item.raavareID){
            return item.raavareNavn;
        }
    });
}

