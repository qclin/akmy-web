var current = 0;
$('span.img-Ctrl').click(function(e) {
  var direction = e.target.dataset.value
  var imgList = $('.project-images')
  var maxIndex = imgList.length-1
  $(imgList).eq(current).removeClass('foreground')
  if(direction=="left"){
    if(current == 0){
      current = maxIndex
    }else{
      current -= 1
    }
    $(imgList).eq(current).addClass('foreground')
  }
  if(direction=="right"){
    if(current == maxIndex){
      current = 0
    }else{
      current += 1
    }
    $(imgList).eq(current).addClass('foreground')
  }
});


$('input[type=range]').change(function(e){
  var sliderValue = e.target.value
  $('.project-content').find('div.foreground').css({transform: 'scale('+sliderValue/100+')'})
})


$(document).ready(function(){
  $('.project-images').eq(0).addClass('foreground')
});
