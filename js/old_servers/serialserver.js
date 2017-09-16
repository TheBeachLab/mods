//
// serialserver.js
//    WebSocket serial server
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
   console.log("command line: node serialserver.js client_address server_port")
   process.exit(-1)
   }
//
// start server
//
var client_address = process.argv[2]
var server_port = process.argv[3]
console.log("listening for connection from client address "+client_address+" on server port "+server_port)
var SerialPort = require('serialport')
var port = null
var WebSocketServer = require('ws').Server
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
   var cancel
   ws.on("message",function(message) {
      var msg = JSON.parse(message)
      //
      // open port
      //
      if (msg.type == 'open') {
         var device = msg.device
         var baud = parseInt(msg.baud)
         var flow = msg.flow
         console.log('open '+device+' at '+baud+' flow '+flow)
         if (flow == 'none')
            port = new SerialPort(device,{baudRate:baud,parser:SerialPort.parsers.byteLength(1)})
         else if (flow == 'rtscts')
            port = new SerialPort(device,{baudRate:baud,parser:SerialPort.parsers.byteLength(1),rtscts:true})
         port.on('open',function() {
            ws.send('serial port opened')
            if (flow == 'dsrdtr') {
               port.set({dsr:true,dtr:true})
               port.set({rts:false,cts:false})
               }
            })
         port.on('error',function(err) {
            ws.send(err.message)
            })
         port.on('data',function(data) {
            ws.send(data.toString('binary'))
            })
         }
      //
      // close port
      //
      else if (msg.type == 'close') {
         var device = msg.device
         console.log('close '+device)
         ws.send('serial port closed')
         port.close()
         port = null
         }
      //
      // send string
      //
      else if (msg.type == 'string') {
         console.log(msg.string)
         port.write(msg.string,function(){
            port.drain(function(err){
               if (err)
                  ws.send(err.message)
               })
            })
         }
      //
      // send command
      //
      else if (msg.type == 'command') {
         console.log(msg.contents)
         port.write(msg.contents,function(){
            port.drain(function(err){
               if (err)
                  ws.send(err.message)
               else
                  ws.send('done')
               })
            })
         }
      //
      // cancel job
      //
      if (msg.type == 'cancel') {
         cancel = true
         }
      //
      // send file
      //
      else if (msg.type == 'file') {
         var count = 0
         console.log('writing '+msg.name+' length '+msg.contents.length)
         cancel = false
         write_char()
         //
         // character writer
         //
         function write_char() {
            //
            // cancel
            //
            if (cancel) {
               console.log('cancel')
               ws.send('cancel')
               }
            //
            // continue
            //
            else {
               port.write(msg.contents[count],function(){
                  port.drain(function(err){
                     if (err)
                        ws.send('error '+err.message)
                     else {
                        ws.send((count+1)+'/'+msg.contents.length)
                        count += 1
                        if (count < msg.contents.length)
                           write_char()
                        else {
                           console.log('done')
                           ws.send('done')
                           }
                        }

                     })
                  })
               }
            }
         }
      })
   //
   // close
   //
   ws.on("close",function() {
      console.log("connection closed")
      if (port != null)
         port.close()
      port = null
      })
   })
