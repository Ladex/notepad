var ws = require('fs').createWriteStream('mySocketDump.txt');

require('net').createServer(function(socket) {
    var timeout = 6000;
    socket.setTimeout(timeout);

    socket.on('timeout', function() {
        socket.write('Idle timeout, disconnecting bye');
        socket.end();
    });
    socket.pipe(ws);
}).listen(4001);