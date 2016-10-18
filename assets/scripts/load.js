$("nav").load("./views/components/nav.html");


// $(document).ready(function(){
//   $(':checkbox').change(function(){
//     debugger
//   });
// });

$(document).on('change', '[type=checkbox]', function(e) {
  console.log($(this), e.target.value)
});
