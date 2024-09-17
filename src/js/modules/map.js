function initMap() {
    ymaps.ready(init);
    let mapElement = document.getElementById('map');
    let centerCoords = mapElement.getAttribute('data-center').split(',').map(Number);
    let placemarkCoords = mapElement.getAttribute('data-placemark').split(',').map(Number);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: centerCoords,
            zoom: 17,
            controls: ['zoomControl']
        }, {
            suppressMapOpenBlock: true
        });


        var myPlacemark = new ymaps.Placemark(placemarkCoords, {}, {
            // iconLayout: 'default#image',
            // // iconImageHref: 'img/icons/placemark.svg',
            // iconImageSize: [70, 80],
            // iconImageOffset: [-15, -42]
            preset: "islands#redStretchyIcon",
        });



        myMap.geoObjects.add(myPlacemark);
        myMap.controls.remove('routeEditor');
    }
}

export default initMap;