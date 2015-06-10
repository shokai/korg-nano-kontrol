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
      this.input = input;
      this.name = name;
      nanoKONTROL.__super__.constructor.call(this, this.input, this.name);
      this.input.ignoreTypes(false, false, true);
      this.setScene(1);
      this.input.on('message', (function(_this) {
        return function(deltaTime, msg) {
          if (msg.length === 11 && msg[0] === 240 && msg[10] === 247) {
            _this.setScene(msg[9] + 1);
            return _this.emit('button:scene', msg[9] + 1);
          }
        };
      })(this));
      this.button([176, 44], 'rec');
      this.button([176, 45], 'play');
      this.button([176, 46], 'stop');
      this.button([176, 47], 'prev');
      this.button([176, 48], 'next');
      this.button([176, 49], 'loop');
    }

    nanoKONTROL.prototype.setScene = function(scene) {
      var code, index, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, results1, results2, results3;
      this.scene = scene;
      debug("scene:" + this.scene);
      switch (this.scene) {
        case 1:
          ref = [2, 3, 4, 5, 6].concat([8, 9, 12, 13]);
          for (index in ref) {
            code = ref[index];
            this.slider([176, code], index);
          }
          ref1 = Util.toArray([14, 15, 16, 17, 18, 19, 20, 21, 22]);
          for (index in ref1) {
            code = ref1[index];
            this.knob([176, code], index);
          }
          ref2 = Util.toArray([23, 24, 25, 26, 27, 28, 29, 30, 31]);
          for (index in ref2) {
            code = ref2[index];
            this.button([176, code], "a:" + index);
          }
          ref3 = Util.toArray([33, 34, 35, 36, 37, 38, 39, 40, 41]);
          results = [];
          for (index in ref3) {
            code = ref3[index];
            results.push(this.button([176, code], "b:" + index));
          }
          return results;
          break;
        case 2:
          ref4 = [42, 43].concat([50, 51, 52, 53, 54, 55, 56]);
          for (index in ref4) {
            code = ref4[index];
            this.slider([176, code], index);
          }
          ref5 = [57, 58, 59, 60, 61, 62, 63].concat([65, 66]);
          for (index in ref5) {
            code = ref5[index];
            this.knob([176, code], index);
          }
          ref6 = Util.toArray([67, 68, 69, 70, 71, 72, 73, 74, 75]);
          for (index in ref6) {
            code = ref6[index];
            this.button([176, code], "a:" + index);
          }
          ref7 = Util.toArray([76, 77, 78, 79, 80, 81, 82, 83, 84]);
          results1 = [];
          for (index in ref7) {
            code = ref7[index];
            results1.push(this.button([176, code], "b:" + index));
          }
          return results1;
          break;
        case 3:
          ref8 = Util.toArray([85, 86, 87, 88, 89, 90, 91, 92, 93]);
          for (index in ref8) {
            code = ref8[index];
            this.slider([176, code], index);
          }
          ref9 = [94, 95, 96, 97].concat([102, 103, 104, 105, 106]);
          for (index in ref9) {
            code = ref9[index];
            this.knob([176, code], index);
          }
          ref10 = Util.toArray([107, 108, 109, 110, 111, 112, 113, 114, 115]);
          for (index in ref10) {
            code = ref10[index];
            this.button([176, code], "a:" + index);
          }
          ref11 = Util.toArray([116, 117, 118, 119, 120, 121, 122, 123, 124]);
          results2 = [];
          for (index in ref11) {
            code = ref11[index];
            results2.push(this.button([176, code], "b:" + index));
          }
          return results2;
          break;
        case 4:
          ref12 = Util.toArray([176, 177, 178, 179, 180, 181, 182, 183, 184]);
          for (index in ref12) {
            code = ref12[index];
            this.slider([code, 7], index);
          }
          ref13 = Util.toArray([176, 177, 178, 179, 180, 181, 182, 183, 184]);
          for (index in ref13) {
            code = ref13[index];
            this.knob([code, 10], index);
          }
          ref14 = Util.toArray([176, 177, 178, 179, 180, 181, 182, 183, 184]);
          for (index in ref14) {
            code = ref14[index];
            this.button([code, 16], "a:" + index);
          }
          ref15 = Util.toArray([176, 177, 178, 179, 180, 181, 182, 183, 184]);
          results3 = [];
          for (index in ref15) {
            code = ref15[index];
            results3.push(this.button([code, 17], "b:" + index));
          }
          return results3;
      }
    };

    return nanoKONTROL;

  })(Device);

}).call(this);
