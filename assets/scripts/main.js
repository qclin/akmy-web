$('#list-2d').click(() => {
	$('#preview-2d').show()
	randomDisplaceItem()
})

$('ul').click((e) => {
	$(e.target.children).show()
})

function randomDisplaceItem(){
	var position = 1
	$('#preview-2d').children('img').each(function(index, element){
		var placeStyle = 'imageOverlay position'+position
		$(this).addClass(placeStyle)
		position ++
	});
}


$('select > option').hover(function(){
	$(this).val()
})
$('li').hover(function(e){
});
