
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

app.get('/scroll-test', function(req, res){
	res.render('scroll.jade');
});


app.get('/threejs-test', function(req, res){
	res.render('threejsLeaf.jade');
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

app.get('/model/:project', function(req, res){
	getProjectInfo("Models", req.url).then((databaseRow) => {
		if(databaseRow){
			databaseRow.links = databaseRow.links.split(' ')
			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
				res.render('models/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	});
});

app.listen(8080);
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
			console.log("s3errr", err)
			deferred.resolve(err)
		}else{
			var dataList = data.Contents
			console.log("s3 dataList-----", dataList)

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
// getProjectImgS3('/3d/meal-recipes').then((imageUrlList) => {
// 	console.log("_____ ", imageUrlList)
// 	imageUrlList = imageUrlList.filter(Boolean).sort(urlByIndex)
// 	console.log("aftersorting_____ ", imageUrlList)
// })

function urlByIndex(a, b){
	var aa = parseInt(a.substring(a.lastIndexOf("/") + 1, a.indexOf("_")));
	var bb = parseInt(b.substring(b.lastIndexOf("/") + 1, b.indexOf("_")));
	return aa < bb ? -1 : (aa > bb ? 1 : 0);
}
