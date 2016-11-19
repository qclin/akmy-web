$( document ).on( "mobileinit", function() {
  $.mobile.loading().hide();
  $.mobile.hidePageLoadingMsg()
});

var projectType = location.pathname.split('/')[1]
var projectName = location.pathname.split('/')[2]
var projectTypeList = ["2d", "3d", "fabrication", "model"]

// if(window.innerWidth > 768){
//   if(projectTypeList.indexOf(projectType) > -1 ){
//     $('#'+projectType).find('.navDropdownBox').show()
//     $('#'+projectName).addClass('selectedLink')
//   }
// }

if(window.innerWidth > 768){
  if(projectTypeList.indexOf(projectType) > -1 ){
    $('#'+projectType).addClass('selectedTopic')
  }
}
$('.label').click((e) => {
  if(window.innerWidth <= 768){
    return window.location.href = $(e.target).next().children().first().children().attr('href');
  }
  $(e.target).next().show()
  $(e.target).parent().siblings().children('.navDropdownBox').hide()
  if(location.pathname == "/"){
    var selectedId = $(e.target).parent().attr('id')

    $(`#preview-${selectedId}`).show(function(){
      $(`#preview-${selectedId}`).siblings().hide()
      generateImageSizePostion(`#preview-${selectedId}`)
    });

    // $("#content").load("partials/preview.jade #preview-"+$(e.target).parent().attr('id'), function(){
    //   $previewID = '#preview-'+$(e.target).parent().attr('id');
    //   generateImageSizePostion($previewID)
    // });
  }
});

$('li').hover(function(e){
  if(location.pathname == "/"){
    var projectId = $(this).data('projectId')
    $('#highlightGlow').insertAfter($('#IMG_'+projectId));
  }
});

/*  randomize postion - method 2 use js to generate both randomize img size and positioning */
function generateImageSizePostion(previewID){
	$(previewID).children('span').each(function(index, element){
		$(this).addClass('imageOverlay');
    var width = $(this).children('img').width();
		var height = $(this).children('img').height();
		var posX = (Math.random() * (window.innerWidth - width/5)).toFixed();
		var posY = (Math.random() * (window.innerHeight - height/5)).toFixed();
    if(height > width){
      $(this).addClass('img-portrait');
    }
    $(this).css({
      'left':posX+'px',
      'top':posY+'px',
      'position': 'absolute'
    });
		$(this).children('img').css({
			'width':width/5+'px',
			'height':height/5+'px',
		});
	});
}

$('.optionLinks').click(function(e){
	$(this).addClass('selectedLink')
	$("#IMG_"+this.id).addClass('selectedProject')
});

$('.optionLinks').mouseover(function(e){
	$("#IMG_"+this.id).addClass('highlightSelection')
});

$('.optionLinks').mouseleave(function(e){
	$("#IMG_"+this.id).removeClass('highlightSelection')
});
