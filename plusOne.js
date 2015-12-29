//unpause the stdin stream

process.stdin.resume();
process.stdin.on('data', function(data) {
    var number;
    try {
        //parse the input data into a number
        number = parseInt(data.toString(), 10);
        number += 1;
        process.stdout.write(number + '\n');
    }
    catch (e) {
        process.stderr.write(e.message + "\n");
    }
})