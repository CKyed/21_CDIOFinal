var brugertype;
var brugerID;
var brugerNavn;
var user;
$(function () {
    $('#topnav').hide();
});

function switchPage(page){
    $("#container").load(page);
}

function resetBruger(){
    for (let i = 0; i <=3 ; i++) {
        $('#topnavForwardng'+i).show();
        $('#topnav').hide();
    }
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
            //set global variable "data" for later use
            user = data;
            brugerID=data.brugerID;
            brugerNavn=data.brugerNavn;
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
                    switchPage('laborant/laborant.html');
                    break;
            }
        },
        error: function (jqXHR) {
            errorMessage.innerHTML= jqXHR.responseText;
        }
    })
}

function brugerRettigheder(){
    $('#topnav').show();
    for (let i = 0; i < brugertype; i++){
        var x=document.getElementById("brugerforwarding"+i);
        x.style.display = "none";
        $('#topnavForwardng'+i).hide();
    }
}