var rs = require('fs').createReadStream('mySocketDump.txt');

require('net').createServer(function(socket){
   rs.pipe(socket);
}).listen(4001);