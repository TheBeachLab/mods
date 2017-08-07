# Install and run mods

You need to first install [node.js](https://docs.npmjs.com/getting-started/installing-node). Ensure that you update npm as directed in the link.

Install the [http-server](https://www.npmjs.com/package/http-server) npm package. Including '-g' sets the installs the package gloabally, allowing you to use it as a command line tool.

'''npm install http-server -g'''

Clone the mods repository.

Use the command line to navigate to the root of the mods repository.

Start up a server by typing:

'''http-server'''

Open a browser tab and go to '127.0.0.1:8080' which is the same as 'http://localhost:8080' to view the server that you just started.

Depending on how to need to use mods you can start local servers located in 'mods/js', for example, if you start from the root of the mods repository:

'''cd js'''
'''node printserver.js'''




