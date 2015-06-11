var path = require('path');
var nanoKONTROL = require(path.resolve());
// var nanoKONTROL = require('korg-nano-kontrol');

nanoKONTROL.connect()
.then(function(device){
  console.log('connected! ' + device.name);

  // register specific slider/knob/button event
  device.on('slider:0', function(value){
    console.log("slider:0 >>> "+value);
  });

  device.on('knob:1', function(value){
    console.log("knob:1 >>> "+value);
  });

  device.on('button:play', function(value){
    console.log("button:play >>> "+value);
  });

  device.on('button:stop', function(value){
    console.log("button:stop >>> "+value);
    if(value === false){
      console.log('exit!!');
      device.close();
    }
  });


  // catch all slider/knob/button event
  device.on('slider:*', function(value){
    console.log(this.event+' => '+value);
  });

  device.on('knob:*', function(value){
    console.log(this.event+' => '+value);
  });

  device.on('button:**', function(value){
    console.log(this.event+' => '+value);
  });

})
.catch(function(err){
  console.error(err);
});
