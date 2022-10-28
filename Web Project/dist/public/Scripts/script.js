$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();    
        } else {
            $('#toTop').fadeOut();
        }
    });

    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},0);
    });    
});

$("#nav_proj").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#PROJECT").offset().top
    }, 2000);
});

$("#nav_home").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#topOfPage").offset().top
    }, 2000);
});

$("#nav_abt").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#abtus").offset().top
    }, 2000);
});

$("#nav_des").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#design").offset().top
    }, 2000);
});

$("#nav_web").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#spiderman").offset().top
    }, 2000);
});

$("#nav_cont").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#getintouch").offset().top
    }, 2000);
});

<<<<<<< Updated upstream
// var mouse = document.getElementById("mouse");
// document.body.addEventListener("mousemove", function(e) {

//     if(e.clientX <= 520){
//         mouse.style.left = e.clientX + "px",
//         mouse.style.top = e.clientY + "px";
//     }

=======


// var mouse = document.getElementById("mouse");
// document.body.addEventListener("mousemove", function(e) {

//     if(e.clientX <= 520){
//         mouse.style.left = e.clientX + "px",
//         mouse.style.top = e.clientY + "px";
//     }

>>>>>>> Stashed changes
// });
