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
            if(data.aktiv==1){
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
            }
            else if(data.aktiv==0){
                errorMessage.innerHTML = "Denne bruger er inaktiv og du kan derfor ikke logge ind med denne"
            }
        },
        error: function (jqXHR) {
            console.log(jqXHR.responseJSON.technicalMSG);
            errorMessage.innerHTML= jqXHR.responseJSON.userMSG;
        }
    })
}

function brugerRettigheder(){
    $('#topnav').show();
    for (let i = 0; i < brugertype; i++){
        $('#topnavForwardng'+i).hide();
    }
}