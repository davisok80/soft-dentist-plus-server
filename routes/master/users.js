var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:Alfa01227014@ds133331.mlab.com:33331/db-soft-dentist-plus')

var users = db.collection('users')

if (users == null) {
	db.createCollection("users", function(err, collection){
		if (err) {
			console.log(err);
		} else {
			console.log('Collection created [users]');
			users = db.collection('users')
		}
	});	
} 

// Get Single [Filter]
router.put('/users/filter', function(req, res, next){
	var filterJson = req.body;
	
	users.findOne(filterJson, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

module.exports = router;