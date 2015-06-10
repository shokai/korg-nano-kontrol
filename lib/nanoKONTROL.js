(function() {
  var Device, Util, debug, nanoKONTROL,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('korg-nano-kontrol:nanoKONTROL');

  Device = require('./device');

  Util = require('./util');

  module.exports = nanoKONTROL = (function(superClass) {
    extend(nanoKONTROL, superClass);

    function nanoKONTROL(input, name) {
      var code, index, ref, ref1, ref2, ref3;
      this.input = input;
      this.name = name;
      nanoKONTROL.__super__.constructor.call(this, this.input, this.name);
      ref = [2, 3, 4, 5, 6, 8, 9, 12, 13];
      for (index in ref) {
        code = ref[index];
        this.slider(code, index);
      }
      ref1 = Util.toArray([14, 15, 16, 17, 18, 19, 20, 21, 22]);
      for (index in ref1) {
        code = ref1[index];
        this.knob(code, index);
      }
      ref2 = Util.toArray([23, 24, 25, 26, 27, 28, 29, 30, 31]);
      for (index in ref2) {
        code = ref2[index];
        this.button(code, "a:" + index);
      }
      ref3 = Util.toArray([33, 34, 35, 36, 37, 38, 39, 40, 41]);
      for (index in ref3) {
        code = ref3[index];
        this.button(code, "b:" + index);
      }
      this.button(44, 'record');
      this.button(45, 'play');
      this.button(46, 'stop');
      this.button(47, 'prev');
      this.button(48, 'next');
      this.button(49, 'loop');
    }

    return nanoKONTROL;

  })(Device);

}).call(this);
