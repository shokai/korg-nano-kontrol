# korg-nano-kontrol

- https://github.com/shokai/korg-nano-kontrol
- https://npmjs.com/package/korg-nano-kontrol

[![Circle CI](https://circleci.com/gh/shokai/korg-nano-kontrol.svg?style=svg)](https://circleci.com/gh/shokai/korg-nano-kontrol)


## Install

    % npm i korg-nano-kontrol -save


## Usage

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

### Register Events

```javascript
// register specific slider/knob/button event
device.on('slider:0', function(value){
  console.log("slider:0 >>> "+value);
});

device.on('knob:1',function(value){
  console.log("knob:1 >>> "+value);
});

device.on('button:m:2',function(value){
  console.log("button:m:2 >>> "+value);
});


// catch all slider/knob/button event
device.on('slider:*',function(value){
  console.log(this.event+' => '+value);
});

device.on('knob:*',function(value){
  console.log(this.event+' => '+value);
});

device.on('button:**', function(value){
  console.log(this.event+' => '+value);
});
```


### Scene
nanoKONTROL has a `scene` button

```javascript
console.log(device.scene); // => return 1~4

device.on('button:scene', function(scene){
  console.log(scene);
});
```

## Test

    % npm install

    % npm test
    # or
    % npm run watch
