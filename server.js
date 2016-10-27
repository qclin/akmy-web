
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

app.get('/2d/:project', function(req, res){
	getProjectInfo("dimension2", req.url).then((databaseRow) => {
		if(databaseRow){
			databaseRow.links = databaseRow.links.split(' ')
			getProjectImgS3(databaseRow.route).then((imageUrlList) => {
				imageUrlList = imageUrlList.filter(Boolean)
				res.render('2d/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	})
});


app.get('/3d/:project', function(req, res){
	getProjectInfo("dimension3", req.url).then((databaseRow) => {
		if(databaseRow){
			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean)
				res.render('3d/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	})
});


app.get('/fabrication/:project', function(req, res){
	getProjectInfo("Fabrications", req.url).then((databaseRow) => {
		if(databaseRow){
			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean)
				res.render('fabrcations/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	})
});

app.get('/model/:project', function(req, res){
	getProjectInfo("Models", req.url).then((databaseRow) => {
		if(databaseRow){
			getProjectImgS3(databaseRow.route).then((imageUrlList) =>{
				imageUrlList = imageUrlList.filter(Boolean)
				res.render('models/index.jade', {imageUrlList, info: databaseRow})
			})
		}
	})
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
