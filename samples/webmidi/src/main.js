localStorage.debug = 'korg-nano-kontrol*';

// var nanoKONTROL = require('korg-nano-kontrol');
var nanoKONTROL = require('../../../');
var $ = require('jquery');

nanoKONTROL.connect()
.then(function(device){
  print('connect! ' + device.name);

  device.on('slider:*', function(value){
    print(this.event + ' => ' + value);
  });

  device.on('knob:*', function(value){
    print(this.event + ' => ' + value);
  });

  device.on('button:**', function(value){
    print(this.event + ' => ' + value);
  });
})
.catch(function(err){
  console.error(err);
  alert(err);
});

var print = function(msg){
  $('#log').prepend($('<li>').text(msg));
};
