(function() {
  var Debug, Device, EventEmitter2, Util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  Debug = require('debug');

  Util = require('./util');

  module.exports = Device = (function(superClass) {
    extend(Device, superClass);

    function Device(input, name1) {
      this.input = input;
      this.name = name1;
      Device.__super__.constructor.call(this, {
        wildcard: true,
        delimiter: ':'
      });
      this.debug = Debug("korg-nano-kontrol:device:" + this.name);
      this.codes = {};
      this["default"] = {
        type: 'analog'
      };
      if (typeof window !== "undefined" && window !== null) {
        this.input.onmidimessage = (function(_this) {
          return function(msg) {
            var opts;
            msg = msg.data;
            if (opts = _this.codes[msg[0] + "," + msg[1]]) {
              if (opts.type === 'digital') {
                return _this.emit(opts.name, msg[2] > 0);
              } else {
                return _this.emit(opts.name, msg[2]);
              }
            }
          };
        })(this);
      } else {
        this.input.on('message', (function(_this) {
          return function(deltaTime, msg) {
            var opts;
            _this.debug(msg);
            if (opts = _this.codes[msg.slice(0, 2).join(',')]) {
              if (opts.type === 'digital') {
                return _this.emit(opts.name, msg[2] > 0);
              } else {
                return _this.emit(opts.name, msg[2]);
              }
            }
          };
        })(this));
      }
    }

    Device.prototype.close = function() {
      this.debug('closePort');
      return this.input.closePort();
    };

    Device.prototype.register = function(code, opts) {
      var k, ref, v;
      ref = this["default"];
      for (k in ref) {
        v = ref[k];
        if (opts[k] == null) {
          opts[k] = v;
        }
      }
      if (code instanceof Array) {
        code = code.join(',');
      }
      return this.codes[code] = opts;
    };

    Device.prototype.button = function(code, name) {
      var opts;
      opts = {
        name: "button:" + name,
        type: 'digital'
      };
      return this.register(code, opts);
    };

    Device.prototype.knob = function(code, name) {
      var opts;
      opts = {
        name: "knob:" + name
      };
      return this.register(code, opts);
    };

    Device.prototype.slider = function(code, name) {
      var opts;
      opts = {
        name: "slider:" + name
      };
      return this.register(code, opts);
    };

    return Device;

  })(EventEmitter2);

}).call(this);
