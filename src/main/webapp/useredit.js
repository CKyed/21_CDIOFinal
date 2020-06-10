$(document).ready(function () {
    loadUsers();
});


function loadUsers() {
    $.get('rest/user', function (data, textStatus, req) {
        $("#usertable").empty();
        $.each(data, function (i, elt) {
            $('#usertable').append(generateUserTable(elt));
        });
    });
}

function generateUserTable(user) {
    return '<tr><td>' + user.brugerID + '</td>' +
        '<td>' + user.rolle + '</td>' +
        '<td>' + user.brugerNavn + '</td>' +
        '<td>' + user.initialer + '</td>' +
        '<td>' + user.cpr + '</td>'
}


