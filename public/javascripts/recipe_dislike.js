$(function() {
  // like btn
  $('.recipe-dislike-btn').click(function(e) {
    var $el = $(e.currentTarget);
    $.ajax({
      url: '/api/recipe/' + $el.data('id') + '/dislike',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        location = '';
      }
    });
  });
}); 