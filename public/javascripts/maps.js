var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.088622, lng: -74.143584},
        zoom: 8
    });
}