//
// video
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2015,6
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
var name = 'video'
//
// initialization
//
var init = function() {
   mod.width.value = 640 
   mod.height.value = 480
   start_video()
   }
//
// inputs
//
var inputs = {
   capture:{type:'event',
      event:function(evt){
         capture_video()}}}
//
// outputs
//
var outputs = {
   image:{type:'RGBA',
      event:function(){
         var ctx = mod.img.getContext("2d")
         var img = ctx.getImageData(0,0,mod.img.width,mod.img.height)
         mods.output(mod,'image',img)}}}
//
// interface
//
var interface = function(div){
   mod.div = div
   //
   // on-screen drawing canvas
   //
   var canvas = document.createElement('canvas')
      canvas.width = mods.ui.canvas
      canvas.height = mods.ui.canvas
      canvas.style.backgroundColor = 'rgb(255,255,255)'
      div.appendChild(canvas)
      mod.canvas = canvas
   div.appendChild(document.createElement('br'))
   //
   // off-screen image canvas
   //
   var canvas = document.createElement('canvas')
      mod.img = canvas
   //
   // capture button
   //
   var btn = document.createElement('button')
      btn.style.padding = mods.ui.padding
      btn.style.margin = 1
      btn.appendChild(document.createTextNode('capture'))
      btn.addEventListener('click',function() {
         capture_video()
         })
      div.appendChild(btn)
   div.appendChild(document.createTextNode(' '))
   //
   // view button
   //
   var btn = document.createElement('button')
      btn.style.padding = mods.ui.padding
      btn.style.margin = 1
      btn.appendChild(document.createTextNode('view'))
      btn.addEventListener('click',function(){
         var win = window.open('')
         var btn = document.createElement('button')
            btn.appendChild(document.createTextNode('close'))
            btn.style.padding = mods.ui.padding
            btn.style.margin = 1
            btn.addEventListener('click',function(){
               win.close()
               })
            win.document.body.appendChild(btn)
         win.document.body.appendChild(document.createElement('br'))
         var canvas = document.createElement('canvas')
            canvas.width = mod.img.width
            canvas.height = mod.img.height
            win.document.body.appendChild(canvas)
         var ctx = canvas.getContext("2d")
            ctx.drawImage(mod.img,0,0)
         })
      div.appendChild(btn)
   div.appendChild(document.createElement('br'))
   //
   // width
   //
   div.appendChild(document.createTextNode('width: '))
   var input = document.createElement('input')
      input.type = 'text'
      input.size = 6
      input.addEventListener('change',function() {
         update_video()
         })
      div.appendChild(input)
      mod.width = input
   div.appendChild(document.createElement('br'))
   //
   // height
   //
   div.appendChild(document.createTextNode(' height: '))
   var input = document.createElement('input')
      input.type = 'text'
      input.size = 6
      input.addEventListener('change',function() {
         update_video()
         })
      div.appendChild(input)
      mod.height = input
   div.appendChild(document.createElement('br'))
   //
   // video element
   //
   var video = document.createElement('video')
      //div.appendChild(video)
      mod.video = video
   }
//
// local functions
//
function start_video() {
   var w = parseInt(mod.width.value)
   var h = parseInt(mod.height.value)
   var ctx = mod.img.getContext("2d")
   ctx.canvas.width = w
   ctx.canvas.height = h
   navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia)
   navigator.getMedia(
      {video:true,audio:false},
      function(stream) {
         var vendorURL = window.URL || window.webkitURL
         mod.video.src = vendorURL.createObjectURL(stream)
         mod.video.play()
         },
      function(err) {console.log("video startup error")}
      )
    mod.video.addEventListener('canplay',
       function(evt) {
          mod.video.setAttribute('width',w)
          mod.video.setAttribute('height',h)
          capture_video()
          })
   }
function update_video() {
   var w = parseInt(mod.width.value)
   var h = parseInt(mod.height.value)
   mod.video.setAttribute('width',w)
   mod.video.setAttribute('height',h)
   var ctx = mod.img.getContext("2d")
   ctx.canvas.width = w
   ctx.canvas.height = h
   }
function capture_video() {
   var w = parseInt(mod.width.value)
   var h = parseInt(mod.height.value)
   var ctx = mod.img.getContext("2d")
   ctx.drawImage(mod.video,0,0,w,h)
   if (w > h) {
      var x0 = 0
      var y0 = mod.canvas.height*.5*(1-h/w)
      var wd = mod.canvas.width
      var hd = mod.canvas.width*h/w
      }
   else {
      var x0 = mod.canvas.width*.5*(1-w/h)
      var y0 = 0
      var wd = mod.canvas.height*w/h
      var hd = mod.canvas.height
      }
   var ctx = mod.canvas.getContext("2d")
   ctx.clearRect(0,0,mod.canvas.width,mod.canvas.height)
   ctx.drawImage(mod.img,x0,y0,wd,hd)
   outputs.image.event()
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
