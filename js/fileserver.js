//
// fileserver.js
//    WebSocket file server
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2016
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
   console.log("command line: node fileserver.js client_address server_port")
   process.exit(-1)
   }
//
// start server
//
var client_address = process.argv[2]
var server_port = process.argv[3]
console.log("listening for connection from client address "+client_address+" on server port "+server_port)
var fs = require("fs")
var WebSocketServer = require('ws').Server
wss = new WebSocketServer({port:server_port})
wss.on('connection',function(ws) {
   if (ws._socket.remoteAddress != client_address) {
      console.log("connection rejected from "+ws._socket.remoteAddress)
      wss.close()
      process.exit(-1)
      }
   else {
      console.log("connection accepted from "+ws._socket.remoteAddress)
      }
   ws.on("message",function(msg) {
      console.log("   "+msg)
      if (msg == 'ls') {
         var files = fs.readdirSync(".")
         ws.send(JSON.stringify(files))
         }
      else if (msg == 'pwd') {
         var dir = process.cwd()
         ws.send(dir)
         }
      else if (msg.indexOf('cd ') == 0) {
         process.chdir(msg.slice(3))
         }
      else if (msg.indexOf('get ') == 0) {
         try {
            data = fs.readFileSync(msg.slice(4))
            ws.send(data.toString())
            }
         catch(err) {
            ws.send(JSON.stringify(err))
            }
         }
      })
   ws.on("close",function() {
      console.log("connection closed")
      })
   })
