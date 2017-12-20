
module.exports = {
  urlByIndex: function (a, b){
  	var aa = parseInt(a.substring(a.lastIndexOf("/") + 1, a.indexOf("_")));
  	var bb = parseInt(b.substring(b.lastIndexOf("/") + 1, b.indexOf("_")));
  	return aa < bb ? -1 : (aa > bb ? 1 : 0);
  },
  findPanels: function (item){
  	if(item.indexOf('/Panels/') > -1) return true;
  },
  findBitmaps: function (item){
  	if(item.indexOf('/Bitmaps/') > -1) return true;
  },
  findDiagrams: function (item){
  	if(item.indexOf('/Diagrams/') > -1) return true;
  },
  findExistings: function (item){
  	if(item.indexOf('/existing-photos/') > -1) return true;
  },
  findIterations: function (item){
  	if(item.indexOf('/iteration-scans/') > -1) return true;
  },
  findOverlays: function (item){
  	if(item.indexOf('/Overlays/') > -1) return true;
  },
  findSVGs:function (item){
  	if(item.indexOf('/SVGs/') > -1) return true;
  },
  findWallpaper: function (item){
  	if(item.indexOf('/Wallpaper/') > -1  && item.indexOf('/SVGs/') == -1) return true;
  },
  findMtl: function (item){
  	if(item.indexOf('.mtl') > -1) return true;
  },
  findObj: function (item){
  	if(item.indexOf('.obj') > -1) return true;
  },

  findKey: function(item){
    console.log("findkey ---- ", item, this)
    if(item.includes(this.value) > -1) return true;
  }

}
