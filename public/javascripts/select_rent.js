$(function() {
  $('.rent_select').change(function(e) {
    var $selected = $( ".rent_select option:selected" ).text()
    console.log($selected);
    $.ajax({
      url: '/api/rent/'+$selected,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        $(".rent_room").remove();
        for (var i = 0; i < data.length; i++) {
          $('.rent_list').append($('<a href="/rent/detail/'+data[i].id+ '" class="border-4 card mb-3 col-lg-4 col-md-6 col-sm-12 mt-3 rent_room"><img id="rentimg" src="'+ ((!data[i].img[0]) ? "" : data[i].img[0])+ '" alt="Card image cap" class="card-img-top" /><div class="card-body"><p class="card-text"><p>'+data[i].locate+'</p><p>'+data[i].detail_address+'</p></p></div></a>'));
        }
      }
    });
  });
}); 