var Q = require('q');
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.loadFromPath('.aws-config.json');

var bucketInfo = {
		 endpoint: 's3-eu-central-1.amazonaws.com',
		 signatureVersion: 'v4',
		 region: 'eu-central-1',
		 params: {Bucket: 'akmy-web'}
}

function getProjectImg(projectTitle){
	bucketInfo.params.Delimiter = '/'
	bucketInfo.params.Prefix = projectTitle

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


function getClustersImg(projectTitle){
	console.log("0000 first fire")

	bucketInfo.params.Delimiter = '/'
	bucketInfo.params.Prefix = projectTitle

	var deferred =Q.defer();
	var bucket = new AWS.S3(bucketInfo);


	console.log("we're safe here ")
	bucket.listObjects(function(err, data){
		if(err){
			deferred.resolve(err)
		}else{
			console.log("get project images ", projectTitle, "::::", data )
			var urlFromDataList = data.CommonPrefixes.map((item, index) => {
				if(item.length == 0) return;
				var params = { Key : item.Prefix}
				console.log("data.CommonPrefixes.Prefix ----",  item)
				return {[item.Prefix]: getProjectImg(item.Prefix)}
			})
			deferred.resolve(urlFromDataList)
		}
	});
	return deferred.promise;
}

function getDirectoryFiles(projectTitle){
	bucketInfo.params.Prefix = projectTitle
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

module.exports = {
	getProjectImg,
	getDirectoryFiles,
	getClustersImg
}
