function switchPage(page){
    $("#container").load(page);
}

function checkLogin() {
    var id =;
    console.log(id);
    event.preventDefault();
    $.ajax({
        url:'rest/bruger/'+id,
        method: 'GET',
        success: function (data) {
            console.log(data.rolle);
            switch (data.rolle) {
                case "Administrator":
                    switchPage('brugeradministrator.html');
                    break;
                case "Farmaceut":
                    switchPage('farmcaeu.html');
                    break;
                case "Produktionsleder":
                    switchPage('produktionsledelse.html');
                    break;
                case "Laborant":
                    switchPage('laborant.html');
                    break;
            }
        }
    })
}




