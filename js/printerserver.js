//
// printerserver.js
//    WebSocket printer server
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2017
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the mods
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//
// check command line
//
if (process.argv.length < 4) {
   console.log("command line: node printerserver.js client_address server_port")
   process.exit(-1)
   }
//
// start server
//
var client_address = process.argv[2]
var server_port = process.argv[3]
console.log("listening for connection from client address "+client_address+" on server port "+server_port)
var WebSocketServer = require('ws').Server
var spawn = require('child_process').spawn
wss = new WebSocketServer({port:server_port})
//
// handle connection
//
wss.on('connection',function(ws) {
   //
   // check address
   //
   if (ws._socket.remoteAddress != client_address) {
      console.log("connection rejected from "+ws._socket.remoteAddress)
      ws.send('socket closed')
      ws.close()
      }
   else {
      console.log("connection accepted from "+ws._socket.remoteAddress)
      }
   //
   // handle messages
   //
   ws.on("message",function(msg) {
      var job = JSON.parse(msg)
      if (job.type == 'file') {
         //
         // send file to printer
         //
         console.log('writing '+job.name+' (length '+job.contents.length+') to '+job.printer+' printer')
         lpr = spawn('lpr',['-P'+job.printer])
         lpr.stdout.pipe(process.stdout)
         lpr.stderr.pipe(process.stdout)
         lpr.stdin.write(job.contents)
         lpr.stdin.end()
         }
      })
   //
   // close
   //
   ws.on("close",function() {
      console.log("connection closed")
      })
   })
