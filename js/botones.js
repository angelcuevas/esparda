$(window).ready(function () {
    $("#map").height( $(document).height() - (55) ); 
    $(".instrumentacion .boton").css("left", ( $(window).width() - ( ($(window).width()/100)*2 + 28 ) ) );
    $(".instrumentacion .boton").css("top", 30 );

    var botones = $(".instrumentacion .boton");
    var burbujas = $("p.speech");

    botones.each(function(i){
        $(burbujas[i]).css("right", $(window).width() - $(botones[i]).offset().left+25);
        $(burbujas[i]).css("top", $(botones[i]).offset().top -10);
    });

});

$( window ).resize(function() {
    $("#map").height( $(window).height() - (55) ); 
    $(".instrumentacion .boton").css("left", ( $(window).width() - ( ($(window).width()/100)*2 + 28 ) ) );
    $(".instrumentacion .boton").css("top", 30 );
    var botones = $(".instrumentacion .boton");
    var burbujas = $("p.speech");

    botones.each(function(i){
        $(burbujas[i]).css("right", $(window).width() - $(botones[i]).offset().left+25);
        $(burbujas[i]).css("top", $(botones[i]).offset().top -10);
    });

});