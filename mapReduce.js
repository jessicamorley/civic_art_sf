db.art.mapReduce(
  function() { emit(this.artist, 1); },
  function(keys, values) { 
    var sum = 0;
    for(var i in values) sum += values[i];
    return sum;
  },
  {
    out: "artist_count"
  }
)