//
// server.js
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

var server_port = '1234'
var client_address = '127.0.0.1'

console.log("listening for connections from "+client_address+" on "+server_port)

var server = {}

var WebSocketServer = require('ws').Server
wss = new WebSocketServer({port:server_port})
wss.on('connection',function(ws) {
   if (ws._socket.remoteAddress != client_address) {
      console.log("connection rejected from "+ws._socket.remoteAddress)
      wss.close()
      return
      }
   else {
      console.log("connection accepted from "+ws._socket.remoteAddress)
      }
   ws.on('message',function(msg) {
      //console.log('message: '+msg)
      eval(msg)
      })
   })
