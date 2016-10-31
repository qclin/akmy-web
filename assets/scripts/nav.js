var projectType = location.pathname.split('/')[1]
var projectName = location.pathname.split('/')[2]
var projectTypeList = ["2d", "3d", "facbrication", "3dmodels"]
if(window.innerWidth > 768){
  if(projectTypeList.indexOf(projectType) > -1 ){
    $('#'+projectType).find('.navDropdownBox').show()
    $('#'+projectName).addClass('selectedLink')
  }
}
$('.label').click((e) => {
  if(window.innerWidth <= 768){
    return window.location.href = $(e.target).next().children().first().children().attr('href');
  }
  $(e.target).next().show()
  $(e.target).parent().siblings().children('.navDropdownBox').hide()
  if(location.pathname == "/"){
    $("#content").load("./views/components/preview.html #preview-"+$(e.target).parent().attr('id'), function(){
      $previewID = '#preview-'+$(e.target).parent().attr('id');
      generateImageSizePostion($previewID)
    });
  }
});

$('li').hover(function(e){
  if(location.pathname == "/"){
    var projectId = $(this).data('projectId')
    $('#highlightGlow').insertAfter($('#IMG_'+projectId));
  }
});


function randomDisplaceItem(previewID){
	var position = 1
	$(previewID).children('span').each(function(index, element){
		var placeStyle = 'imageOverlay position'+position
		$(this).addClass(placeStyle)
		position ++
	});
}

/*  randomize postion - method 2 use js to generate both randomize img size and positioning */
function generateImageSizePostion(previewID){
	var sizeArray=[{width: 200, height: 140},
								{width: 320, height: 210},
								{width: 180, height: 120},
								{width: 175, height: 260}]
	/// images are now stretch >> switch to randomize scale factor instead
	$(previewID).children('span').each(function(index, element){
		$(this).addClass('imageOverlay')
		var imgSize = sizeArray[Math.floor(Math.random() * sizeArray.length)];
		var posX = (Math.random() * ($('#content-wrapper').width() - imgSize.width)).toFixed();
		var posY = (Math.random() * ($('#content-wrapper').height() - imgSize.height)).toFixed();
		$(this).children('img').css({
			'width':imgSize.width+'px',
			'height':imgSize.height+'px',
			'left':posX+'px',
			'top':posY+'px',
			'position': 'absolute'
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
