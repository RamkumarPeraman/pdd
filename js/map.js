var x1 = 13.067439, y1 = 80.237617, x = 9.9252007, y = 78.11977539999998;
var map = L.map('map').setView([x1, y1], 6);
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleStreets.addTo(map);
var startMarker = L.marker([x, y], { draggable: false });
var endMarker = L.marker([x1, y1], { draggable: false });
var routingControl = L.Routing.control({
    waypoints: [
        L.latLng(x, y),
        L.latLng(x1, y1)
    ],
    routeWhileDragging: false,
    createMarker: function (i, waypoint, n) {
        var markerOptions = {
            draggable: false, // Set draggable to false to prevent marker dragging
        };
        var marker = L.marker(waypoint.latLng, markerOptions);
        return marker;
    }
}).addTo(map);
startMarker.addTo(map);
endMarker.addTo(map);
routingControl.on('routeselected', function (e) {
    startMarker.dragging.disable();
    endMarker.dragging.disable();
});
routingControl.on('routingerror', function (e) {
    startMarker.dragging.enable();
    endMarker.dragging.enable();
});