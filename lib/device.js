(function() {
  var Device, EventEmitter2, debug,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('korg-nano-kontrol:nanoKONTROL2');

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  module.exports = Device = (function(superClass) {
    extend(Device, superClass);

    function Device(input) {
      this.input = input;
      debug("new device");
      this.input.on('message', function(deltaTime, message) {
        return debug(message);
      });
    }

    return Device;

  })(EventEmitter2);

}).call(this);
