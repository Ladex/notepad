var ws = require('fs').createWriteStream('mySocketDump.txt');

require('net').createServer(function(socket) {
    socket.pipe(ws);
}).listen(4001);