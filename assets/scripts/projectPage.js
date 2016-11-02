$( document ).on( "mobileinit", function() {
  $.mobile.loading().hide();
  $.mobile.hidePageLoadingMsg()
});

$(document).ready(function(){
  if(window.innerWidth <= 768){
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
    $('body').on('click', '.foreground', function(e){
      var orientation = "portrait"
      if(e.target.width > e.target.height){
        orientation = "landscape"
      }
      $('.img-modal').addClass(orientation);
      $('.img-modal').css('top', 0);
      $(e.target).clone().appendTo('.img-modal');
    });
  }
  $('body').on('click', '.reveal', function(e){
    var orientation = "portrait"
    if(e.target.width > e.target.height){
      orientation = "landscape"
    }
    $('.img-modal').addClass(orientation);
    $('.img-modal').css('top', 0);
    $(e.target).clone().appendTo('.img-modal');
  });
  $('.img-modal').click(function(e){
    if(e.target.tagName != "IMG"){
      $('.img-modal').css('top', '100vh');
      $('.img-modal').find('img').remove()
    }
  });
});


var current = 0;
var isMobile = (window.innerWidth <= 768)
var imgList = $('.project-images')
var maxIndex = imgList.length-1

if(window.innerWidth <= 768){
  $(document).on('swipeleft', '.foreground',function(e){
    $(imgList).eq(current).removeClass('foreground')
    if(current == 0){
      current = maxIndex
    }else{
      current -= 1
    }
    $(imgList).eq(current).addClass('foreground')
  });

  $(document).on('swiperight', '.foreground',function(e){
    $(imgList).eq(current).removeClass('foreground')
    if(current == maxIndex){
      current = 0
    }else{
      current += 1
    }
    $(imgList).eq(current).addClass('foreground')
  });
}
