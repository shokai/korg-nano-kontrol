"use strict";

import {EventEmitter2} from "eventemitter2";
import * as Util from "./util";

module.exports = class Device extends EventEmitter2 {

  constructor(input, name, opts = {globalMidiChannel: false}){
    super({
      wildcard: true,
      delimiter: ":"
    });
    this.input = input;
    this.name = name;
    this.opts = opts;

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
      var e = this.codes[opts.globalMidiChannel ? `${msg[0]},${msg[1]}` : msg[1]];
      if(!e){ return; }
      if(e.type === "digital"){
        this.emit(e.name, msg[2] > 0);
      }
      else{
        this.emit(e.name, msg[2]);
      }
    });
  }

  close(){
    this.debug("closePort");
    this.input.closePort();
  }

  register(code, opts){
    Object.keys(this.default).forEach(key => {
      if(!opts.hasOwnProperty(key)){
        opts[key] = this.default[key];
      }
    });
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
