var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Artwork = mongoose.model('Artwork');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/data', function(req, res, next) {
//   Artwork.find({}, {_id: 0}, function(err, data){
//   if(err){ return next(err); }
//   res.json(data);
//   });
// });


//gonna look like this:
router.get('/data', function(req, res, next) {
  Artwork.find({}, function(err, data) {
    if(err){ return next(err); }
    
    res.json(data);
  
  }).sort( {"value": -1} ).limit( 20 );
  
});

module.exports = router;