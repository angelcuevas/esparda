$(window).ready(function () {
    $("#map").height( $(document).height() - (60) ); 
    console.log( $(".instrumentacion .boton").css("left", ($(window).width() - 65) ) );
    console.log( $(".instrumentacion .boton").css("top", 30 ) );
});

