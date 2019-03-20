var express = require('express');
var router = express.Router();

// const io = require("socket.io")(server);
let rooms = [];
let messages = [];
let idCounter = 0;


/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("hello world");
// });


router.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



module.exports = router;


