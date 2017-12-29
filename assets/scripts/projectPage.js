var topIndex = 10;


///// cluster ctrl code
var clcurrent = 0;
var isMobile = (window.innerWidth <= 768)
var clusterImgList = $('.cluster-image')
var clmaxIndex = clusterImgList.length-1
////


$(document).ready(function(){
  $('.project-images').eq(0).addClass('reveal');

  $('.cluster').click(function(e){
    if($(e.target).hasClass('img-Ctrl')){
      var direction = e.target.dataset.value

      console.log("img-Ctrl", numOfClusters, currentIndex, clmaxIndex, clcurrent, numOfImages)

      $(clusterImgList).eq(clcurrent).removeClass('foreground')
      if(direction=="left"){
        if(clcurrent == 0){
          clcurrent = clmaxIndex
        }else{
          clcurrent -= 1
        }
      }
      if(direction=="right"){
        if(clcurrent == clmaxIndex){
          clcurrent = 0
        }else{
          clcurrent += 1
        }
      }
      if(isMobile) return $(clusterImgList).eq(clcurrent).addClass('foreground')
      console.log('what is clcurrent classs ', $(clusterImgList).eq(clcurrent), clcurrent, clusterImgList);
      $(clusterImgList).eq(clcurrent).addClass('reveal').css({"z-index" : topIndex})
      topIndex++

    }else if($(e.target).parent().hasClass("reveal")){


      var orientation = "portrait";
      if(e.target.width > e.target.height){
        orientation = "landscape"
      }
      $('.img-modal').addClass(orientation);

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


    }else{
      $(e.target).parent().addClass('reveal').css({"z-index" : topIndex});
      topIndex++
    }
  });

  $('.img-modal').click(function(e){
    if(e.target.tagName != "IMG"){
      $('.img-modal').css('top', '-100vh');
      $('.img-modal').find('img').remove();
      $('.img-modal').find('svg').remove();
      $('.img-modal').find('object').remove();
      $('.img-modal').removeClass('portrait');
      $('.img-modal').removeClass('landscape');
    }
  });
});


$( ".draggable" ).draggable({
    start: function(event, ui) {
      $(this).addClass('reveal').css({"z-index" : topIndex});
      topIndex++
    }
});


  var numOfPile = $('.image-pile').length;

  for (var i = 0; i< numOfPile; i++){
    var numOfImages = $('.image-pile').eq(i).children().length;


    for(var j = 0; j< numOfImages; j++ ){
      console.log("hellloooo ----------", $('.image-pile').eq(i).children().eq(j));
      var topPixel = j*20+'px';
      var leftPixel = j*50 +'px';
      $('.image-pile').eq(i).children().eq(j).css({'top': topPixel, 'left': leftPixel});
    }
  }

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
