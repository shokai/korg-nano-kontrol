(function() {
  var EventEmitter2, debug, nanoKONTROL2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('korg-nano-kontrol:nanoKONTROL2');

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  module.exports = nanoKONTROL2 = (function(superClass) {
    extend(nanoKONTROL2, superClass);

    function nanoKONTROL2(input, name1) {
      this.input = input;
      this.name = name1;
      this.input.on('message', (function(_this) {
        return function(deltaTime, message) {
          var i, index, j, name, ref, results;
          debug(message);
          for (name = j = 0; j < 7; name = ++j) {
            if (message[1] === name) {
              _this.emit("slider:" + name, message[2]);
              _this.emit('slider', name, message[2]);
              return;
            }
          }
          ref = Array.prototype.splice.call([16, 17, 18, 19, 20, 21, 22, 23], 0);
          results = [];
          for (index in ref) {
            i = ref[index];
            if (message[1] === i) {
              _this.emit("knob:" + name, message[2]);
              results.push(_this.emit('knob', name, message[2]));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this));
    }

    return nanoKONTROL2;

  })(EventEmitter2);

}).call(this);
