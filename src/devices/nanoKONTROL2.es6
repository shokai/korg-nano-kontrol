"use strict";

import _ from "lodash";

import Debug from "debug";
import Device from "../device";
import * as Util from "../util";

module.exports = class NanoKONTROL2 extends Device {

  static get deviceName(){
    return "nanoKONTROL2";
  }
  static detect(name){
    return /^nanoKONTROL2\s/i.test(name);
  }

  constructor(input, name){
    super(input, name);
    this.debug = Debug("korg-nano-kontrol:nanoKONTROL2");
    this.debug("created");

    Util.eachWithIndex(_.range(0, 8), (index, code) => {
      this.slider([176, code], index);
    });

    Util.eachWithIndex(_.range(16, 24), (index, code) => {
      this.knob([176, code], index);
    });

    Util.eachWithIndex(_.range(32, 40), (index, code) => {
      this.button([176, code], `s:${index}`);
    });

    Util.eachWithIndex(_.range(48, 56), (index, code) => {
      this.button([176, code], `m:${index}`);
    });

    Util.eachWithIndex(_.range(64, 72), (index, code) => {
      this.button([176, code], `r:${index}`);
    });

    this.button([176, 41], "play");
    this.button([176, 42], "stop");
    this.button([176, 43], "prev");
    this.button([176, 44], "next");
    this.button([176, 45], "rec");
    this.button([176, 46], "cycle");
    this.button([176, 60], "marker:set");
    this.button([176, 61], "marker:prev");
    this.button([176, 62], "marker:next");
    this.button([176, 58], "track:prev");
    this.button([176, 59], "track:next");
  }

};
