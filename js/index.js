$map = document.getElementById("map");

$(window).ready(function () {
    $("#map").height( $(document).height() - (105) ); //console.log($("#map-header").outerHeight());
});

function initMap(){

    waypoints = [
        //Waypoints Linea 0
        [],
        //Waypoints Linea 1
        [
            {lat: -29.40964546680778, lng: -66.9158148765564},
            {location: new google.maps.LatLng(-29.411664231008626, -66.9158148765564), stopover: false},
            {location: new google.maps.LatLng(-29.411664231008626, -66.9158148765564), stopover: false},
            {lat: -29.412365181422135, lng: -66.91378712654114}
        ]
    ];

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map($map, {
        zoom: 14,
        center: {lat: -29.415742761836693, lng: -66.85974597930908}
    });
    directionsDisplay.setMap(map);


    directionsService.route({
    origin: waypoints[1].shift(),
    destination: waypoints[1].pop(), //Último objeto del arreglo
    waypoints: waypoints[1],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
        } else {
          window.alert('Directions request failed due to ' + status);
        }
    });



    //Obtener Latitud y longitud al hacer click
    google.maps.event.addListener(map, 'click', function(event) {
        console.log(event.latLng);
    });
}
