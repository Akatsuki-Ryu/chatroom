var express = require('express');
var router = express.Router();


var http = require('http');
var app = require('express');
// var server = http.createServer(app);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

const mongodbobj = require('mongodb').MongoClient; //database requirements
let wwwjs = require('../bin/www');
let chatcache = [];
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

// pull messages
router.get('/messages', (req, res) => {

    console.log("this is the chatcache in indexjs");
    console.log(chatcache2);
    //connect to database and grab the messages . ====================================
    mongodbobj.connect('mongodb://mongodbapp:27017/chatdb', function (err, dbdata) {
        if (err) {
            throw err;
        }
        console.log("database connected success==data pulling ===============================");
        let chatdbcollection = dbdata.collection('chats');
        chatdbcollection.find().limit(10).sort({_id: -1}).toArray(function (err, res) {
            if (err) {
                throw err;
            }

            // Emit the messages
            // socket.emit('output', res);
            // console.log("from the database ");
            // console.log(res);

            // chatcache = res;

            //put message into order
            for (i = res.length - 1; i > 0; i--) {
                chatcache.push(res[i]);

            }

        });
        console.log("data format finished index ");
        // console.log(chatcache);
    })
    // =================================================onnect to database and grab the messages .

    res.setHeader('Content-Type', 'application/json');
    res.send(chatcache);
    // res.send(chatcache2);
    chatcache = [];


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




