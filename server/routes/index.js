var express = require('express');
var router = express.Router();


var http = require('http');
var app = require('express');
// var server = http.createServer(app);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("hello world");
// });


router.get('/', function (req, res) {
    res.sendFile(__dirname + '../public/');
});


io.on('connection', function (socket) {
    console.log('a user connected from indexjs');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

// http.listen(3111, function(){
//   console.log('listening on *:3111');
// });


module.exports = router;




