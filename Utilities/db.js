var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( "mongodb://master:zachariaserik@192.168.1.9:27017/monithor?authSource=admin", function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};
