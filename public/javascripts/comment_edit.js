$(function() {
  // like btn
  $('.edit').click(function(e) {
    var $el = $(e.currentTarget);
    var test = ":contains('" + $el.data('id') + "')"
    $('.card .card-body .comment').remove(test);
  });
}); 