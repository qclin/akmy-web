$(document).ready(function(){
  $('#scroll-content').on('click', '.img-Button', function(e){
    $("body").addClass("modal-open");
    $('.imgWindow').addClass('open').addClass(e.target.id);
    $(e.target).clone().prependTo('.img-Content');

  });
});
