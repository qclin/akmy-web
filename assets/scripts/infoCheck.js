$(document).on('change', '[type=checkbox]', function(e) {
  if($(this).is(':checked')){
    var textBox = $('.text-'+e.target.value)
    var posX = (Math.random() * ($('#content-wrapper').width() - textBox.width())).toFixed();
		var posY = (Math.random() * ($('#content-wrapper').height() - textBox.height())).toFixed();
    var contentElement  =  $('.foreground').attr('class');
    if(contentElement.indexOf('project-images') > 0){
      $('.foreground').addClass('reveal');
    }
    $('.foreground').removeClass('foreground')
    $(textBox).show().css({
      'left':posX+'px',
      'top':posY+'px',
      'position': 'absolute'
    });
    $(textBox).addClass('foreground');
  }else{
    $('.text-'+e.target.value).hide()
  }
});
