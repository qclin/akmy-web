var currentOver = 0;
var maxIndexOver = overlayUrlList.length-1

$('#overlayCluster span#left').click(function(e) {
    if(currentOver == 0){
      currentOver = maxIndexOver
    }else{
      currentOver -= 1
    }
  $('img#overlay').attr('src', overlayUrlList[currentOver])
});

$('#overlayCluster span#right').click(function(e) {
    if(currentOver == maxIndexOver){
      currentOver = 0
    }else{
      currentOver += 1
    }
  $('img#overlay').attr('src', overlayUrlList[currentOver])
});

var currentBit = 3;
var maxIndexBit = 8

$('#bitmapCluster span#left').click(function(e) {
    if(currentBit == 3){
      currentBit = maxIndexBit
    }else{
      currentBit -= 1
    }
  $('img#bitmap').attr('src', bitmapUrlList[currentBit])
});

$('#bitmapCluster span#right').click(function(e) {
    if(currentBit == maxIndexBit){
      currentBit = 3
    }else{
      currentBit += 1
    }
  $('img#bitmap').attr('src', bitmapUrlList[currentBit])
});
