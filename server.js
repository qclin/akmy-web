
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');
var Q = require('q');
var pug = require('pug');

var firebaseSDK = require('./helper/firebase.js');
var aws = require('./helper/awsS3.js');
var filter = require('./helper/fileFilter.js');

// var db = new sqlite3.Database("db/akmy-web.db");

var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + "/assets"));


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/threejs-test', function(req, res){
	var payload = {
		'path': './obj/Leaf_3js/',
		'mtl': 'Leaf_3js.mtl',
		'obj': 'Leaf_3js.obj'
	}
	res.render('threejsLeaf.jade', {load : payload});
});


app.get('/canvas/blindSpot', function(req, res){

	var dynamic = req.query.sight

	aws.getDirectoryFiles('blindSpot/').then((urlList) =>{
		urlList = urlList.filter(Boolean).sort(filter.urlByIndex);
		var Panels = urlList.filter(filter.findPanels);
		var SVGs = urlList.filter(filter.findSVGs);
		var Wallpaper = urlList.filter(filter.findWallpaper);
		var Existings = urlList.filter(filter.findExistings);
		var Iterations = urlList.filter(filter.findIterations);
		res.render('canvas/blindSpot', {Panels, SVGs, Wallpaper, Existings, Iterations, dynamic})
	});
});

app.get('/canvas/blindSpot2', function(req, res){
	var dynamic = req.query.sight

	aws.getDirectoryFiles('blindSpot2/').then((urlList) =>{
		urlList = urlList.filter(Boolean).sort(filter.urlByIndex);
		var Panels = urlList.filter(filter.findPanels);
		var Bitmaps = urlList.filter(filter.findBitmaps);
		var Diagrams = urlList.filter(filter.findDiagrams);
		var Overlays = urlList.filter(filter.findOverlays);
		var SVGs = urlList.filter(filter.findSVGs);
		var Wallpaper = urlList.filter(filter.findWallpaper);
		res.render('canvas/blindSpot2', {Panels, Bitmaps, Diagrams, Overlays, SVGs, Wallpaper, dynamic})
	})
});

app.get('/canvas/:project', function(req, res){
	var projectTitle = req.params.project
	firebaseSDK.getProjInfo(projectTitle +'/').then(json => {
		aws.getDirectoryFiles(projectTitle).then((imageUrlList) => {
			imageUrlList = imageUrlList.filter(Boolean).sort(filter.urlByIndex)
			if(json.captions){
				var clusters= Object.keys(json.captions).map(function(key, value) {
					return {[key] :{
						caption : json.captions[key],
						urlList: imageUrlList.filter(s => s.includes([key]))
					}}
				});
				res.render(`canvas/${projectTitle}`, {imageUrlList, clusters, info:json})
			}else{
				res.render(`canvas/${projectTitle}`, {imageUrlList, info:json})
			}

		})
	})
});


// app.get('/canvas/:project', function(req, res){
// 	var projectTitle = req.params.project
// 	firebaseSDK.getProjInfo(projectTitle).then(json => {
// 		aws.getDirectoryFiles(projectTitle).then((imageUrlList) => {
// 			console.log("yooooooo --- ", imageUrlList)
// 			imageUrlList = imageUrlList.filter(Boolean).sort(filter.urlByIndex)
// 			res.render(`canvas/${projectTitle}`, {imageUrlList, info: json})
// 		})
// 	})
// })

app.get('/fabrication/:project', function(req, res){
	getProjectInfo("Fabrications", req.url).then((databaseRow) => {
		if(databaseRow){
			databaseRow.links = databaseRow.links.split(' ')
			aws.getProjectImg(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
				res.render('fabrications/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	});
});
app.get('/model/:project', function( req, res){
	var payload= getModelPayload(req.params.project)
	res.render('models/iframe.jade', {payload})
});
app.get('/who', function(req, res){
	res.render('who/about.jade')
});
// app.get('/model/fruits', function(req, res){
// 		var payload = {
// 			'path': '/3dModels/fruits/',
// 			'mtl': 'Orange_Brush.mtl',
// 			'obj': 'Orange_Brush.obj'
// 		}
// 		var info = {
// 			'name' : 'Fruits'
// 		}
// 		res.render('models/fruits.jade', {info, load: payload})
// });
//
// app.get('/model/corridor', function(req, res){
// 		var payload = {
// 			'path': '/3dModels/corridor/',
// 			'mtl': 'Wave.mtl',
// 			'obj': 'Wave.obj'
// 		}
// 		var info = {
// 			'name' : 'Corridor'
// 		}
// 		res.render('models/corridor.jade', {info, load: payload})
// });
//
// app.get('/model/food', function(req, res){
// 		var payload = {
// 			'path': '/3dModels/food/',
// 			'mtl': 'Cloth_Tamago.mtl',
// 			'obj': 'Cloth_Tamago.obj'
// 		}
// 		var info = {
// 			'name' : 'Food'
// 		}
// 		res.render('models/index.jade', {info, load: payload})
// });

// app.get('/model/:project', function(req, res){
// 	getProjectInfo("Models", req.url).then((databaseRow) => {
// 		if(databaseRow){
// 			databaseRow.links = databaseRow.links.split(' ')
// 			getProjectImg(databaseRow.route).then((imageUrlList) =>{
//
// 				imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
// 				var mtlFileUrl = imageUrlList.filter(findMtl)
// 				var objFileUrl =imageUrlList.filter(findObj)
// 				var path= imageUrlList[0].substring(0, imageUrlList[0].lastIndexOf('/')+1)
// 				console.log(" path == =? ", path)
// 				var payload = {
// 					'path': path,
// 					'mtl': mtlFileUrl[0].split('?')[0],
// 					'obj': objFileUrl[0].split('?')[0]
// 				}
// 				res.render('models/index.jade', {imageUrlList, info: databaseRow, load: payload})
// 			})
// 		}
// 	});
// });


app.listen(8080);
// app.listen(443);
console.log('Listening on port 8080');


function getProjectInfo(table, requestRoute){

	var deferred =Q.defer();
	db.get("SELECT * FROM "+table+" WHERE route = ?", requestRoute, function(err, row){
		if(err){
			deferred.resolve(err)
		}
		deferred.resolve(row)
	});
	return deferred.promise;
}





function getModelPayload(project){
	switch(project){
		case 'tamago':
			return {name:"Tamago", url:"https://p3d.in/e/rJeUL+spin+load+controls,border-hidden"}
		case 'fruits':
			return {name:"Fruits", url:"https://p3d.in/e/UtIBY+spin+load+controls,border-hidden"}
		case 'corridor':
			return {name:"Corridor", url:"https://p3d.in/e/9WFbS+spin+load+controls,border-hidden"}
		default:
		 break
	}
}
