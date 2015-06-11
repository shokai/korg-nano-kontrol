(function() {
  var Devices, NanoKONTROL, NanoKONTROL2, Promise, _, debug, midi;

  if (typeof window === "undefined" || window === null) {
    midi = require('midi');
  }

  Promise = require('es6-promise').Promise;

  _ = require('lodash');

  debug = require('debug')('midi-control');

  NanoKONTROL2 = require('./nanoKONTROL2');

  NanoKONTROL = require('./nanoKONTROL');

  Devices = [NanoKONTROL2, NanoKONTROL];

  module.exports = {
    connect: function(deviceName) {
      if (deviceName == null) {
        deviceName = null;
      }
      if (typeof window !== "undefined" && window !== null) {
        return this.connectWebMidi(deviceName);
      } else {
        return this.connectNodeMidi(deviceName);
      }
    },
    connectWebMidi: function(deviceName) {
      return new Promise(function(resolve, reject) {
        if (typeof (typeof navigator !== "undefined" && navigator !== null ? navigator.requestMIDIAccess : void 0) !== 'function') {
          return reject(new Error('Web MIDI API is not supported'));
        }
        return navigator.requestMIDIAccess().then(function(webMidi) {
          var device, input, it, j, len, name;
          it = webMidi.inputs.values();
          while (true) {
            input = it.next();
            if (input.done) {
              break;
            }
            name = input.value.name;
            for (j = 0, len = Devices.length; j < len; j++) {
              device = Devices[j];
              if (device.detect(name)) {
                return resolve(new device(input.value, name));
              }
            }
          }
          return reject("device not found");
        });
      });
    },
    connectNodeMidi: function(deviceName) {
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
        return reject("device not found");
      });
    }
  };

}).call(this);
