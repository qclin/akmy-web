var currentI = 12;
var maxIndexI = 14;

$('#existingCluster1 span#left').click(function(e) {
    if(currentI == 12){
      currentI = maxIndexI
    }else{
      currentI -= 1
    }
  $('img#existing1').attr('src', existingUrlList[currentI])
});

$('#existingCluster1 span#right').click(function(e) {
    if(currentI == maxIndexI){
      currentI = 12
    }else{
      currentI += 1
    }
  $('img#existing1').attr('src', existingUrlList[currentI])
});

var currentE = 0;
var maxIndexE = 9;

$('#existingCluster2 span#left').click(function(e) {
    if(currentE == 0){
      currentE = maxIndexE
    }else{
      currentE -= 1
    }
  $('img#existing2').attr('src', existingUrlList[currentE])
});

$('#existingCluster2 span#right').click(function(e) {
    if(currentE == maxIndexE){
      currentE = 0
    }else{
      currentE += 1
    }
  $('img#existing2').attr('src', existingUrlList[currentE])
});
