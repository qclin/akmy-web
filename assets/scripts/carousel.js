var currentI = 12;
var maxIndexI = 14;

$('#scroll-content').on('click', '#existing1.imgWindow span#left', function(e) {
    if(currentI == 12){
      currentI = maxIndexI
    }else{
      currentI -= 1
    }
  $('img#existing1').attr('src', existingUrlList[currentI])
});


$('#scroll-content').on('click', '#existing1.imgWindow span#right',function(e) {
    if(currentI == maxIndexI){
      currentI = 12
    }else{
      currentI += 1
    }
  $('img#existing1').attr('src', existingUrlList[currentI])
});

var currentE = 0;
var maxIndexE = 9;

$('#scroll-content').on('click', '#existing2.imgWindow span#left',function(e) {
    if(currentE == 0){
      currentE = maxIndexE
    }else{
      currentE -= 1
    }
  $('img#existing2').attr('src', existingUrlList[currentE])
});

$('#scroll-content').on('click', '#existing2.imgWindow span#right',function(e) {
    if(currentE == maxIndexE){
      currentE = 0
    }else{
      currentE += 1
    }
  $('img#existing2').attr('src', existingUrlList[currentE])
});
