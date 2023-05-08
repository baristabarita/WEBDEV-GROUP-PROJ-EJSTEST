//This is the script for the sidebar

$(document).ready(function(){
    
    $(".xp-menubar").on('click', function(){
        $("#sidebar").toggleClass('active');
        $("#content").toggleClass('active');
    });

    //This function allows user to toggle the sidebar
    $('.xp-menubar, .body-overlay').on('click', function(){
        $("#sidebar, .body-overlay").toggleClass('show-nav');
    });

});