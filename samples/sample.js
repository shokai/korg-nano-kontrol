var path = require('path');
var nanoKONTROL = require(path.resolve());

nanoKONTROL.connect().then(function(device){
  console.log('connected!');
  console.log(device);

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

}).catch(function(err){
  console.error(err);
});
