# Todo
- processes
    - three-axis rough cut
    - three-axis finish cut
- editing
    - subgraph copy paste
    - nested module graphs
- ui
    - collapse nodes
    - refactor for skinning
- Cross-Origin Resource Sharing (CORS)
- formats
    - HPGL input
    - SVG export
    - DXF export
- ...

# To install and run mods locally

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

# Mods Connection Debugging

set correct serial port permission (do this each time you reboot the machine): <code>chmod a+rwx /dev/ttyUSB0</code>

start serialserver in the terminal so you can see the logs as it tries to connect.  navigate to the mods/js folder in the terminal (probably use <code>cd ~/mods/js</code>) and type: <code>node serialserver.js ::ffff:127.0.0.1 1234</code>

check serialserver is running with: <code>ps aux | grep node</code>

# Common Issues

1. **_Help! My SRM-20 will only run a single job and then go dead!_** Chances are you are using printserver.js instead of deviceserver.js to connect to the machine.  For now, we need to treat the SRM-20 as a device instead of a printer.
2. **_Argg... why do I need to reset permissions on /dev/usb/lp0 every restart?_**  You can use `sudo add_user username lp` and `sudo add_user username lpadmin` to make persistent permissions.
3. **_Why is my web socket connection refused when the addresses are the same?_** This can happen due to a difference between IPV4 and IPV6 addresses.  In your start mods server script, try changing 127.0.0.1 to ::ffff:127.0.0.1 and see if it helps.



