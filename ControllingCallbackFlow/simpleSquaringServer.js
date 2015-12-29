var port = process.env.PORT;

require('http').createServer(function(req, res) {
    var body = '';

    req.setEncoding('utf8');

    req.on('data', function(data) {
        body += data;
    });

    req.once('end', function() {
        var number = JSON.parse(body);
        var squared = Math.pow(number, 2);
        res.end(JSON.stringify(squared));
    });

}).listen(port, function() {
    console.log('Squaring Server listening on port %d', port);
})