// var fs = require('fs');
// fs.readFile('/etc/passwd', function(err, fileContent) {
//     if (err) {
//         throw err;
//     }

//     console.log('file content', fileContent.toString());
// });


var em = new (require('events').EventEmitter)();
em.emit('event1');
// em.emit('error', new Error('My mistake'));

// process.nextTick(function(){
//     var a = 0;
//     while(true){
//         a++;
//     }
// });

process.nextTick(function(){
    console.log('do something');
});


var interval = setInterval(function(){
    console.log('ladi');
    clearInterval(this);
},1000);


var interval2 = 1000;

(function schedule(){
    setTimeout(function do_it(){
        
    })
})

