$( document ).on( "mobileinit", function() {
  $.mobile.loading().hide();
  $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){
  if(window.innerWidth <= 768){
    window.scrollTo(0,1);
    $('nav').hide();
    $('#hamburger').click(function(){
      if($(this).html() == "close"){
        $(this).html("menu");
        $('.category').show()
        return $('nav').hide().removeClass('layover');
      }
      $('.category').hide()
      $(this).html("close")
      $('nav').show().addClass('layover');
    });
    $('.navMenuIcon').click(function(){
      $('nav').show();
    });
    var projectName = location.pathname.split('/')[2]
    $('span#'+projectName).addClass('activeSpan')
    if($('span#'+projectName).offset().left+$('span#'+projectName).width() > $('div.subNav').width()){
      $('div.subNav').scrollLeft($('span#'+projectName).offset().left-32)
    }
    $('#aboutME').click(function(){
      var isClosed = ( $('.panel').attr('class').indexOf('close') > -1 )
      if(isClosed){
        $(this).css('color', 'white');
        $('.panel').removeClass('close');
      }else{
        $(this).css('color', 'rgb(0,0,255)');
        $('.panel').addClass('close');
      }
    });
  }
});
