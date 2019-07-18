# CBA `mods` fork (by TBL)

Everything is better at the beach :sunglasses:

![](mods.png)

My fork is focused in UI. See also [Sibu's](https://github.com/sibusaman/mods) fork, focused in machine functionality. We keep cherry-picking each other.

## To run `mods` online

Just go to https://thebeachlab.github.io/mods

## To install and run `mods` locally in Linux

### Installing `mods`

You need to first install [node.js](https://docs.npmjs.com/getting-started/installing-node).

Install the [http-server](https://www.npmjs.com/package/http-server) npm package. Including '-g' sets the installs the package globally, allowing you to use it as a command line tool:

`npm install http-server -g`

Clone the mods repository:

`git clone https://github.com/TheBeachLab/mods.git`

To talk to the machines you will also need to install `ws` and `serialport` npm packages inside `mods/js` folder:

```bash
cd mods/js
npm install ws
npm install serialport
```

### Running `mods` locally in your computer

Use the command line to navigate to the root of the mods repository:

`cd mods` 

and start a server

`http-server` or `hs`

Open a browser tab and go to `127.0.0.1:8080` which is the same as `http://localhost:8080` to view the server that you just started.

## To install and run `mods` locally in Windows

Kindly contact support@microsoft.com

## Talking to the machines

### Setting permissions

To talk to the machines you need permissions. Machines usually identify themselves as printers (`/dev/usb/lp0`) or serial devices (`/dev/ttyUSB0`). Those files (in Linux everything is a file) belong to the `root` user. But they also grant permissions if you belong to specific groups. In Ubuntu Linux, add yourself to the groups `lp`, and `dialout`. This will give you access to printers, and serial devices.

```bash
sudo adduser $USER lp
sudo adduser $USER dialout
```

In Arch Linux et al., add yourself to `lp` and `uucp` groups.

```bash
sudo adduser $USER lp
sudo adduser $USER uucp
```

Logout or reboot for the changes to take effect. The permissions are now persistent.

### Starting the local servers

Depending on which machine you need to use inside `mods`, you can start local servers inside `mods/js`.

#### Serial Server

Roland Modela MDX-20 is identified as a serial device. When you plug it, a file is created `/dev/ttyUSBx` where `x` is a number `/dev/ttyUSB0`. So for using the Roland MDX-20 you need to start `serialserver.js` inside the `mods/js` directory.

```bash
cd mods/js
node serialserver.js ::ffff:127.0.0.1 1234
```

Check that `serialserver.js` is running with: `ps aux | grep node`


> Do **not** start the server using the localhost address:  
`node serialserver.js ::ffff:localhost 1234` :point_left: do not

### Device Server

Roland GX-24 and Roland GS-24 vinyl cutters, and the Roland SRM-20 Monofab are identified as a printer. When you plug them a file is created `/dev/usb/lpx` where `x` is a number `/dev/usb/lp0`, `/dev/usb/lp1`. Therefore, you need to start `deviceserver.js ` inside the `mods/js` directory.

```bash
cd mods/js
node deviceserver.js ::ffff:127.0.0.1 1234
```

> Do **not** start the server using the localhost address:  
`node deviceserver.js ::ffff:localhost 1234` :point_left: do not


## FAQ

1. **Why do we use ::ffff: before 127.0.0.1?** Due to a difference between IPV4 and IPV6 addresses, web socket might give connection refused error if you use 127.0.0.1 instead of ::ffff:127.0.0.1
