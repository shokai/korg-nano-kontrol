"use strict";

import _ from "lodash";

import Debug from "debug";
import Device from "../device";
import {eachWithIndex} from "../util";

export default class NanoKONTROL2 extends Device {

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

    eachWithIndex(_.range(0, 8), (index, code) => {
      this.slider(code, index);
    });

    eachWithIndex(_.range(16, 24), (index, code) => {
      this.knob(code, index);
    });

    eachWithIndex(_.range(32, 40), (index, code) => {
      this.button(code, `s:${index}`);
    });

    eachWithIndex(_.range(48, 56), (index, code) => {
      this.button(code, `m:${index}`);
    });

    eachWithIndex(_.range(64, 72), (index, code) => {
      this.button(code, `r:${index}`);
    });

    this.button(41, "play");
    this.button(42, "stop");
    this.button(43, "prev");
    this.button(44, "next");
    this.button(45, "rec");
    this.button(46, "cycle");
    this.button(60, "marker:set");
    this.button(61, "marker:prev");
    this.button(62, "marker:next");
    this.button(58, "track:prev");
    this.button(59, "track:next");
  }

}
