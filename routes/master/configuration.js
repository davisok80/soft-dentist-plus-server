var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:Alfa01227014@ds133331.mlab.com:33331/db-soft-dentist-plus')

var required_fields = db.collection('required_fields')

// Get All
router.get('/required_fields', function(req, res, next){
	required_fields.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var genders = db.collection('genders')

// Get All
router.get('/genders', function(req, res, next){
	genders.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var civil_status = db.collection('civil_status')

// Get All
router.get('/civil_status', function(req, res, next){
	civil_status.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var types_identification = db.collection('types_identification')

// Get All
router.get('/types_identification', function(req, res, next){
	types_identification.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var format_fields = db.collection('format_fields')

// Get All
router.get('/format_fields', function(req, res, next){
	format_fields.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var specialtys = db.collection('specialtys')

// Get All
router.get('/specialtys', function(req, res, next){
	specialtys.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var clinic = db.collection('clinic')

// Get All
router.get('/clinic', function(req, res, next){
	clinic.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

var odontogram_param = db.collection('odontogram_param')

// Get All
router.get('/odontogram_param', function(req, res, next){
	odontogram_param.find(function(err, dataRecord){
		if (err){
			res.send(err);
		}
		res.json(dataRecord);
	});
});

module.exports = router;