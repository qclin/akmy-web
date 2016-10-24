$(document).on('change', '[type=checkbox]', function(e) {
  if($(this).is(':checked')){
    var textBox = $('.text-'+e.target.value)
    var posX = (Math.random() * ($('#content-wrapper').width() - textBox.width())).toFixed();
		var posY = (Math.random() * ($('#content-wrapper').height() - textBox.height())).toFixed();
    $(textBox).show().css({
      'left':posX+'px',
      'top':posY+'px',
      'position': 'absolute',
      'z-index': 5
    })
  }else{
    $('.text-'+e.target.value).hide()
  }
});
