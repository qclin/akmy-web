var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var pug = require('pug');
var Q = require('q');
/// set credentials to request for signedURL
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.loadFromPath('.aws-config.json');

var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + "/assets"));

app.set('view engine', 'pug');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/projects/:projectType', function(req,res){
  var category = req.params.projectType;
  getWorkPDFS(category).then((payload) => {
    if(payload){
      var prjFiles = payload.filter(Boolean).sort();
      res.render('works/index.pug', {prjFiles})
    }
  })
})

app.listen(80);
app.listen(443);
console.log('Listening on port 80');



function getWorkPDFS(category){
	var bucketInfo = {
			 endpoint: 's3-eu-central-1.amazonaws.com',
			 signatureVersion: 'v4',
			 region: 'eu-central-1',
			 params: {Bucket: 'akmy-web',  Delimiter: '/'}
	}
	bucketInfo.params.Prefix = 'works/'+category+'/'
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
