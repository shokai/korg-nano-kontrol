var nanoKONTROL = require("../../");
// var nanoKONTROL = require('korg-nano-kontrol');

nanoKONTROL.connect()
.then(function(device){
  let lightOff = function() {
    device.light("play", 0);
    device.close();

    process.exit();
  }

  device.light("play", 1);

  setTimeout(lightOff, 2000);
});