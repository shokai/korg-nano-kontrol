"use strict";

import _ from "lodash";

import Debug from "debug";
import Device from "../device";
import * as Util from "../util";

module.exports = class NanoKONTROL extends Device {

  static get deviceName(){
    return "nanoKONTROL";
  }
  static detect(name){
    return /^nanoKONTROL\s/i.test(name);
  }

  constructor(input, name){
    super(input, name, {globalMidiChannel: true});
    this.debug = Debug("korg-nano-kontrol:nanoKONTROL");
    this.debug("created");

    if(Util.getEnv() === "nodejs"){
      this.input.ignoreTypes(false, false, true);
    }
    this.setScene(1);

    this.on("midi:message", msg => {
      if(msg.length === 11 &&
         msg[0] === 240 &&
         msg[10] === 247){
        this.setScene(msg[9] + 1);
        this.emit("button:scene", msg[9] + 1);
      }
    });

    this.button([176, 44], "rec");
    this.button([176, 45], "play");
    this.button([176, 46], "stop");
    this.button([176, 47], "prev");
    this.button([176, 48], "next");
    this.button([176, 49], "loop");
  }

  setScene(scene){
    this.scene = scene;
    switch(scene){
    case 1:
      Util.eachWithIndex(
        [..._.range(2, 7), 8, 9, 12, 13]
        , (index, code) => {
          this.slider([176, code], index);
        }
      );
      Util.eachWithIndex(
        _.range(14, 23)
        , (index, code) => {
          this.knob([176, code], index);
        }
      );
      Util.eachWithIndex(
        _.range(23, 32)
        , (index, code) => {
          this.button([176, code], `a:${index}`);
        }
      );
      Util.eachWithIndex(
        _.range(33, 42)
        , (index, code) => {
          this.button([176, code], `b:${index}`);
        }
      );
      break;
    case 2:
      Util.eachWithIndex(
        [42, 43, ..._.range(50, 57)]
        , (index, code) => {
          this.slider([176, code], index);
        }
      );
      Util.eachWithIndex(
        [..._.range(57, 64), 65, 66]
        , (index, code) => {
          this.knob([176, code], index);
        }
      );
      Util.eachWithIndex(
        _.range(67, 76)
        , (index, code) => {
          this.button([176, code], `a:${index}`);
        }
      );
      Util.eachWithIndex(
        _.range(76, 85)
        , (index, code) => {
          this.button([176, code], `b:${index}`);
        }
      );
      break;
    case 3:
      Util.eachWithIndex(
        _.range(85, 94)
        , (index, code) => {
          this.slider([176, code], index);
        }
      );
      Util.eachWithIndex(
        [..._.range(94, 98), ..._.range(102, 107)]
        , (index, code) => {
          this.knob([176, code], index);
        }
      );
      Util.eachWithIndex(
        _.range(107, 116)
        , (index, code) => {
          this.button([176, code], `a:${index}`);
        }
      );
      Util.eachWithIndex(
        _.range(116, 125)
        , (index, code) => {
          this.button([176, code], `b:${index}`);
        }
      );
      break;
    case 4:
      Util.eachWithIndex(
        _.range(176, 185)
        , (index, code) => {
          this.slider([code, 7], index);
        }
      );
      Util.eachWithIndex(
        _.range(176, 185)
        , (index, code) => {
          this.knob([code, 10], index);
        }
      );
      Util.eachWithIndex(
        _.range(176, 185)
        , (index, code) => {
          this.button([code, 16], `a:${index}`);
        }
      );
      Util.eachWithIndex(
        _.range(176, 185)
        , (index, code) => {
          this.button([code, 17], `b:${index}`);
        }
      );
      break;
    }
  }
};
