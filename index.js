var app          = require('express')();
var express      = require('express');
var http         = require('http').Server(app);
var path         = require('path');
var session      = require('cookie-session')({secret: 'secret', maxAge: 30 * 24 * 60 * 60 * 1000});
var mongodb      = require('./Utilities/db');
var routes       = require('./app/routing')(app, mongodb);
var socketHandler = require('./app/socketHandler')("gwgw");


mongodb.connectToServer( function( err ) {
    

    if(err) {
        console.log("Error connectiong to database");
        process.exit()
    }

    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/scripts', express.static(__dirname + '/node_modules/vue/dist/'));
    app.use('/css', express.static(__dirname + '/node_modules/bulma/css/'));

    app.use(session);

    http.listen(3000, function() {
        console.log("Running on port "+ 3000 +"...");
    });



} );
