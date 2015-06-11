(function() {
  var Devices, NanoKONTROL, NanoKONTROL2, Promise, _, debug, midi;

  _ = require('lodash');

  midi = require('midi');

  if (typeof Promise !== 'function') {
    Promise = require('es6-promise').Promise;
  }

  debug = require('debug')('midi-control');

  NanoKONTROL2 = require('./nanoKONTROL2');

  NanoKONTROL = require('./nanoKONTROL');

  Devices = [NanoKONTROL2, NanoKONTROL];

  module.exports = {
    connect: function(deviceName) {
      if (deviceName == null) {
        deviceName = null;
      }
      return new Promise(function(resolve, reject) {
        var device, devices, i, input, j, k, len, name, ref;
        input = new midi.input;
        for (i = j = 0, ref = input.getPortCount(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          name = input.getPortName(i);
          debug("found device [" + i + "] \"" + name + "\"");
          devices = Devices.filter(function(i) {
            return (deviceName == null) || i.deviceName === deviceName;
          });
          for (k = 0, len = devices.length; k < len; k++) {
            device = devices[k];
            if (device.detect(name)) {
              debug("detect \"" + device.name + "\"");
              debug("openPort " + i);
              input.openPort(i);
              return resolve(new device(input, name));
            }
          }
        }
        return reject("device not found : \"" + name + "\"");
      });
    }
  };

}).call(this);
