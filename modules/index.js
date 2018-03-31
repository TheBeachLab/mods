var div = document.createElement('div')
div.appendChild(document.createTextNode('\u00A0123'))
div.addEventListener('mousedown',function(evt){
   document.body.removeChild(evt.target.parentNode)
   mod_message_handler('modules/event/delay',
      evt.clientY+document.body.scrollTop,
      evt.clientX+document.body.scrollLeft)
   set_prompt(123)})
div.appendChild(document.createElement('br'))
menu.appendChild(div)

var div = document.createElement('div')
div.appendChild(document.createTextNode('456'))
div.addEventListener('mousedown',function(evt){
   document.body.removeChild(evt.target.parentNode)
   set_prompt(456)})
div.appendChild(document.createElement('br'))
menu.appendChild(div)
