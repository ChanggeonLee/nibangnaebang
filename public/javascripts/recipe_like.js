$(function() {
  // like btn
  $('.recipe-like-btn').click(function(e) {
    var $el = $(e.currentTarget);
    $.ajax({
      url: '/api/recipe/' + $el.data('id') + '/like',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        location = '';
      },
      error: function(data, status) {
        if (data.status == 401) {
          alert('Login required!');
          location = '/signin';
        }
        console.log(data, status);
      },
      complete: function(data) {
        $el.removeClass('loading');
      }
    });
  });
}); 