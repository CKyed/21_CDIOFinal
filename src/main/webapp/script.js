var brugertype;

function switchPage(page){
    $("#container").load(page);
}

function checkLogin() {
    var id =document.getElementById("loginBrugerID").value;
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
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