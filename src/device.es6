"use strict";

import {EventEmitter2} from "eventemitter2";
import * as Util from "./util";

module.exports = class Device extends EventEmitter2 {

  constructor(input, name){
    super({
      wildcard: true,
      delimiter: ":"
    });
    this.input = input;
    this.name = name;

    this.codes = {};
    this.default = {
      type: "analog"
    };

    switch(Util.getEnv()){
    case "browser":
      this.input.onmidimessage = (msg) => {
        this.emit("midi:message", msg.data);
      };
      break;
    case "nodejs":
      this.input.on("message", (deltaTime, msg) => {
        this.emit("midi:message", msg);
      });
      break;
    }

    this.on("midi:message", (msg) => {
      this.debug(msg);
      var opts = this.codes[`${msg[0]},${msg[1]}`];
      if(!opts){ return; }
      if(opts.type === "digital"){
        this.emit(opts.name, msg[2] > 0);
      }
      else{
        this.emit(opts.name, msg[2]);
      }
    });
  }

  close(){
    this.debug("closePort");
    this.input.closePort();
  }

  register(code, opts){
    for(var k of Object.keys(this.default)){
      if(!opts.hasOwnProperty(k)){
        opts[k] = this.default[k];
      }
    }
    if(code instanceof Array){
      code = code.join(",");
    }
    this.codes[code] = opts;
  }

  button(code, name){
    var opts = {
      name: `button:${name}`,
      type: "digital"
    };
    this.register(code, opts);
  }

  knob(code, name){
    var opts = {name: `knob:${name}`};
    this.register(code, opts);
  }

  slider(code, name){
    var opts = {name: `slider:${name}`};
    this.register(code, opts);
  }
};
