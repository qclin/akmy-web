if(window.innerWidth <= 768){
  $(document).ready(function(){
    $('nav').hide();


    $('#hamburger').click(function(){
      console.log(" hamburger click click")
      $('nav').show();

    });


  });

  $('.navMenuIcon').click(function(){
    console.log(" menu click click")
    $('nav').show();
  })

  if(location.pathname == ""){

  }

}

$(document).ready(function(){
  $('body').on('click', '.reveal', function(e){
    var orientation = "portrait"
    if(e.target.width > e.target.height){
      orientation = "landscape"
    }
    $('.img-modal').addClass(orientation);
    $('.img-modal').css('top', 0);
    $(e.target).clone().appendTo('.img-modal');
  });
  $('.img-modal').click(function(e){
    if(e.target.tagName != "IMG"){
      $('.img-modal').css('top', '100vh');
      $('.img-modal').find('img').remove()
    }
  });
})
