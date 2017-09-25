# Install and run mods

You need to first install [node.js](https://docs.npmjs.com/getting-started/installing-node).

Install the [http-server](https://www.npmjs.com/package/http-server) npm package. Including '-g' sets the installs the package gloabally, allowing you to use it as a command line tool:

<code>npm install http-server -g</code>

Clone the mods repository:

<code>git clone ssh://git@gitlab.cba.mit.edu:846/pub/mods.git</code>

Use the command line to navigate to the root of the mods repository:

<code>cd mods</code>

Start up a server:

<code>http-server</code>

Open a browser tab and go to <code>127.0.0.1:8080</code> which is the same as <code>http://localhost:8080</code> to view the server that you just started.

Depending on how to need to use mods you can start local servers located in <code>mods/js</code>, for example, if you start from the root of the mods repository:

<code>cd js</code>

<code>node printserver.js</code>

serial port permission: <code>chmod a+rwx /dev/ttyUSB0</code>

start serialserver: <code>node serialserver.js ::ffff:127.0.0.1 1234</code>




