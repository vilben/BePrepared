$(document).ready(() => {

    let $mainContent = $('#mainContent');
    let baseUrl = window.location.origin;

    $('#showFoodList').click(() => {
        console.log("yippe");

        $.get(baseUrl +"/checkFood").done((response) => {
            console.log("test", response);
        })
    });

    $('#showUsers').click(() => {
        $.get(baseUrl +"/userOverview").done((response) => {
            $mainContent.replaceWith(response);
        })
    })


});

