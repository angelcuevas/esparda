$map = document.getElementById("map");

$(window).ready(function () {
    $("#map").height( $(document).height() - (105) ); //console.log($("#map-header").outerHeight()); tudú;
});


function initMap(){

    waypoints = {
        //Waypoints Linea 0
        linea0: [],
        //Waypoints Linea 1
        linea1: [
            {lat: -29.40964546680778, lng: -66.9158148765564}, //Inicio de linea 1
            {location: new google.maps.LatLng(-29.411664231008626, -66.9158148765564), stopover: false}, //Punto 1
            {location: new google.maps.LatLng(-29.41433716251066, -66.91343307495117), stopover: false},
            {lat: -29.413839965334418, lng: -66.90354108810425} //Fin de linea 1
        ],

        linea3_ida: [
                    {"lat":-29.415911449082568,"lng":-66.85616254806519},
                    {"lat":-29.4162292005891,"lng":-66.85893058776855},
                    {"lat":-29.417631033609467,"lng":-66.86015367507935},
                    {"lat":-29.41886463066967,"lng":-66.85998201370239},
                    {"lat":-29.420191665330698,"lng":-66.85985326766968},
                    {"lat":-29.420098212752883,"lng":-66.85837268829346},
                    {"lat":-29.419967378999527,"lng":-66.85693502426147},
                    {"lat":-29.419799163926218,"lng":-66.85423135757446},
                    {"lat":-29.422621402182166,"lng":-66.85388803482056},
                    {"lat":-29.422378431111962,"lng":-66.85172080993652},
                    {"lat":-29.420565474782425,"lng":-66.85266494750977},
                    {"lat":-29.41970571098737,"lng":-66.85127019882202},
                    {"lat":-29.420584165218894,"lng":-66.8504548072815},
                    {"lat":-29.418397360818023,"lng":-66.84845924377441},
                    {"lat":-29.4177992522723,"lng":-66.84953212738037},
                    {"lat":-29.416864700621357,"lng":-66.84886693954468}
        ]
    };

     map = new google.maps.Map($map, {
        zoom: 14,
        center: {lat: -29.415742761836693, lng: -66.85974597930908}
    });
    var directionsService
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "green",
          strokeOpacity: 0.5,
          strokeWeight: 5
        }
    });

   

    if(!window.app)
    window.app ={

        cargarMapa: function(){
            directionsDisplay.setMap(map);
        },
        displayRoute: function(numeroDeLinea){

            directionsDisplay.polylineOptions.strokeColor = "yellow";

                directionsService.route({
                origin: waypoints[numeroDeLinea].shift(), //Primer objeto del arreglo
                destination: waypoints[numeroDeLinea].pop(), //Último objeto del arreglo
                waypoints: waypoints[numeroDeLinea],
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
                }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        var route = response.routes[0];
                        for (var i = 0; i < route.legs.length; i++) {
                            console.log("Inicio: " +route.legs[i].start_address + " Fin:" + route.legs[i].end_address + " Distancia: " + route.legs[i].distance.text);
                        }
                    } else {
                      window.alert('Directions request failed due to ' + status);
                    }
                });

        },




        prepararTandas: function(paradas){

            var tandas = [];
          
            var numeroCompletas = parseInt(paradas.length/10);
            var resto = paradas.length % 10 ;


            for(var i=0; i<numeroCompletas;i++){

               var tanda ={};

                tanda.inicio = paradas[i*10];
                tanda.fin = paradas[ (i+1) *10 -1];
                tanda.stops = this.preparePuntos(paradas, i*10+1, (i+1) *10 -2 );

                tandas.push(tanda);
            }


            var hastahora = tandas.length;
            var desde = hastahora*10-1;

            for(var i= desde; i<desde + resto - 1;i++){

               var tanda ={};

                tanda.inicio = paradas[i];
                tanda.fin = paradas[ desde + resto];

                if(resto > 3)
                    tanda.stops = this.preparePuntos(paradas, desde+1, desde + resto -2 );
                else
                    tanda.stops = [];


                tandas.push(tanda);
            }


            console.log("tandas",tandas);    
            return tandas;
            

        },
        preparePuntos: function(paradas, indexA, indexB){    

            var arreglo = [];

            for(var i = indexA; i<=indexB; i++){
                arreglo.push({location: new google.maps.LatLng(paradas[i].lat, paradas[i].lng), stopover: false}); 
            }
            return arreglo;

        },
       /* displayEntireRoute: function(numeroDeLinea){

            var that = this;

            var paradas = waypoints[numeroDeLinea];

            var tandas = this.prepararTandas(paradas);

            

            for(var i=0; i< tandas.length ; i++){


                (function(i,directionsService){
                    directionsService.route({
                    origin: tandas[i].inicio, //Primer objeto del arreglo
                    destination: tandas[i].fin, //Último objeto del arreglo
                    waypoints: tandas[i].stops,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING
                    }, function(response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            var route = response.routes[0];
                            for (var i = 0; i < route.legs.length; i++) {
                                console.log("Inicio: " +route.legs[i].start_address + " Fin:" + route.legs[i].end_address + " Distancia: " + route.legs[i].distance.text);
                            }
                        } else {
                          window.alert('Directions request failed due to ' + status);
                        }
                    });                   


                })(i,directionsService)

                    
            }
        },*/

        displayPolyLine: function(ruta){

            ruta1 = new google.maps.Polyline({
                path: ruta.ida,
                geodesic: true,
                strokeColor: "rgb(255,50,50)",
                strokeOpacity: 0.7,
                strokeWeight: 3
            });

            ruta1.setMap(map);

             ruta2 = new google.maps.Polyline({
                path: ruta.vuelta,
                geodesic: true,
                strokeColor: "rgb(50,255,50)",
                strokeOpacity: 0.7,
                strokeWeight: 3
            });

            ruta2.setMap(map);

            map.setCenter(ruta.ida[parseInt(10)]);
            map.setZoom(14);
        }


    }

    app.cargarMapa();


    /*$("#linea1").on("pageshow" , function() {
       //app.displayRoute("linea1")  <---------PROBLEMA DE LIMITE 8
       app.displayEntireRoute("linea3_ida") //<---------SUPUESTA SOLUCIÓN
    });*/

    $("#link_linea1").click(function(){ 
        app.displayPolyLine(linea3);
    });






   //Obtener Latitud y longitud al hacer click
    google.maps.event.addListener(map, 'click', function(event) {
        console.log(event.latLng);
        
        if(grabando){
            grabaCaminos.grabarPunto(event.latLng);
        }
    });    

    var caminoNuevo = [];
    var lineaAdibujar = new google.maps.Polyline({
                path: caminoNuevo,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
    });

   lineaAdibujar.setMap(map);






    var grabando = false; 

    var grabaCaminos = { 

        grabarPunto: function(punto){
            if(caminoNuevo.length == 0)
                caminoNuevo.push( {lat: punto.H, lng: punto.L});
            else
                 caminoNuevo.push( {lat: punto.H, lng: punto.L});
               // caminoNuevo.push({location: new google.maps.LatLng(punto.H, punto.L), stopover: false})  

            var path = lineaAdibujar.getPath();

            lineaAdibujar.strokeColor = "green";

            path.push(punto);
        },

        finalizarCamino: function(){//RETURNS A STRING WITH PATH POINTS

           // var anterior = caminoNuevo[caminoNuevo.length - 1];
          //  caminoNuevo[caminoNuevo.length - 1] =  {lat: anterior.location.H, lng: anterior.location.L}; 

            var str = "";
            for(var i=0; i<caminoNuevo.length; i++){
                
                if(i==0)
                str = str + JSON.stringify(caminoNuevo[i])+",";
                if(i>0 && i< caminoNuevo.length-1)
               // str = str + "{location: new google.maps.LatLng("+caminoNuevo[i].location.H+", "+caminoNuevo[i].location.L+"), stopover: false},";
                  str = str +  JSON.stringify(caminoNuevo[i])+",";
                if(i==caminoNuevo.length-1)
                 str = str + JSON.stringify(caminoNuevo[i]);   
            }

            console.log(str);
        }


    }


    document.addEventListener('keyup',function(event){
        if(event.keyCode == 82){
            grabando = true;
            console.log("Nuevo Camino");
        }

        if(event.keyCode == 70){
            grabando = false;
            grabaCaminos.finalizarCamino();
        }

        if(event.keyCode == 71){
            console.log("Borrado " + caminoNuevo.pop()+ lineaAdibujar.getPath().pop());
        }

    });


    $("#link_linea1").click();


}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function tuposicion(){
    var latitude=null;
    var longitude=null;

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            latitude=position.coords.latitude;
            longitude=position.coords.longitude;

            var punto = new google.maps.LatLng(latitude,longitude);

            var marker = new google.maps.Marker({
                position:punto,
                map: map,
                title: 'Tú!'
            });
            map.setCenter(punto);

        })
    return punto;
    }
    else {
        console.log("No Se pudo encontrar tu localización"); 
    }
}