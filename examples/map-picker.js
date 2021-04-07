// browser version + JQuery

var map = new RenderMap('map', [$latitude.val() || -1.4137498, $longitude.val() || 122.9567191], $latitude.val() && $longitude.val() ? 16 : 4);

map.on('click', function (e) {
    map.removeAllMarkers();
    map.setMarkers([{
        icon: 'shop',
        coordinate: [e.latlng.lat, e.latlng.lng]
    }]);

    $longitude.val(e.latlng.lng);
    $latitude.val(e.latlng.lat);
});

map.on('contextmenu', function (e) {
    map.removeAllMarkers();
    $longitude.val('');
    $latitude.val('');
})

$longitude.on('change, keyup', function () {
    map.removeAllMarkers();
    map.setMarkers([{
        icon: 'shop',
        coordinate: [$latitude.val(), $longitude.val()]
    }]);
});

$latitude.on('change, keyup', function () {
    map.removeAllMarkers();
    map.setMarkers([{
        icon: 'shop',
        coordinate: [$latitude.val(), $longitude.val()]
    }]);
});

if ($latitude.val() && $longitude.val()) {
    map.setMarkers([{
        icon: 'shop',
        coordinate: [$latitude.val(), $longitude.val()]
    }]);
}