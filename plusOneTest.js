var spawn = require('child_process').spawn;

var child = spawn('node', ['plusOne.js']);

setInterval(function() {
    var number = Math.floor(Math.random() * 1000);

    child.stdin.write(number + "\n");

    child.stdout.once('data', function(data) {
        console.log('child replied to ' + number + ' with ' + data);
    });

}, 2000);


child.stderr.on('data', function(data) {
    process.stdout.write(data);
})