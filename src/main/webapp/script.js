


function switchPage(page){
    $("#container").load(page);

}

function showForm() {
    var x = document.getElementById("createBruger");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

