
// $('nav').on('click', 'ul', (e) => {
// 	$previewID = '#preview-'+e.target.id
// 	$($previewID).siblings($('.preview')).hide()
// 	$($previewID).show()
// 	// randomDisplaceItem($previewID)
// 	generateImageSizePostion($previewID)
// 	$(e.target.children).show()
// 	$(e.target).siblings('ul').children().hide()
// });
//
// $('nav').on('hover', 'li', (e) => {
// 	var projectId = $(this).data('projectId')
// 	console.log('___ hovering___', projectId)
// 	$('#highlightGlow').insertAfter($('#IMG_'+projectId));
// })


/* randomize postion - method 1 use CSS styling with preset positons 1-6 by matching selection index,
short-coming index1 will always have class position1 */

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
