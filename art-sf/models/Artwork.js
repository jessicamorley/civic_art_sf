var mongoose = require('mongoose');

var ArtworkSchema = new mongoose.Schema({
  _id: String,
  value: Number
}, 
{
  collection: 'artist_count'
});

mongoose.model('Artwork', ArtworkSchema);var mongoose = require('mongoose');

//var ArtworkSchema = new mongoose.Schema({
 // _id: String,
//  value: Number
//}, 
//{
//  collection: 'artist_count'
//});

mongoose.model('Artwork', ArtworkSchema);