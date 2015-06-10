(function() {
  var EventEmitter2, debug, nanoKONTROL2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('korg-nano-kontrol:nanoKONTROL2');

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  module.exports = nanoKONTROL2 = (function(superClass) {
    extend(nanoKONTROL2, superClass);

    function nanoKONTROL2(input, name) {
      this.input = input;
      this.name = name;
      this.input.on('message', (function(_this) {
        return function(deltaTime, message) {
          var code, i, index, ref, ref1, ref2, ref3;
          debug(message);
          for (index = i = 0; i <= 7; index = ++i) {
            if (message[1] === index) {
              _this._emit(['slider', index], message[2]);
              return;
            }
          }
          ref = Array.prototype.splice.call([16, 17, 18, 19, 20, 21, 22, 23], 0);
          for (index in ref) {
            code = ref[index];
            if (message[1] === code) {
              _this._emit(['knob', index], message[2]);
              return;
            }
          }
          ref1 = Array.prototype.splice.call([32, 33, 34, 35, 36, 37, 38, 39], 0);
          for (index in ref1) {
            code = ref1[index];
            if (message[1] === code) {
              _this._emit(['button', 's', index], message[2] > 0);
              return;
            }
          }
          ref2 = Array.prototype.splice.call([48, 49, 50, 51, 52, 53, 54, 55], 0);
          for (index in ref2) {
            code = ref2[index];
            if (message[1] === code) {
              _this._emit(['button', 'm', index], message[2] > 0);
              return;
            }
          }
          ref3 = Array.prototype.splice.call([64, 65, 66, 67, 68, 69, 70, 71], 0);
          for (index in ref3) {
            code = ref3[index];
            if (message[1] === code) {
              _this._emit(['button', 'r', index], message[2] > 0);
              return;
            }
          }
        };
      })(this));
    }

    nanoKONTROL2.prototype._emit = function(tree, value) {
      var category;
      this.emit(tree.join(':'), value);
      category = tree.shift();
      return this.emit(category, tree.join(':'), value);
    };

    return nanoKONTROL2;

  })(EventEmitter2);

}).call(this);
