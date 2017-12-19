$(document).ready(function(){
  $('#scroll-content').on('click', '.img-Button', function(e){
    $("body").toggleClass("modal-open");
    $('.imgWindow').addClass('open');
    $('.imgWindow').attr('id', e.target.id);
    $('.imgWindow').css('top', '0');
    $(e.target).clone().prependTo('.img-Content');
  });

  $('.imgWindow').on('click', '.windowClose', function(e){
    $('.imgWindow').css('top', '-100vh');
    $('.imgWindow').find('img').remove();
    $('.imgWindow').removeClass('open')
    $('.imgWindow').removeAttr('id');
    $("body").toggleClass("modal-open");

  });

});
