$.getScript('http://dapi.kakao.com/v2/maps/sdk.js?appkey={{APPKEY}}&autoload=false', function() { daum.maps.load(function() { var map = new daum.maps.Map(el, options); }); })

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new daum.maps.LatLng(37.545105, 126.965464), // 지도의 중심좌표
                level: 1 // 지도의 확대 레벨
            };

        var map = new daum.maps.Map(mapContainer, mapOption),
            customOverlay = new daum.maps.CustomOverlay({}),
            infowindow = new daum.maps.InfoWindow({
                removable: true
            });

        // 지도를 생성합니다

        var cp47_danger = 0.3;

        // 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다
        var areas = [{
            name: '청파로47길',
            path: [
                new daum.maps.LatLng(37.545035, 126.963599),
                new daum.maps.LatLng(37.545216, 126.964821),
                new daum.maps.LatLng(37.545180, 126.965448),
                new daum.maps.LatLng(37.544748, 126.967956),
                new daum.maps.LatLng(37.544926, 126.970400),
                new daum.maps.LatLng(37.544818, 126.970421),
                new daum.maps.LatLng(37.544668, 126.968335),
                new daum.maps.LatLng(37.544648, 126.967912),
                new daum.maps.LatLng(37.545080, 126.965427),
                new daum.maps.LatLng(37.545101, 126.964821),
                new daum.maps.LatLng(37.544923, 126.963657),
            ],
            danger: 0.7,
            color: '#000000',
        }, ];

        for (var i = 0, len = areas.length; i < len; i++) {
            displayArea(areas[i]);
        }

        function displayArea(area) {

            if (area.danger > 0.5) {
                area.color = '#A74038'
            } else {
                area.color = '#657263'
            }

            var polygon = new daum.maps.Polygon({
                map: map,
                path: area.path,
                strokeWeight: 3,
                strokeColor: area.color,
                strokeOpacity: 0.8,
                strokeStyle: 'longdash',
                fillColor: area.color,
                fillOpacity: 0.7
            });

            daum.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
                polygon.setOptions({
                    fillOpacity: 0.8
                });

                customOverlay.setContent('<div class = "area">' + area.name + '</div>');
                customOverlay.setPosition(mouseEvent.latLng);
                customOverlay.setMap(map);
            });


            daum.maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {
                customOverlay.setPosition(mouseEvent.latLng);
            });

            daum.maps.event.addListener(polygon, 'mouseout', function() {
                polygon.setOptions({
                    fillOpacity: 0.7
                });
                customOverlay.setMap(null);
            });

            daum.maps.event.addListener(polygon, 'click', function(mouseEvent) {
                var content = '<div class="info">' +
                    '   <div class="title">' + area.name + '</div>' +
                    '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></area>' +
                    '</div>';

                infowindow.setContent(content);
                infowindow.setPosition(mouseEvent.latLng);
                infowindow.setMap(map);
            });
        }