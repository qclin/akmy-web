var Q = require('q');
var admin = require("firebase-admin");
var serviceAccount = require("../akmy-web-firebase-adminsdk-lqe5i-0e1c71b489.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://akmy-web.firebaseio.com"
});

var db = admin.database();
var dbRef = db.ref("test");
dbRef.once("value", function(snapshot) {
  console.log(snapshot.val());
});


function getProjInfo(title){
	var deferred = Q.defer();

	db.ref(`projects/${title}`).once("value", function(snapshot) {
	  console.log(snapshot.val());
		deferred.resolve(snapshot.val());
	}, function(errorObject){
		deferred.resolve(err)
	});

	return deferred.promise;
}


module.exports = {
  getProjInfo
}
