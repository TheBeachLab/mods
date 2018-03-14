//
// WebSocket_Matlab for Pharos
// Prashant Patil.
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
// closure
//
(function(){
//
// module globals
//
var mod = {}
//
// name
//
var name = 'WebSocket Matlab'
//
// initialization
//
var init = function() {
   mod.address.value = '127.0.0.1'
   mod.port.value = 1234
   mod.socket = null
   socket_open()
   }
//
// inputs
//
var inputs = {
   transmit:{type:'string',
      event:function(evt){
         serial_send_string(evt.detail)
         }
      },
   file:{type:'object',
      event:function(evt){
         if (evt.detail.type == 'command') {
            mod.command = evt.detail
            socket_send(JSON.stringify(mod.command))
            }
         else if (evt.detail.type == 'file') {
            mod.job = evt.detail
            mod.job.type = 'file'
            mod.label.nodeValue = 'send file'
            mod.labelspan.style.fontWeight = 'bold'
            }
         }}}
//
// outputs
//
var outputs = {
   receive:{type:'character',
      event:function(str){
         mods.output(mod,'receive',str)}}}
//

//
// interface
//
var interface = function(div){
   mod.div = div
 
   //
   // open/close
   //
   var btn = document.createElement('button')
      btn.style.margin = 1
      btn.appendChild(document.createTextNode('open'))
      btn.addEventListener('click',function() {
         socket_open()
         })
      div.appendChild(btn)
   var btn = document.createElement('button')
      btn.style.margin = 1
      btn.appendChild(document.createTextNode('close'))
      btn.addEventListener('click',function() {
         socket_close()
         })
      div.appendChild(btn)
   div.appendChild(document.createElement('br'))
   //
   // address
   //
   div.appendChild(document.createTextNode('address: '))
   input = document.createElement('input')
      input.type = 'text'
      input.size = 10
      div.appendChild(input)
      mod.address = input
   div.appendChild(document.createElement('br'))
   //
   // port
   //
   div.appendChild(document.createTextNode('\u00a0\u00a0\u00a0\u00a0\u00a0port: '))
   var input = document.createElement('input')
      input.type = 'text'
      input.size = 10
      div.appendChild(input)
      mod.port = input
   div.appendChild(document.createElement('br'))
   //
   // status
   //
   div.appendChild(document.createTextNode('\u00a0\u00a0status: '))
   var input = document.createElement('input')
      input.type = 'text'
      input.size = 10
      div.appendChild(input)
      mod.status = input
   div.appendChild(document.createElement('br'))

   // Home stage button.
   var btn = document.createElement('button')
      btn.style.padding = mods.ui.padding
      btn.style.margin = 1
      var span = document.createElement('span')
         var text = document.createTextNode('Move to origin')
            span.appendChild(text)
         btn.appendChild(span)
      btn.addEventListener('click',function(){
  
         
         // Call function "MCS_HomeStage" to home stage.
         var str = "MCS_HomeStage"
         var obj = {}
         obj.type = 'command'
         obj.name = mod.name+'.m'
         obj.contents = str
         socket_send(JSON.stringify(obj))
         })
      div.appendChild(btn)
   div.appendChild(document.createElement('br'))


  
   //
   // file button
   //
   var btn = document.createElement('button')
      btn.style.padding = mods.ui.padding
      btn.style.margin = 1
      var span = document.createElement('span')
         var text = document.createTextNode('waiting for file')
            mod.label = text
            span.appendChild(text)
         mod.labelspan = span
         btn.appendChild(span)
      btn.addEventListener('click',function(){
         if (mod.socket == null) {
            mod.status.value = "can't send, not open"
            }
         else if (mod.label.nodeValue == 'send file') {
            socket_send(JSON.stringify(mod.job))
            mod.label.nodeValue = 'cancel'
            }
         else if (mod.label.nodeValue == 'cancel') {
            mod.command = {}
            mod.command.type = 'cancel'
            socket_send(JSON.stringify(mod.command))
            }
         })
      div.appendChild(btn)
   }
//
// local functions
//
function socket_open() {
   var url = "ws://"+mod.address.value+':'+mod.port.value
   mod.socket = new WebSocket(url)
   mod.socket.onopen = function(event) {
      mod.status.value = "socket opened"
      }
   mod.socket.onerror = function(event) {
      mod.status.value = "can not open"
      mod.socket = null
      }
   mod.socket.onmessage = function(event) {
      mod.status.value = event.data
      outputs.receive.event(event.data)
      if ((event.data == 'done') || (event.data == 'cancel') || (event.data.slice(0,5) == 'error')) {
         mod.label.nodeValue = 'waiting for file'
         mod.labelspan.style.fontWeight = 'normal'
         }
      }
   }
function socket_close() {
   mod.socket.close()
   mod.status.value = "socket closed"
   mod.socket = null
   }


function socket_send(msg) {
   if (mod.socket != null) {
      mod.status.value = "send"
      mod.socket.send(msg)
      }
   else {
      mod.status.value = "can't send, not open"
      }
   }
 
 
 
//
// return values
//
return ({
   name:name,
   init:init,
   inputs:inputs,
   outputs:outputs,
   interface:interface
   })
}())
