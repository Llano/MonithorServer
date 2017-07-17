var jwt = require('jsonwebtoken');
var config = require('../config');
module.exports = function(app, db) {

    app.get("/servers" ,function(req, res) {

        db.getDb().collection("servers").find().toArray(function(err, item) {

            res.render('pages/overview', {servers: item});
        });


    });
    app.get("/token", function(req, res) {

        jwt.sign({ server_id: 'test' }, config.jwt, function(err, token) {
            res.json({"token": token});
        });

    });

    app.get("/server/:server_id", function(req, res) {

        db.getDb().collection("servers").findOne({"server_id": req.params.server_id}, function(err, item) {
            if(item) {
                res.render('pages/server', {server: item});

            }
        });
    });
    
};
