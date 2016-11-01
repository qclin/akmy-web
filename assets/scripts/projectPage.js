$(document).ready(function(){
  if(window.innerWidth <= 768){
    $('nav').hide();
    $('#hamburger').click(function(){
      console.log(" hamburger click click")
      $('nav').show();
    });
    $('.navMenuIcon').click(function(){
      console.log(" menu click click")
      $('nav').show();
    });
    var projectName = location.pathname.split('/')[2]
    $('span#'+projectName).addClass('activeSpan')
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

  console.log("page init")
  if(window.innerWidth <= 768){
    console.log(" innner width")

    $('body').on('swipeleft',function(){
        console.log('swipe left _-__ ')
    });

    $('.foreground').on('swipeleft', function(){
      console.log("left swipe ___ ");
      // here can just use this.remove foreground then append prev or next
      $(imgList).eq(current).removeClass('foreground')
      if(current == 0){
        current = maxIndex
      }else{
        current -= 1
      }
      $(imgList).eq(current).addClass('foreground')
    });
    $('.foreground').on('swiperight', function(){
      $(imgList).eq(current).removeClass('foreground')
      console.log("right swipe ___ ");
    });
  }
