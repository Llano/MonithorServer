var MongoClient = require('mongodb').MongoClient;
var config = require('../config');

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( "mongodb://master:zachariaserik@" + config.db_ip + ":27017/monithor?authSource=admin", function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};
