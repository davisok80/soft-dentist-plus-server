var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:Alfa01227014@ds133331.mlab.com:33331/db-soft-dentist-plus')

var patients = db.collection('patients')

if (patients == null) {
	db.createCollection("patients", function(err, collection){
		if (err) {
			console.log(err);
		} else {
			console.log('Collection created [patients]');
			patients = db.collection('patients')
		}
	});	
} 

// Get All
router.get('/patients', function(req, res, next){
	patients.find().limit(10, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

router.get('/patients/company/:company', function(req, res, next){
	patients.find({company: req.params.company}).limit(10, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single
router.get('/patients/:id', function(req, res, next){
	patients.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single
router.get('/patients/:company/:type_identification/:dni', function(req, res, next){
	patients.findOne({company: req.params.company, type_identification: req.params.type_identification, dni: req.params.dni},
	function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single [Filter]
router.get('/patients/filter/:company/:filter/:value', function(req, res, next){
	var filter = req.params.filter;
	var rootJson = {}
	
	rootJson['company'] = req.params.company
	rootJson[filter] = {$regex:req.params.value}
	
	patients.find(rootJson, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Save
router.post('/patients', function(req, res, next){
	var dataRecord = req.body;
	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		patients.save(dataRecord, function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);			
		});
	}
});

// Borrado Fisico
router.delete('/patients/:id', function(req, res, next){
	patients.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Update
router.put('/patients/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		patients.update({_id: mongojs.ObjectId(req.params.id)}, dataRecord, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

// Borrado Logico
router.put('/patients/delete/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		patients.update({_id: mongojs.ObjectId(req.params.id)}, { $set: dataRecord }, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

module.exports = router;