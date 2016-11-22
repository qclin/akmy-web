
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');
var Q = require('q');
/// set credentials to request for signedURL
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.loadFromPath('.aws-config.json');

var db = new sqlite3.Database("db/akmy-web.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + "/assets"));
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('index');
});
app.get('/swipe-test', function(req, res){
	res.render('swipe.jade');
});
app.get('/threejs-test', function(req, res){
	var payload = {
		'path': './obj/Leaf_3js/',
		'mtl': 'Leaf_3js.mtl',
		'obj': 'Leaf_3js.obj'
	}
	res.render('threejsLeaf.jade', {load : payload});
});


app.get('/2d/:project', function(req, res){
	getProjectInfo("dimension2", req.url).then((databaseRow) => {
		if(databaseRow){
			if(databaseRow.links){
				databaseRow.links = databaseRow.links.split(' ')
			}
			getProjectImgS3(databaseRow.route).then((imageUrlList) => {
				imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
				res.render('2d/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	});
});

app.get('/3d/blindSpot', function(req, res){
	getAllDirectoryFilesS3('/3d/vertical-scroll-1/').then((urlList) =>{
		urlList = urlList.filter(Boolean).sort(urlByIndex);
		var Panels = urlList.filter(findPanels);
		var SVGs = urlList.filter(findSVGs);
		var Wallpaper = urlList.filter(findWallpaper);
		var Existings = urlList.filter(findExistings);
		var Iterations = urlList.filter(findIterations);
		res.render('3d/blindSpot.jade', {Panels, SVGs, Wallpaper, Existings, Iterations})
	});
});

app.get('/3d/blindSpot2', function(req, res){
	getAllDirectoryFilesS3('/3d/vertical-scroll-2/').then((urlList) =>{
		urlList = urlList.filter(Boolean).sort(urlByIndex);
		var Panels = urlList.filter(findPanels);
		var Bitmaps = urlList.filter(findBitmaps);
		var Diagrams = urlList.filter(findDiagrams);
		var Overlays = urlList.filter(findOverlays);
		var SVGs = urlList.filter(findSVGs);
		var Wallpaper = urlList.filter(findWallpaper);
		res.render('3d/blindSpot2.jade', {Panels, Bitmaps, Diagrams, Overlays, SVGs, Wallpaper})
	})
});
app.get('/3d/:project', function(req, res){
	getProjectInfo("dimension3", req.url).then((databaseRow) => {
		if(databaseRow){
			if(databaseRow.links){
				databaseRow.links = databaseRow.links.split(' ')
			}
			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
				res.render('3d/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	});
});


app.get('/fabrication/:project', function(req, res){
	getProjectInfo("Fabrications", req.url).then((databaseRow) => {
		if(databaseRow){
			databaseRow.links = databaseRow.links.split(' ')
			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
				res.render('fabrications/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	});
});

app.get('/model/:project', function( req, res){
	var template = 'models/iframe-'+req.params.project+'.jade'
	res.render(template)
});

app.get('/who', function(req, res){
	res.render('who/about.jade')
})
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
// 			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
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

app.listen(80);
app.listen(443);
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

function getProjectImgS3(projectPath){
	var bucketInfo = {
			 endpoint: 's3-eu-central-1.amazonaws.com',
			 signatureVersion: 'v4',
			 region: 'eu-central-1',
			 params: {Bucket: 'akmy-web',  Delimiter: '/'}
	}
	bucketInfo.params.Prefix = projectPath.substring(1)+'/'
	var deferred =Q.defer();
	var bucket = new AWS.S3(bucketInfo);
	bucket.listObjects(function(err, data){
		if(err){
			deferred.resolve(err)
		}else{
			var dataList = data.Contents
			var urlFromDataList = dataList.map((item, index) => {
				if(item.Size == 0) return;
				var params = { Key : item.Key }
				return bucket.getSignedUrl('getObject', params)
			})
			deferred.resolve(urlFromDataList)
		}
	});
	return deferred.promise;
}


function getAllDirectoryFilesS3(projectPath){
	var bucketInfo = {
			 endpoint: 's3-eu-central-1.amazonaws.com',
			 signatureVersion: 'v4',
			 region: 'eu-central-1',
			 params: {Bucket: 'akmy-web'},
	}
	bucketInfo.params.Prefix = projectPath.substring(1)
	var deferred =Q.defer();
	var bucket = new AWS.S3(bucketInfo);
	bucket.listObjects(function(err, data){
		if(err){
			deferred.resolve(err)
		}else{
			var dataList = data.Contents
			var urlList = dataList.map((item, index) => {
				if(item.Size == 0) return;
				var params = { Key : item.Key }
				return bucket.getSignedUrl('getObject', params)
			})
			deferred.resolve(urlList)
		}
	});
	return deferred.promise;
}


function urlByIndex(a, b){
	var aa = parseInt(a.substring(a.lastIndexOf("/") + 1, a.indexOf("_")));
	var bb = parseInt(b.substring(b.lastIndexOf("/") + 1, b.indexOf("_")));
	return aa < bb ? -1 : (aa > bb ? 1 : 0);
}

function findPanels(item){
	if(item.indexOf('/Panels/') > -1) return true;
}
function findBitmaps(item){
	if(item.indexOf('/Bitmaps/') > -1) return true;
}
function findDiagrams(item){
	if(item.indexOf('/Diagrams/') > -1) return true;
}
function findExistings(item){
	if(item.indexOf('/existing-photos/') > -1) return true;
}
function findIterations(item){
	if(item.indexOf('/iteration-scans/') > -1) return true;
}
function findOverlays(item){
	if(item.indexOf('/Overlays/') > -1) return true;
}
function findSVGs(item){
	if(item.indexOf('/SVGs/') > -1) return true;
}
function findWallpaper(item){
	if(item.indexOf('/Wallpaper/') > -1  && item.indexOf('/SVGs/') == -1) return true;
}

function findMtl(item){
	if(item.indexOf('.mtl') > -1) return true;
}
function findObj(item){
	if(item.indexOf('.obj') > -1) return true;
}
