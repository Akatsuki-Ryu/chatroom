var express = require('express');
var router = express.Router();


var http = require('http');
var app = require('express');
// var server = http.createServer(app);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

const mongodbobj = require('mongodb').MongoClient; //database requirements
let wwwjs = require('../bin/www');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("hello world");
// });


router.get('/', function (req, res) {
    res.sendFile(__dirname + '../public/');
});


router.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({greeting: `Hello ${name}!`}));
    console.log("the name is " + name);
});

// pull messages all
router.get('/msg', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // res.send();
    res.send(wwwjs.chatcacheexp);
})


// pull messages all version 2
router.get('/msgver2', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // res.send();
    res.send(wwwjs.chatcacheexp2);
})

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




