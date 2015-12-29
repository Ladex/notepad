require('net').createServer(function(socket) {
    socket.on('data', function(data) {
        console.log('some data recieved ' + data);
    });

    socket.on('end', function(data) {

    });

    socket.write('some string');
}).listen(4001);