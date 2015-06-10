var path = require('path');
var nanoKONTROL = require(path.resolve());

nanoKONTROL.connect().then(function(device){
  console.log('connected!');
  console.log(device);

  device.on('slider:0', function(value){
    console.log("slider:0 >>> "+value);
  });

  device.on('knob:1',function(value){
    console.log("knob:1 >>> "+value);
  });

  device.on('slider',function(name, value){
    console.log("slider:"+name+" => "+value);
  });

  device.on('knob',function(name, value){
    console.log("knob:"+name+" => "+value);
  });
}).catch(function(err){
  console.error(err);
});
