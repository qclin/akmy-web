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
