var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:Alfa01227014@ds133331.mlab.com:33331/db-soft-dentist-plus')

var specialist = db.collection('specialist')

if (specialist == null) {
	db.createCollection("specialist", function(err, collection){
		if (err) {
			console.log(err);
		} else {
			console.log('Collection created [specialist]');
			specialist = db.collection('specialist')
		}
	});	
} 

// Get All
router.get('/specialist', function(req, res, next){
	specialist.find().limit(10, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

router.get('/specialist/company/:company', function(req, res, next){
	specialist.find({company: req.params.company}).limit(10, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single
router.get('/specialist/:id', function(req, res, next){
	specialist.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single
router.get('/specialist/:company/:type_identification/:dni', function(req, res, next){
	specialist.findOne({company: req.params.company, type_identification: req.params.type_identification, dni: req.params.dni},
	function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single [Filter]
router.get('/specialist/filter/:company/:filter/:value', function(req, res, next){
	var filter = req.params.filter;
	var rootJson = {}
	
	rootJson['company'] = req.params.company
	rootJson[filter] = {$regex:req.params.value}
	
	specialist.find(rootJson, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Save
router.post('/specialist', function(req, res, next){
	var dataRecord = req.body;
	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		specialist.save(dataRecord, function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);			
		});
	}
});

// Borrado Fisico
router.delete('/specialist/:id', function(req, res, next){
	specialist.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Update
router.put('/specialist/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		specialist.update({_id: mongojs.ObjectId(req.params.id)}, dataRecord, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

// Borrado Logico
router.put('/specialist/delete/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		specialist.update({_id: mongojs.ObjectId(req.params.id)}, { $set: dataRecord }, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

module.exports = router;