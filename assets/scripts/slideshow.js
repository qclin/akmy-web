var current = 0;
var isMobile = (window.innerWidth <= 768)
var imgList = $('.project-images')
var maxIndex = imgList.length-1
var topIndex = 10;
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
  $(imgList).eq(current).addClass('foreground reveal').css({"z-index" : topIndex})
  topIndex++
  $('input[type=range]').val(100)
});

$( ".draggable" ).draggable(
  {
    start: function(event, ui) {
      $(this).addClass('reveal').css({"z-index" : topIndex});
      topIndex++
    }
});

$('#sp-showText').click(function(e){
  $('body').addClass('greymode');
  $('.subNav').addClass('blurmode');
  $('.modal-layer').show()
  $('.text-overlay').show()
});

$('body').on('touchstart click', '.text-overlay', function(e){
  if(e.target == this){
    $('body').removeClass('greymode');
    $('.subNav').removeClass('blurmode');
    $('.modal-layer').hide()
    $('.text-overlay').hide()
  }
});

$('input[type=range]').change(function(e){
  var sliderValue = e.target.value
  $('.project-content').find('div.foreground').css({transform: 'scale('+sliderValue/100+')'})
})


$(document).ready(function(){
  $('.project-images').eq(0).addClass('foreground')
});
