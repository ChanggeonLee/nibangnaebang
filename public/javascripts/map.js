var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
  mapOption = { 
      center: new daum.maps.LatLng(37.22504793094649, 127.18783656486625 ), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
  };

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
 
// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
var positions = [
    {
        content: '명지대정문', 
        latlng: new daum.maps.LatLng(37.22527380763559,127.18744838616914),
        removable : true
    },
    {
        content: '동진마을', 
        latlng: new daum.maps.LatLng(37.22633821733953,127.19233567782348),
        removable : true
    },
    {
        content: '명지대 후문', 
        latlng: new daum.maps.LatLng(37.22454884869307, 127.18141556262005),
        removable : true
    },
    {
        content: '덕곡마을',
        latlng: new daum.maps.LatLng(37.22512574010548,127.18563390838324),
        removable : true
    }
];

for (var i = 0; i < positions.length; i ++) {
    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new daum.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
        removable : positions[i].removable
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    daum.maps.event.addListener(marker, 'click', makrkerclick(map, marker, infowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makrkerclick(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
        var $select  = infowindow.getContent();
        console.log($select);
        $.ajax({
          url: '/api/review/select/'+$select,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            $(".list").remove();
            for (var i = 0; i < data.building_name.length; i++) {
              $('.building_list').append($('<tr class=list><th scope="row">' + i +'</th><td><a href="/review/detail/' + data.building_name[i] + '">' + data.building_name[i] + '</a></td></tr>'));
            }
          },
          error: function(data, status) {
            if (data.status == 401) {
              alert('Login required!');
              location = '/signin';
            }
          }
        });
    };
}
