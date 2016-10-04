$('#list-2d').click(() => {
	$('#preview-2d').show()
	randomDisplaceItem()
})

$('ul').click((e) => {
	$(e.target.children).show()
	$(e.target).siblings('ul').children().hide()
})

function randomDisplaceItem(){
	var position = 1
	$('#preview-2d').children('img').each(function(index, element){
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
