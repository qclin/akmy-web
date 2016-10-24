var projectType = location.pathname.split('/')[1]
var projectName = location.pathname.split('/')[2]
var projectTypeList = ["2d", "3d", "facbrication", "3dmodels"]

if(projectTypeList.indexOf(projectType) > -1 ){
  $('#'+projectType).find('.navDropdownBox').show()
  $('#'+projectName).addClass('selectedLink')
}

$('nav ul').click((e) => {
  $(e.target.children).show()
  $(e.target).siblings('ul').children().hide()
	$("#content").load("./views/components/preview.html #preview-"+e.target.id, function(){
		$previewID = '#preview-'+e.target.id
		generateImageSizePostion($previewID)
	});
});
$('body').on('hover', 'li', (e) => {
	var projectId = $(this).data('projectId')
	console.log('___ hovering___', projectId)
	$('#highlightGlow').insertAfter($('#IMG_'+projectId));
})

$('li').hover(function(e){
	$('#highlightGlow').insertAfter($('#IMG_'+e.target.id));
})

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
