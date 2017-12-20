$( ".draggable" ).draggable(
  {
    start: function(event, ui) {
      $(this).addClass('reveal').css({"z-index" : topIndex});
      topIndex++
    }
});

$(document).ready(function(){
  $('.cluster-image').eq(0).addClass('foreground')
});
