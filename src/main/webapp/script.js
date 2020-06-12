

function switchPage(page){
    $("#container").load(page);
}

function checkLogin() {
    var id =document.getElementById("loginBrugerID").value;
    console.log(id);
    $.ajax({
        method: 'GET',
        url:'rest/bruger/'+id,
        success: function (data) {
            console.log(data);
            switch (data.rolle) {
                case "Administrator":
                    switchPage('brugeradministrator.html');
                    break;
                case "Farmaceut":
                    switchPage('farmaceut.html');
                    break;
                case "Produktionsleder":
                    switchPage('produktionsleder.html');
                    break;
                case "Laborant":
                    switchPage('laborant.html');
                    break;
            }
        }
  })
}




