(function() {
  var Promise, _, debug, midi, nanoKONTROL2;

  _ = require('lodash');

  midi = require('midi');

  if (typeof Promise !== 'function') {
    Promise = require('es6-promise').Promise;
  }

  debug = require('debug')('midi-control');

  nanoKONTROL2 = require('./nanoKONTROL2');

  module.exports = {
    connect: function() {
      return new Promise(function(resolve, reject) {
        var i, input, j, name, ref;
        input = new midi.input;
        for (i = j = 0, ref = input.getPortCount(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          name = input.getPortName(i);
          debug("found device [" + i + "] \"" + name + "\"");
          if (!/nanoKONTROL2/i.test(name)) {
            continue;
          }
          debug("openPort " + i);
          input.openPort(i);
          return resolve(new nanoKONTROL2(input, name));
        }
        return reject("device not found : \"" + name + "\"");
      });
    }
  };

}).call(this);
