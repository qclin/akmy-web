$('ul').click((e) => {
	$previewID = '#preview-'+e.target.id
	$($previewID).show()
	// $('#preview-2d').show()
	randomDisplaceItem($previewID)
})

$('ul').click((e) => {
	$(e.target.children).show()
	$(e.target).siblings('ul').children().hide()
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
