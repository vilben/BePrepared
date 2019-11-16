$(document).ready(() =>{
    $('#showFoodList').click(()=>{
        console.log("yippe");

        $.get("http://localhost:8080/checkFood").done((response)=>{
            console.log("test", response);
        })

    });








});

