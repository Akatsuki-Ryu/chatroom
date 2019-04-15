#!/usr/bin/env node

/**
 * Module dependencies.
 */

let app = require('../app');
let debug = require('debug')('server:server');
let http = require('http');

//chat parameters
const constants = require("../public/constants");
let rooms = [];
let messages = [];
let idCounter = 0;


// date and time information
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "." + month + "." + day + "-" + hour + ":" + min + ":" + sec;

}


/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3111');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);
const mongodbval = require('mongodb').MongoClient; //database requirements
const io = require('socket.io').listen(server);
let chatcache = [];


//database connection establishing
mongodbval.connect('mongodb://mongodbapp:27017/chatdb', function (err, dbdata) {
    if (err) {
        throw err;
    }
    console.log("database connected success=================================");
    let chatdbcollection = dbdata.collection('chats');

//socket.io
//this is a code that solves "GET /socket.io/socket.io.js 404" error

    io.on('connection', function (socket) {
        // console.log('a user connected');  //this is for the indexold
        io.emit('chat message', "a user is now online, welcome");
        socket.on('disconnect', function () {
            // console.log('user disconnected');  //this is for the indexold
            // io.emit('chat message', "user is gone offline");  //this is for the indexold
        });
    });

//show the message sent in the client
    io.on('connection', function (socket) {
        socket.on('new message', function (msg) {
            // console.log('message: ' + msg);  //this is for the indexold
            // io.emit('new message', msg); //this is for the indexold
        });
    });


// Chatroom


    var numUsers = 0;

//logic for message old
    io.on('connection', (socket) => {
        var addedUser = false;


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //todo add history messages here , request from client will execute this
        // Get chats from mongo collection
        chatdbcollection.find().limit(100).sort({_id: -1}).toArray(function (err, res) {
            if (err) {
                throw err;
            }

            // Emit the messages
            // socket.emit('output', res);
            // console.log("from the database ");
            // console.log(res);

            //put message into order
            chatcache = [];
            for (i = res.length - 1; i >= 0; i--) {
                chatcache.push(res[i]);

            }
            console.log("this is the chatcache");
            console.log(chatcache);
            //this data base will be sent to route/index.js for feeding to the client
            exports.chatcacheexp = chatcache;
        });

        ///////////////////////////////////////////////////////////////////////////////////


        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
            console.log(getDateTime() + " message: " + socket.username + " ======> " + data);


            //insert message test to database
            chatdbcollection.insert({username: socket.username, message: data}, function () {
            });


        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            console.log("there are " + numUsers + " users now");
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers
            });
            console.log("user: " + socket.username + " joined ");


        });


        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
                console.log("user: " + socket.username + " left ");
            }
        });
    });
});

/////////////

//logic for message new
function pushMessage(message) {
    console.log(getDateTime() + " Message:", message);
    // Save message and emit to clients
    message.id = "message" + idCounter++;
    message.timestamp = new Date().getTime();
    messages.push(message);
    io.emit(constants.MESSAGE_RECEIVE, message);
}

//on listening , code is in another func
function onServerListening() {
    console.log("onServerListening");
    // Create a few rooms
    rooms.push({id: "room" + idCounter++, name: "Room 1"});
    rooms.push({id: "room" + idCounter++, name: "Room 2"});
    rooms.push({id: "room" + idCounter++, name: "Room 3"});
    // Wait for sockets to connect
    io.on("connection", onSocketConnect);
}

//when socket conneted , messsageing new
function onSocketConnect(socket) {
    console.log(getDateTime() + "  onSocketConnect");
    // Emit rooms to the client
    for (var i = 0; i < rooms.length; i++) {
        io.emit(constants.ROOM_RECEIVE, rooms[i]);
    }
    // Listen for new messages being sent by client
    socket.on(constants.MESSAGE_SEND, pushMessage);
}


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);


    //logic for messageing new
    console.log("onServerListening, port:", port);
    // Create a few rooms
    rooms.push({id: "room" + idCounter++, name: "Room 1"});
    rooms.push({id: "room" + idCounter++, name: "Room 2"});
    rooms.push({id: "room" + idCounter++, name: "Room 3"});
    // Wait for sockets to connect
    io.on("connection", onSocketConnect);

}

