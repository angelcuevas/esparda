$map = document.getElementById("map");
idaPresionado = true;
vueltaPresionado = true;

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

        rutaActual : [],

        rutas: [],

        poliLynes: [],

        marcadores: [],

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
        displayEntireRoute: function(numeroDeLinea){

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
        },

        togglePolyLines: function(ida_o_vuelta){


            var index = this.rutas.indexOf(this.rutaActual);

            if(index == -1)
                return;

            lineaEnCuestion = this.poliLynes[index][ida_o_vuelta];


            if(lineaEnCuestion.getMap() == null)
                lineaEnCuestion.setMap(map);
            else
                lineaEnCuestion.setMap(null);
        },

        fadeMarkerOut: function(marker){

            if(marker.map ==null || marker.opacity <0.7)
                return;

           var fadeOut = setInterval(function () {
                 opacity = marker.opacity - 0.1;
                marker.setOptions({'opacity': opacity});

             }, 200)

           if(marker.opacity <=0){
                clearInterval(fadeOut)
                marker.setMap(null);    
           }
            
        },


        fadeMarkerIn: function(marker){


            if(marker.map!=null || marker.opacity > 0 )
                return;

             marker.setMap(map)

            console.log(marker);


           var fadeIn = setInterval(function () {
                 opacity = marker.opacity + 0.1;
                marker.setOptions({'opacity': opacity});

             }, 200)

           if(marker.opacity >=0.7){
                clearInterval(fadeIn)
           }
            
        },



        showSingleMarker: function(punto){

            var that = this;
            var index = this.rutas.indexOf(this.rutaActual);
            var paradas = this.marcadores[index];

            if(this.poliLynes[index].ida.getMap()!=null){

                $.each(paradas.ida, function( ind, parada ) {  
                    var distancia = that.getDistance(punto, parada.position);
                    
                    if(distancia < 350 ){
                        if(parada.map == null){
                           // that.fadeMarkerIn(parada);
                           parada.setMap(map);
                        }
                    }
                    else{
     
                        if(parada.map != null){
                            //that.fadeMarkerOut(parada);
                            parada.setMap(null);
                        }

                    }
                });
            }else{
                 $.each(paradas.ida, function( ind, parada ) {
                    parada.setMap(null);
                 })
            }
           


        },

        makeMarcadores: function(puntos){

            var marcadores = [];

            var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
            };  


            var image = {
              url: "image/bus-marker-icon.png",
              size: new google.maps.Size(40, 60),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(20, 55),
              scaledSize: new google.maps.Size(40, 60)
            };


            for(var i=0; i<puntos.length; i++){

                 var marker = new google.maps.Marker({
                    position:puntos[i],
                   // map: map,
                    shape: shape,
                    title: "Parada "+  parseInt(i + 1),
                    icon: image,
                    zIndex: i+1,
                    opacity: 0.7
                  });

                 marcadores.push(marker);
            }


            return marcadores;

        },

        rad : function(x) {
          return x * Math.PI / 180;
        },

        getDistance : function(p1, p2) {

            var rad = this.rad;


          var R = 6378137; // Earth’s mean radius in meter
          var dLat = rad(p2.lat() - p1.lat());
          var dLong = rad(p2.lng() - p1.lng());
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
          return d; // returns the distance in meter
        },


        displayPolyLine: function(data){ //pasa la linea y cuales desplegar
            console.log("Displaing polyline");


             var lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
              };

            this.rutas.push(data.ruta);
            this.rutaActual =data.ruta;


            ruta1 = new google.maps.Polyline({
                path: data.ruta.ida,
                geodesic: true,
                strokeColor: "rgb(255,50,50)",
                strokeOpacity: 0.7,
                strokeWeight: 3,
                icons: [{
                  icon: lineSymbol,
                  offset: '100%'
                }]


            });

            ruta1.setMap(map);

             ruta2 = new google.maps.Polyline({
                path: data.ruta.vuelta,
                geodesic: true,
                strokeColor: "rgb(15,255,25)",
                strokeOpacity: 0.7,
                strokeWeight: 3,
                icons: [{
                  icon: lineSymbol,
                  offset: '100%'
                }]
            });

            ruta2.setMap(map);


            this.poliLynes.push({ida: ruta1, vuelta: ruta2});
            this.marcadores.push({ida:this.makeMarcadores(data.ruta.paradas_ida)});


            map.setCenter(data.ruta.ida[parseInt(data.ruta.ida.length/2)]);
            map.setZoom(12,8);
        }


    }

    app.cargarMapa();


    /*$("#linea1").on("pageshow" , function() {
       //app.displayRoute("linea1")  <---------PROBLEMA DE LIMITE 8
       app.displayEntireRoute("linea3_ida") //<---------SUPUESTA SOLUCIÓN
    });*/

    /*$("#link_linea1").click(function(){ 
        app.displayPolyLine({ruta:linea3});
    });

    $("#link_linea6").click(function(){ 
        app.displayPolyLine({ruta:linea6});
    });*/






   //Obtener Latitud y longitud al hacer click
    google.maps.event.addListener(map, 'click', function(event) {
        console.log(event.latLng);
        
        if(grabando){
            grabaCaminos.grabarPunto(event.latLng);
        }
    });    

    google.maps.event.addListener(map, 'mousemove', function(event){
        app.showSingleMarker(map.getCenter());
    })





    var caminoNuevo = [];
    var setDeMarcadoresNuevo = [];
    
    var lineaAdibujar = new google.maps.Polyline({
                path: caminoNuevo,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
    });

   lineaAdibujar.setMap(map);






    var grabando = false; 
    var grabando_conMarcadores = false;

    var grabaCaminos = { 

        grabarPunto: function(punto){
            if(caminoNuevo.length == 0)
                caminoNuevo.push( {lat: punto.H, lng: punto.L});
            else
                 caminoNuevo.push( {lat: punto.H, lng: punto.L});
               // caminoNuevo.push({location: new google.maps.LatLng(punto.H, punto.L), stopover: false})  

            var path = lineaAdibujar.getPath();

            if (grabando_conMarcadores == true)
               this.grabarMarcador(punto);
            else{
            lineaAdibujar.strokeColor = "green";
            path.push(punto);
            }
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
        },

        borrarLastMarcador: function(){

            if(!setDeMarcadoresNuevo.length>0)
                return;


            var marker = setDeMarcadoresNuevo[setDeMarcadoresNuevo.length-1];
            marker.setMap(null);

            setDeMarcadoresNuevo.pop();

        },  

        grabarMarcador: function(punto){

            var marker = new google.maps.Marker({
                position:punto,
                map: map,
                title: "Parada "+  parseInt(setDeMarcadoresNuevo.length + 1)
            });

            setDeMarcadoresNuevo.push(marker);

        }


    }


    document.addEventListener('keyup',function(event){

        if(event.keyCode == 77){
            grabando_conMarcadores = true;
            console.log("Marcadores");
        }


        if(event.keyCode == 82){
            grabando = true;
            console.log("Nuevo Camino");
        }

        if(event.keyCode == 70){
            grabando = false;
            grabaCaminos.finalizarCamino();
        }

        if(event.keyCode == 71){

            if(grabando_conMarcadores)
                grabaCaminos.borrarLastMarcador();

            console.log("Borrado " + caminoNuevo.pop()+ lineaAdibujar.getPath().pop());
        }

    });

    $("#link_linea1").click();  
}


    (function() {


            $(":jqmData(role='page')#LineasShower").one("pageshow", function(event) {
            $("#LineasShower").undelegate('a', 'vclick');
  
           $('a.ida').click(function(){
                app.togglePolyLines("ida");
                idaPresionado = !idaPresionado;
           })
            
            $('a.vuelta').click(function(){
                app.togglePolyLines("vuelta");
                vueltaPresionado = !vueltaPresionado;
           })

        


            $("#LineasShower").on("vclick click", function (e) {

              e.preventDefault();
              e.stopImmediatePropagation();

              $(e.target).closest('a').toggleClass($.mobile.activeBtnClass);

            });
          });
    })();


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


position = {
    lastLatLng : null,
    markers : [],
    distanceMatrixResponses : [],
    distanciaMinima : Infinity,
    LatLngMinimo : null,

    MarkYourCurrentPosition: function(){
        _this = this;
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                newPosition = _this.createGoogleMapLatLng(position);
                _this.addMarkerwithMyPosition(newPosition,map);
            });
        }
        else {
            console.log("No Se pudo encontrar tu localización"); 
        }
    },
    createGoogleMapLatLng : function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        this.lastLatLng = new google.maps.LatLng(latitude,longitude);
        return this.lastLatLng;
    },
    addMarkerwithMyPosition: function(LatLng,map){

        if(idaPresionado && vueltaPresionado){
            alert("Desmarque ruta de ida o vuelta, sólo se puede seleccionar una");
        }else{

            var marker = new google.maps.Marker({
                position:LatLng,
                map: map,
                title: 'Tú!'
            });
            map.setCenter(LatLng);
            this.markers.push(marker);

            if (idaPresionado){
                this.getMatrixResponses(LatLng, app.rutaActual.paradas_ida); //TODO PARADAS DINAMICAS
            }
            
            if (vueltaPresionado){
                this.getMatrixResponses(LatLng, app.rutaActual.paradas_vuelta); //TODO PARADAS DINAMICAS
            }

            this.distanceMatrixResponses = [];
            console.log("map: ", map);
        }

    },
    getShorterLocation: function(paradas){
        for (var i = paradas.length - 1; i >= 0; i--) {
            paradas[i]
        };
    },
    /*calculateDistance: function(puntoUno, puntoDos){ //this shit doesnt work
        var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + puntoUno.H + "," + puntoUno.L + "&destinations=" +  puntoDos.H + "," + puntoDos.L;
        console.log(url);
        $.getJSON( "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + puntoUno.H + "," + puntoUno.L + "&destinations=" +  puntoDos.H + "," + puntoDos.L, function( data ) {
        })
        .done(function( data ) {
          console.log(data);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.error( jqxhr );
        });
    },*/
    getMatrixResponses: function(origen, destinos){
        var service = new google.maps.DistanceMatrixService;
        _this = this;
        for (var i = 0; i <= destinos.length - 1; i = i + 25) {
            service.getDistanceMatrix({
                origins: [origen],
                destinations: destinos.slice(i,i+24),
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
                },
                function(response, status) {
                    if (status !== google.maps.DistanceMatrixStatus.OK) {
                        alert('Error was: ' + status);
                    } else {
                        console.log("En response (distanceMatrixResponses.length)", _this.distanceMatrixResponses.push(response), " response:", response);
                        _this.findTheShorterPath(origen, destinos);
                    }
                }
            );
        }//endfor
    },
    findTheShorterPath : function(origen, destinos){
        var _this = this;
        var iIndex = 0;
        var jIndex = 0;
        var puntoDestino;

        if(this.distanceMatrixResponses.length < (Math.ceil(destinos.length / 25))){
            return null;
        }else{
            console.log("matrixresponse", this.distanceMatrixResponses);

            for (var i = 0; i <= this.distanceMatrixResponses.length - 1; i++) {
                for (var j = 0; j <= this.distanceMatrixResponses[i].rows[0].elements.length - 1; j++) {
                    if (this.distanceMatrixResponses[i].rows[0].elements[j].distance.value < _this.distanciaMinima) {
                        _this.distanciaMinima = this.distanceMatrixResponses[i].rows[0].elements[j].distance.value;
                        iIndex = i;
                        jIndex = j;
                    }
                }
            }

            console.log("distanciaMinima: ", _this.distanciaMinima + "   i:" + iIndex + "j:" + jIndex);
            puntoDestino = destinos[(iIndex * 25) + jIndex];
            
            console.log("puntoDestino", puntoDestino);

            var directionsDisplay = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();

            directionsDisplay.setMap(map);
            var request = {
                origin:origen,
                destination:puntoDestino,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
            });

        this.distanceMatrixResponses = [];

        }
    },
    testCalculateDistance: function(){
        var puntoUno = new google.maps.LatLng(-29.402248596717108,-66.8723577260971);
        
        this.getMatrixResponses(puntoUno, linea3.paradas_ida);
    }
}
