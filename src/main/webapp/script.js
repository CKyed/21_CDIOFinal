var brugertype;
var brugerID;
var brugerNavn;

function switchPage(page){
    $("#container").load(page);
}

function checkLogin() {
    var id =document.getElementById("loginBrugerID").value;
    var errorMessage;
    errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML="";
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            brugerID=data.brugerID;
            brugerNavn=data.brugerNavn;
            console.log(brugerID);
            console.log(brugerNavn);
            switch (data.rolle) {
                case "Administrator":
                    brugertype=0;
                    switchPage('brugerforwarding.html');
                    break;
                case "Farmaceut":
                    brugertype=1;
                    switchPage('brugerforwarding.html');
                    break;
                case "Produktionsleder":
                    brugertype=2;
                    switchPage('brugerforwarding.html');
                    break;
                case "Laborant":
                    brugertype=3;
                    switchPage('laborant.html');
                    break;
            }
        },
        error: function (jqXHR) {
            errorMessage.innerHTML= jqXHR.responseText;
        }
    })
}

function brugerRettigheder() {
    for (let i = 0; i < brugertype; i++) {
        console.log(i);
        var x=document.getElementById("brugerforwarding"+i);
        x.style.display = "none";
    }
}