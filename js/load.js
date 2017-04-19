//
// load.js
//    node js/load.js subdir
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

var fs = require('fs')

var subdir = process.argv[2]
var root = './'+subdir

str = '<html>\n\
   <head><meta charset="utf-8"></head>\n\
   <body>\n\
   <body link="black" alink="black" vlink="black">\n\
   <b>file to open?</b><br><br>\n\
   <script>\n\
   function handler(uri) {\n\
      window.opener.callback(uri)\n\
      window.close()\n\
      }\n\
   </script>\n\
   '
list_files(root)
console.log(str)

function list_files(path) {
  var relpath = path.slice(root.length+1)
  var files = fs.readdirSync(path)
   for (var i = 0; i < files.length; ++i) {
      var file = files[i]
      var stats = fs.statSync(path+'/'+file)
      if (stats.isFile() == true) {
         if (relpath == '')
            continue
         else
            url = subdir+'/'+relpath+'/'+file
         var match = url.match(/\//g)
         if (match == null)
            var prefix = ''
         else {
            var prefix = Array(match.length).join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
            }
         str += prefix
         str += '<a href="javascript:handler('
         str += "'"
         str += encodeURI(url)
         str += "'"
         str += ')">'+file+'</a><br>\n'
         }
      else if (stats.isDirectory() == true) {
         if (relpath == '')
            url = subdir+'/'+file
         else
            url = subdir+'/'+relpath+'/'+file
         var match = url.match(/\//g)
         if (match == null)
            var prefix = ''
         else {
            var prefix = Array(match.length).join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
            }
         str += '<i>'+prefix+file+'</i><br>\n'
         list_files(path+'/'+file)
         }
      else
         console.log('unknown file type')
      }
   }
