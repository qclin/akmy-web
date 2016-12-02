var orientation;
$(document).ready(function(){
  $('body').on('click', '.reveal', function(e){
     if(e.target.width > e.target.height){
       orientation = "landscape"
     }else{
       orientation = "portrait"
     }
     debugger
     $('.img-modal').addClass(orientation);
     $('.img-modal').css('top', 0);
     $(e.target).clone().appendTo('.img-modal');
  });
  $('body').on('click', '.reveal .svg-files', function(e){
    console.log("section.project-content ---- ")
    debugger;
  });
  $('body').on('click', '.foreground', function(e){
    if(e.target.width > e.target.height){
      orientation = "landscape"
    }else{
      orientation = "portrait"
    }
    debugger
    $('.img-modal').addClass(orientation);
    $('.img-modal').css('top', 0);
    $(e.target).clone().appendTo('.img-modal');
  });
  $('.img-modal').click(function(e){
    if(e.target.tagName != "IMG"){
      $('.img-modal').css('top', '100vh');
      $('.img-modal').find('img').remove();
      $('.img-modal').removeClass('portrait');
      $('.img-modal').removeClass('landscape');
    }
  });
});


var current = 0;
var imgList = $('.project-images')
var maxIndex = imgList.length-1

if(window.innerWidth <= 768){

  $('body').on('click', '.foreground', function(e){
    var orientation = "portrait"
    if(e.target.width > e.target.height){
      orientation = "landscape"
    }
    $('.img-modal').addClass(orientation);
    $('.img-modal').css('top', 0);
    $(e.target).clone().appendTo('.img-modal');
  });

  $(document).on('swipeleft', '.foreground',function(e){
    $(imgList).eq(current).removeClass('foreground')
    if(current == 0){
      current = maxIndex
    }else{
      current -= 1
    }
    $(imgList).eq(current).addClass('foreground')
  });

  $(document).on('swiperight', '.foreground',function(e){
    $(imgList).eq(current).removeClass('foreground')
    if(current == maxIndex){
      current = 0
    }else{
      current += 1
    }
    $(imgList).eq(current).addClass('foreground')
  });
}


$('object.svg-files').load(function (e) {
    debugger
    //alert("Document loaded, including graphics and embedded documents (like SVG)");
    var a = $('object.svg-files')

    //get the inner DOM of alpha.svg
    var svgDoc = a.contentDocument;
    svgDoc.on('click', function(e){
      debugger;
    });
    //get the inner element by id
    // var delta = svgDoc.getElementById("delta");
    // delta.addEventListener("mousedown", function(){ alert('hello world!')}, false);
});
