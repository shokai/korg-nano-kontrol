var path = require('path');
var nanoKONTROL = require(path.resolve());
// var nanoKONTROL = require('korg-nano-kontrol');

nanoKONTROL.connect('__nanoKONTROL2') // specify device name
.then(function(device){
  console.log('connected! ' + device.name);

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
