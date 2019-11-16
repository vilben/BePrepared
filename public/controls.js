
function initPage() {
        initFloats();
        findCollapsibles();
        initCollapsibles();
        restoreCollapsibles();
}

function checkFloatGroup(floatId) {
    $("*").find('.floatControl[data-float-id="' + floatId + '"]').each(function () {
        if ($(this).get(0).value !== "") {
            setOutset(floatId);
        }
        else {
            removeOutset(floatId);
        }
    });
}

function setOutset(floatId) {
    $("*").find('.floatLabel[data-float-id="' + floatId + '"]').each(function () {
        $(this).addClass("outset");
    });
}

function removeOutset(floatId) {
    $("*").find('.floatLabel[data-float-id="' + floatId + '"]').each(function () {
        $(this).removeClass("outset");
    });
}

function initFloats() {
    $('.floatControl[data-float-id]').each(function () {
        if ($(this).get(0).value !== "") {
            $("*").find('.floatLabel[data-float-id="' + $(this).data('float-id') + '"]').each(function () {
                $(this).addClass("outset");
            });
        }
        else {
            $("*").find('.floatLabel[data-float-id="' + $(this).data('float-id') + '"]').each(function () {
                $(this).removeClass("outset");
            });
        }
    });

    $('.floatControl[data-float-id]').focus(function () {
        $("*").find('.floatLabel[data-float-id="' + $(this).data('float-id') + '"]').each(function () {
            $(this).addClass("outset");
        });
    });

    $('.floatControl[data-float-id]').focusout(function () {
        if ($(this).get(0).value === "") {
            $("*").find('.floatLabel[data-float-id="' + $(this).data('float-id') + '"]').each(function () {
                $(this).removeClass("outset");
            });
        }
    });
}


var $collapsibleHeaders;
var $collapsibleContents;

function findCollapsibles() {
    $collapsibleHeaders = $('.collapsibleHeader[data-collapsible-groupname]');
    $collapsibleContents = $('.collapsibleContent[data-collapsible-groupname]');
}

function initCollapsibles() {
    // find header of collapsible elements
    $collapsibleHeaders.click(function () {
        // onclick, toggle active class and the displayed icon with it
        //$(this).find(".titleText").toggleClass("active");
        $(this).toggleClass("active");
        // find corresponding content of collapsible elements
        $collapsibleContents.filter('[data-collapsible-groupname="' + $(this).data('collapsible-groupname') + '"]').each(function () {
            console.log($(this));
            // setting transition effect here in case it was removed previously
            $(this).css("transition", "max-height 0.2s ease-out");
            if ($(this).css("max-height") === "0px") {
                // log in sessionstorage if elements are collapsed
                sessionStorage.setItem($(this).data('collapsible-groupname'), "expanded");
                $(this).css("max-height", $(this).get(0).scrollHeight + "px");
            } else {
                sessionStorage.removeItem($(this).data('collapsible-groupname'));
                $(this).css("max-height", "");
            }
        });
    });
}

function restoreCollapsibles() {
    $collapsibleHeaders.each(function () {
        if (sessionStorage.getItem($(this).data('collapsible-groupname')) === "expanded") {
            $collapsibleContents.filter('[data-collapsible-groupname="' + $(this).data('collapsible-groupname') + '"]').each(function () {
                // removing transition effect here so the user doesn't see the expanding & scrollposition is preserved
                $(this).css("transition", "unset");
                $(this).css("max-height", $(this).get(0).scrollHeight + "px");
            });
            // adding the active class so the proper icon is displayed
            //$(this).find(".titleText").addClass("active");
            $(this).addClass("active");
        }
    });
}