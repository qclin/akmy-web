var current = 0;
var isMobile = (window.innerWidth <= 768)
var imgList = $('.project-images')
var topIndex = 11;
var projectName = location.pathname.split('/')[2]


$('.sketch-link').click(function(e){
  $('.selected').toggleClass('selected');
  $(this).addClass('selected');
  var dataKey = $(this).data('key')
  $('.reveal-text').toggleClass('reveal-text');
  $('.reveal-images').toggleClass('reveal-images');
  $(`.text-content#${dataKey}`).addClass('reveal-text');
  $(`.sketch-pile#${dataKey}-images`).addClass('reveal-images');
  $(`.sketch-pile#${dataKey}-images`).find('.project-images').eq(0).addClass('reveal').css({"z-index" : topIndex});
});



$('span.img-Ctrl').click(function(e) {

  if(projectName.indexOf("storyTime") > -1){
    imgList = $('.reveal-images .project-images');
  }
  var maxIndex = imgList.length-1
  var direction = this.dataset.value

  console.log(' image ctrl ---- ', direction, maxIndex, current, imgList);
  $(imgList).eq(current).removeClass('foreground')
  if(direction=="left"){
    if(current == 0){
      current = maxIndex
    }else{
      current -= 1
    }
  }
  if(direction == "right"){
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
