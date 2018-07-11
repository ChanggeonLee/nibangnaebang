$(function() {
  // like btn
  $('.edit').click(function(e) {
    var $el = $(e.currentTarget);
    var input = "<form method='POST' action='/review/detail/comment/"+$el.data('id')+"?_method=PUT' > \
                    <input type='text' name='comment' value='"+$el.data('content')+"'> \
                    <button type='submit'> 댓글 수정하기\
                 </from>"
    $('.card .card-body .comment:contains(' + $el.data('content') + ')').replaceWith(input);
  });
}); 