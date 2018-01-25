
var current = 0;
var isMobile = (window.innerWidth <= 768)
var imgList = $('.project-images')
var topIndex = 11;
var projectName = location.pathname.split('/')[2]



$('span.img-Ctrl').click(function(e) {


  if(projectName.indexOf("storyTime") > -1 || projectName.indexOf("fabrication") > -1){
    imgList = $('.reveal-images .project-images');
  }

  var maxIndex = imgList.length-1
  var direction = this.dataset.value

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

  $('#currentIndex').eq(0).text(current+1);
  $('#maxIndex').eq(0).text(imgList.length);

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
  $('.project-images').eq(0).addClass('foreground');

  if(projectName.indexOf("storyTime") > -1 || projectName.indexOf("fabrication") > -1  ){
    var hashLink = location.hash
    if (hashLink){
      var folder = hashLink.substring(1);
      $(`[data-key=${folder}]`).eq(0)[0].click();
    }else{
      $('.sketch-link').eq(0)[0].click();
    }
  }
});



$('.sketch-link').click(function(e){
  $('section.cluster-content').eq(0).scrollTop(0);
  $('.selected').toggleClass('selected');
  $(this).addClass('selected');
  var dataKey = $(this).data('key')
  $('.reveal-text').toggleClass('reveal-text');
  $('.reveal-images').toggleClass('reveal-images');
  $('.reveal-links').toggleClass('reveal-links');

  $(`.text-content#${dataKey}-text`).addClass('reveal-text');
  $(`.sketch-pile#${dataKey}-images`).addClass('reveal-images');
  $(`.link-group#${dataKey}-link`).addClass('reveal-links');

  $(`.sketch-pile#${dataKey}-images`).find('.project-images').eq(0).addClass('reveal').css({"z-index" : topIndex});

  imgList = $('.reveal-images .project-images');

  $('#maxIndex').eq(0).text(imgList.length);

});
