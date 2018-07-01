var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
  mapOption = { 
      center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
  };

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
 
// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
var positions = [
    {
        content: '명지대정문', 
        latlng: new daum.maps.LatLng(33.450705, 126.570677),
        removable : true
    },
    {
        content: '생태연못', 
        latlng: new daum.maps.LatLng(33.450936, 126.569477),
        removable : true
    },
    {
        content: '텃밭', 
        latlng: new daum.maps.LatLng(33.450879, 126.569940),
        removable : true
    },
    {
        content: '근린공원',
        latlng: new daum.maps.LatLng(33.451393, 126.570738),
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
    // daum.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
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
            console.log(data);
            for (var i = 0; i < data.building_name.length; i++) {
              console.log(i);
              $('.building_list').append($('<tr><th scope="row">' + i +'</th><td><a href="/review/detail/' + data.building_name[i] + '">' + data.building_name[i] + '</a></td></tr>'));
            }
            // $('.rent .num-likes').text(data.numLikes);
            // $('.rent-like-btn').hide();
          },
          error: function(data, status) {
            if (data.status == 401) {
              alert('Login required!');
              location = '/signin';
            }
            console.log(data, status);
          }
          // complete: function(data) {
          //   $el.removeClass('loading');
          // }
        });
    };
}
