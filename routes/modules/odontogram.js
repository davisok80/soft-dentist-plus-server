var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:Alfa01227014@ds133331.mlab.com:33331/db-soft-dentist-plus')

var odontogram = db.collection('odontogram')

if (odontogram == null) {
	db.createCollection("odontogram", function(err, collection){
		if (err) {
			console.log(err);
		} else {
			console.log('Collection created [odontogram]');
			odontogram = db.collection('odontogram')
		}
	});	
} 

// Get Single
router.get('/odontogram/:company/:id_patient', function(req, res, next){
	odontogram.findOne({company: req.params.company, id_patient: req.params.id_patient},
	function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single [Filter]
router.put('/odontogram/filter', function(req, res, next){
	var filterJson = req.body;
	
	odontogram.find(filterJson, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Save
router.post('/odontogram', function(req, res, next){
	var dataRecord = req.body;
	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		odontogram.save(dataRecord, function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);			
		});
	}
});

// Borrado Fisico
router.delete('/odontogram/:id', function(req, res, next){
	odontogram.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Update
router.put('/odontogram/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		odontogram.update({_id: mongojs.ObjectId(req.params.id)}, dataRecord, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

// Borrado Logico
router.put('/odontogram/delete/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		odontogram.update({_id: mongojs.ObjectId(req.params.id)}, { $set: dataRecord }, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

module.exports = router;