var current = 0;
var isMobile = (window.innerWidth <= 768)
var imgList = $('.cluster-image')
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
