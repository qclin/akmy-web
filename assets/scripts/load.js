$("nav").load("./views/components/nav.html");


// $(document).ready(function(){
//   $(':checkbox').change(function(){
//     debugger
//   });
// });

$(document).on('change', '[type=checkbox]', function(e) {
  if($(this).is(':checked')){
    $('.text-Box-'+e.target.value).show()
  }else{
    $('.text-Box-'+e.target.value).hide()
  }
});
