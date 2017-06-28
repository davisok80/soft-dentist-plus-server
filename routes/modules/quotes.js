var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:Alfa01227014@ds133331.mlab.com:33331/db-soft-dentist-plus')

var quotes = db.collection('quotes')

if (quotes == null) {
	db.createCollection("quotes", function(err, collection){
		if (err) {
			console.log(err);
		} else {
			console.log('Collection created [quotes]');
			quotes = db.collection('quotes')
		}
	});	
} 

// Get All
router.get('/quotes', function(req, res, next){
	quotes.find().limit(10, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

router.get('/quotes/company/:company', function(req, res, next){
	quotes.find({company: req.params.company}).limit(10, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single
router.get('/quotes/:id', function(req, res, next){
	quotes.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single
router.get('/quotes/:company/:type_identification/:dni', function(req, res, next){
	quotes.findOne({company: req.params.company, type_identification: req.params.type_identification, dni: req.params.dni},
	function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Get Single [Filter]
router.put('/quotes/filter', function(req, res, next){
	var filterJson = req.body;
	
	quotes.find(filterJson, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Save
router.post('/quotes', function(req, res, next){
	var dataRecord = req.body;
	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		quotes.save(dataRecord, function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);			
		});
	}
});

// Borrado Fisico
router.delete('/quotes/:id', function(req, res, next){
	quotes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

// Update
router.put('/quotes/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		quotes.update({_id: mongojs.ObjectId(req.params.id)}, dataRecord, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

// Borrado Logico
router.put('/quotes/delete/:id', function(req, res, next){
	var dataRecord = req.body;

	if (!dataRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		quotes.update({_id: mongojs.ObjectId(req.params.id)}, { $set: dataRecord }, {},function(err, dataRecord){
			if (err){
				res.send(err);
			}
			res.json(dataRecord);
		});
	}
});

module.exports = router;