(function() {
  var Device, Util, debug, nanoKONTROL2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('korg-nano-kontrol:nanoKONTROL2');

  Device = require('./device');

  Util = require('./util');

  module.exports = nanoKONTROL2 = (function(superClass) {
    extend(nanoKONTROL2, superClass);

    function nanoKONTROL2(input, name) {
      var code, i, index, ref, ref1, ref2, ref3;
      this.input = input;
      this.name = name;
      nanoKONTROL2.__super__.constructor.call(this, this.input, this.name);
      for (code = i = 0; i <= 7; code = ++i) {
        this.slider(code, code);
      }
      ref = Util.toArray([16, 17, 18, 19, 20, 21, 22, 23]);
      for (index in ref) {
        code = ref[index];
        this.knob(code, index);
      }
      ref1 = Util.toArray([32, 33, 34, 35, 36, 37, 38, 39]);
      for (index in ref1) {
        code = ref1[index];
        this.button(code, "s:" + index);
      }
      ref2 = Util.toArray([48, 49, 50, 51, 52, 53, 54, 55]);
      for (index in ref2) {
        code = ref2[index];
        this.button(code, "m:" + index);
      }
      ref3 = Util.toArray([64, 65, 66, 67, 68, 69, 70, 71]);
      for (index in ref3) {
        code = ref3[index];
        this.button(code, "r:" + index);
      }
      this.button(41, 'play');
      this.button(42, 'stop');
      this.button(43, 'prev');
      this.button(44, 'next');
      this.button(45, 'record');
      this.button(46, 'cycle');
      this.button(60, 'marker:set');
      this.button(61, 'marker:prev');
      this.button(62, 'marker:next');
      this.button(58, 'track:prev');
      this.button(59, 'track:next');
    }

    return nanoKONTROL2;

  })(Device);

}).call(this);
