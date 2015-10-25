$(window).ready(function () {
    $("#map").height( $(document).height() - (60) ); 
    console.log( $(".instrumentacion .boton").css("left", ($(window).width() - 65) ) );
    console.log( $(".instrumentacion .boton").css("top", 30 ) );

    var botones = $(".instrumentacion .boton");
    var burbujas = $("p.speech");

    botones.each(function(i){



    	$(burbujas[i]).css("right", $(window).width() - $(botones[i]).offset().left+25);
    	$(burbujas[i]).css("top", $(botones[i]).offset().top -10);


    })



});

