var current = 0;
var isMobile = (window.innerWidth <= 768)
var imgList = $('.project-images')
var maxIndex = imgList.length-1

$('span.img-Ctrl').click(function(e) {
  var direction = this.dataset.value
  $(imgList).eq(current).removeClass('foreground')
  if(direction=="left"){
    if(current == 0){
      current = maxIndex
    }else{
      current -= 1
    }
  }
  if(direction=="right"){
    if(current == maxIndex){
      current = 0
    }else{
      current += 1
    }
  }
  if(isMobile) return $(imgList).eq(current).addClass('foreground')
  $(imgList).eq(current).addClass('foreground reveal')
});


$(document).ready(function(){
  console.log("document ready ")
  if(window.innerWidth <= 768){
    console.log(" innner width")
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



    $( "img" ).on( "swipe", swipeHandler );

      // Callback function references the event target and adds the 'swipe' class to it
      function swipeHandler( event ){
        $( event.target ).addClass( "swipe" );
      }
  }



});

$('#sp-showText').click(function(e){
  $('body').addClass('greymode');
  $('.subNav').addClass('blurmode');
  $('.modal-layer').show()
  $('.text-overlay').show()
});

$('body').on('touchstart click', '.text-overlay', function(e){
  $('body').removeClass('greymode');
  $('.subNav').removeClass('blurmode');
  $('.modal-layer').hide()
  $('.text-overlay').hide()
});

$('input[type=range]').change(function(e){
  var sliderValue = e.target.value
  $('.project-content').find('div.foreground').css({transform: 'scale('+sliderValue/100+')'})
})


$(document).ready(function(){
  $('.project-images').eq(0).addClass('foreground')
});
