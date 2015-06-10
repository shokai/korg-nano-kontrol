(function() {
  var Device, Util, debug, nanoKONTROL2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('korg-nano-kontrol:nanoKONTROL2');

  Device = require('./device');

  Util = require('./util');

  module.exports = nanoKONTROL2 = (function(superClass) {
    extend(nanoKONTROL2, superClass);

    nanoKONTROL2.name = 'nanoKONTROL2';

    nanoKONTROL2.detect = function(name) {
      return /^nanoKONTROL2/i.test(name);
    };

    function nanoKONTROL2(input, name1) {
      var code, index, ref, ref1, ref2, ref3, ref4;
      this.input = input;
      this.name = name1;
      nanoKONTROL2.__super__.constructor.call(this, this.input, this.name);
      ref = Util.toArray([0, 1, 2, 3, 4, 5, 6, 7]);
      for (index in ref) {
        code = ref[index];
        this.slider([176, code], index);
      }
      ref1 = Util.toArray([16, 17, 18, 19, 20, 21, 22, 23]);
      for (index in ref1) {
        code = ref1[index];
        this.knob([176, code], index);
      }
      ref2 = Util.toArray([32, 33, 34, 35, 36, 37, 38, 39]);
      for (index in ref2) {
        code = ref2[index];
        this.button([176, code], "s:" + index);
      }
      ref3 = Util.toArray([48, 49, 50, 51, 52, 53, 54, 55]);
      for (index in ref3) {
        code = ref3[index];
        this.button([176, code], "m:" + index);
      }
      ref4 = Util.toArray([64, 65, 66, 67, 68, 69, 70, 71]);
      for (index in ref4) {
        code = ref4[index];
        this.button([176, code], "r:" + index);
      }
      this.button([176, 41], 'play');
      this.button([176, 42], 'stop');
      this.button([176, 43], 'prev');
      this.button([176, 44], 'next');
      this.button([176, 45], 'rec');
      this.button([176, 46], 'cycle');
      this.button([176, 60], 'marker:set');
      this.button([176, 61], 'marker:prev');
      this.button([176, 62], 'marker:next');
      this.button([176, 58], 'track:prev');
      this.button([176, 59], 'track:next');
    }

    return nanoKONTROL2;

  })(Device);

}).call(this);
