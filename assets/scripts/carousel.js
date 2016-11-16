console.log(" -------", existingUrlList, iterationUrlList)
var currentE = 0;
var maxIndexE = existingUrlList.length-1

$('#existingCluster span#left').click(function(e) {
    if(currentE == 0){
      currentE = maxIndexE
    }else{
      currentE -= 1
    }
  $('img#existing').attr('src', existingUrlList[currentE])
});

$('#existingCluster span#right').click(function(e) {
    if(currentE == maxIndexE){
      currentE = 0
    }else{
      currentE += 1
    }
  $('img#existing').attr('src', existingUrlList[currentE])
});

var currentI = 0;
var maxIndexI = iterationUrlList.length-1

$('#iterationCluster span#left').click(function(e) {
    if(currentI == 0){
      currentI = maxIndexI
    }else{
      currentI -= 1
    }
  $('img#iteration').attr('src', iterationUrlList[currentI])
});

$('#iterationCluster span#right').click(function(e) {
    if(currentI == maxIndexI){
      currentI = 0
    }else{
      currentI += 1
    }
  $('img#iteration').attr('src', iterationUrlList[currentI])
});
