
var jwt = require('jsonwebtoken');
var io = require('socket.io')(8080);
var config = require('../config');
var mongodb  = require('../Utilities/db');

module.exports = function(gwgw) {

    var serverNsp = io.of("/servers");
    var browserNsp = io.of("/browsers");

    io.of("/servers").use(function(socket, next){
        jwt.verify(socket.handshake.query.token, config.jwt, function(err, decoded) {
            if(err) {

                //next(new Error('You are not allowed on this server!'));
                socket.disconnect();

            }


            socket.handshake.query.decodedToken = decoded;
            return next();
        });
    });


    io.of("/browsers").on('connection', function(socket) {

        socket.on('join', function(room){

            mongodb.getDb().collection("servers").findOne({"server_id": room}, function(err, server) {
                if(server) {
                    socket.join(room);
                    console.log("Browser joined");


                }

            });


        });
    })


    io.of("/servers").on('connection', function(socket){
        socket.on('join', function(msg){

            mongodb.getDb().collection("servers").findOne({"server_id": socket.handshake.query.decodedToken.server_id}, function(err, server) {
                if(server) {
                    socket.join(socket.handshake.query.decodedToken.server_id);
                    socket.on('status-from-server', function(msg){
                        if(io.of("/servers").adapter.rooms[socket.handshake.query.decodedToken.server_id].length > 0) {
                            //There is client in the room, start broadcasting
                            console.log(msg);
                            io.of("/browsers").to(socket.handshake.query.decodedToken.server_id).emit('data-from-server', msg);
                        }



                    });


                }

            });





        });




    });

};
