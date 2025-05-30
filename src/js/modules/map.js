function initMap() {

    let mapElement = document.getElementById('map');
    let centerCoords = mapElement.getAttribute('data-center').split(',').map(Number);
    let placemarkCoords = mapElement.getAttribute('data-placemark').split(',').map(Number);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: centerCoords,
            zoom: 17,
        }, {
            suppressMapOpenBlock: true
        });

        myMap.controls.add('zoomControl')

        var myPlacemark = new ymaps.Placemark(placemarkCoords, {}, {
            preset: 'twirl#redIcon'
        });



        myMap.geoObjects.add(myPlacemark);
        myMap.controls.remove('routeEditor');
    }

    ymaps.ready(init);
}

export default initMap;