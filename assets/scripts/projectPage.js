
$(document).ready(function(){
  $('body').on('click', '.foreground', function(e){
    var orientation = "portrait";
    if(e.target.width > e.target.height){
      orientation = "landscape"
    }
    $('.img-modal').addClass(orientation);
    console.log("-000---- ", orientation)
    console.log("-001---- ", $('.img-modal'))
    var isSVG = $(this).children('object').length > 0
    if($(e.target).hasClass('mobile')){
      var svgSource = $(e.target).attr('src')
      $(`<object data=${svgSource}>`, {"data": svgSource, type: "image/svg+xml"}).prependTo('.img-modal');
    }
    if(isSVG){
      $('.img-modal').css({'top': 0, 'overflow':'scroll'});
      return $(this).children('object').clone().prependTo('.img-modal');
    }else{
      $('.img-modal').css('top', 0);
      $(e.target).clone().prependTo('.img-modal');
    }
  });

  $('.img-modal').click(function(e){
    if(e.target.tagName != "IMG"){
      $('.img-modal').css('top', '100vh');
      $('.img-modal').find('img').remove();
      $('.img-modal').find('svg').remove();
      $('.img-modal').find('object').remove();
      $('.img-modal').removeClass('portrait');
      $('.img-modal').removeClass('landscape');
    }
  });
});


var current = 0;
var imgList = $('.project-images')
var maxIndex = imgList.length-1
if(window.innerWidth <= 768){
  $('object').remove()
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('object').remove()
  }
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
