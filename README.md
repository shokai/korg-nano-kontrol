# korg-nano-kontrol
Node.js/Browser library for KORG nanoKONTROL and nanoKONTROL2.

- https://github.com/shokai/korg-nano-kontrol
- https://npmjs.com/package/korg-nano-kontrol

[![Circle CI](https://circleci.com/gh/shokai/korg-nano-kontrol.svg?style=svg)](https://circleci.com/gh/shokai/korg-nano-kontrol)


## Install

    % npm install korg-nano-kontrol -save

- On Node.js, This library depends on [midi npm](https://www.npmjs.com/package/midi) to handle MIDI messages. Please install ALSA libs after run npm install.
- On Browser, require [WebMIDI API](http://www.w3.org/TR/webmidi/) support.

## Samples
- [node](https://github.com/shokai/korg-nano-kontrol/tree/master/samples/node)
- [webmidi](https://github.com/shokai/korg-nano-kontrol/tree/master/samples/webmidi)


## Usage

### Connect

find `nanoKONTROL` or `nanoKONTROL2`
```javascript
var nanoKONTROL = require('korg-nano-kontrol');

nanoKONTROL.connect()
.then(function(device){
  console.log('connected!' + device.name);
  // do something
})
.catch(function(err){
  console.error(err);
});
```

specify device name
```javascript
nanoKONTROL.connect('nanoKONTROL2').then( function(device){ } );
```

### Register Events

```javascript
// register specific slider/knob/button events
device.on('slider:0', function(value){
  console.log("slider:0 >>> "+value);
});

device.on('knob:1', function(value){
  console.log("knob:1 >>> "+value);
});

device.on('button:play', function(value){
  console.log("button:play >>> "+value);
});


// catch all slider/knob/button events
device.on('slider:*', function(value){
  console.log(this.event+' => '+value);
});

device.on('knob:*', function(value){
  console.log(this.event+' => '+value);
});

device.on('button:**', function(value){
  console.log(this.event+' => '+value);
});
```

### Close
```javascript
device.close();
```

### Scene
nanoKONTROL has a `scene` button

```javascript
console.log(device.scene); // => return 1~4

device.on('button:scene', function(scene){
  console.log(scene);
});
```

## Debug

enable [debug npm](https://www.npmjs.com/package/debug)

for node.js

    % export DEBUG="korg-nano-kontrol:*"

for browser

    localStorage.debug = "korg-nano-kontrol:*";

## Build

    % npm run build
    % npm run buildSample

    % npm run watch

## Test

    % npm install

    % npm test
    # or
    % npm run watch
