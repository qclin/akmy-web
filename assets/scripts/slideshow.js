var current = 0;
$(document).on('click', 'span.img-Ctrl', function(e) {
  var direction = e.target.dataset.value
  var imgList = $('.project-content').find('div')
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


$(document).on('change', 'input[type=range]', function(e){
  var sliderValue = e.target.value
  $('.project-content').find('div.foreground').css({transform: 'scale('+sliderValue/100+')'})
})
