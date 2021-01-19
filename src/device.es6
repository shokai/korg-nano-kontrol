"use strict";

import {EventEmitter2} from "eventemitter2";
import {getEnv} from "./util";

export default class Device extends EventEmitter2 {

  constructor(input, output, name, opts = {globalMidiChannel: false}){
    super({
      wildcard: true,
      delimiter: ":"
    });
    this.input = input;
    this.output = output;
    this.name = name;
    this.opts = opts;

    this.codes = {};
    this.buttons = {};
    this.default = {
      type: "analog"
    };

    switch(getEnv()){
    case "browser":
      this.input.onmidimessage = (msg) => {
        this.emit("midi:message", Array.prototype.slice.call(msg.data));
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
      const e = this.codes[opts.globalMidiChannel ? `${msg[0]},${msg[1]}` : msg[1]];
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
    this.output.closePort();
  }

  light(name, status) {
    if(this.buttons[name]) {
      this.output.sendMessage([176, this.buttons[name], status === 1 ? 127 : 0]);
    }
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
    const opts = {
      name: `button:${name}`,
      type: "digital"
    };
    this.register(code, opts);

    this.buttons[name] = code;
  }

  knob(code, name){
    const opts = {name: `knob:${name}`};
    this.register(code, opts);
  }

  slider(code, name){
    const opts = {name: `slider:${name}`};
    this.register(code, opts);
  }
}
