(function() {
  var Promise, _, debug, devices, midi, nanoKONTROL, nanoKONTROL2;

  _ = require('lodash');

  midi = require('midi');

  if (typeof Promise !== 'function') {
    Promise = require('es6-promise').Promise;
  }

  debug = require('debug')('midi-control');

  nanoKONTROL2 = require('./nanoKONTROL2');

  nanoKONTROL = require('./nanoKONTROL');

  devices = [nanoKONTROL2, nanoKONTROL];

  module.exports = {
    connect: function() {
      return new Promise(function(resolve, reject) {
        var device, i, input, j, k, len, name, ref;
        input = new midi.input;
        for (i = j = 0, ref = input.getPortCount(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          name = input.getPortName(i);
          debug("found device [" + i + "] \"" + name + "\"");
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
