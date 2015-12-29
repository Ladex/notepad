var buf = new Buffer('Hello World');
console.log(buf[3])
console.log(buf.length)

for (var i = 0; i < buf.length; i++) {
    buf[i] = i;
}

var buffer = new Buffer("this is the content of my buffer");
var smallerBuffer = buffer.slice(8,19);
console.log(smallerBuffer.toString());

console.log(buffer.toString());

//copying a buffer

var buffer1 = new Buffer("this is the content of my buffer");
var buffer2 = new Buffer(11);

var targetStart = 0;
var sourceStart = 8;
var sourceEnd = 19;

buffer1.copy(buffer2,targetStart,sourceStart, sourceEnd);
console.log(buffer2.toString());

// var express = require('express'),
//     app = express(),
//     http = require('http'),
//     socketIO = require('socket.io'),
//     fs = require('fs'),
//     path = require('path'),
//     server, io;

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// server = http.Server(app);


// io = socketIO(server);

// io.on('connection', function(socket) {
//     var chunks = [];
    
//     var readStream = fs.createReadStream(path.resolve(__dirname, './anjola.jpg'), {
//         encoding: 'binary'
//     });

//     readStream.on('readable', function() {
//         console.log('Image loading');
//     });


//     readStream.on('data', function(chunk) {
//         chunks.push(chunk);
//         socket.emit('img-chunk', chunk);
//     });


//     readStream.on('end', function() {
//         console.log('Image loaded');
//     });
// });

// server.listen(process.env.PORT);

