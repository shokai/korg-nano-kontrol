"use strict";

import {Promise} from "es6-promise";
var debug = require("debug")("korg-nano-kontrol");

var Util = require("./util");

var Devices = [
  require("./devices/nanoKONTROL2"),
  require("./devices/nanoKONTROL")
];

if(Util.getEnv() === "nodejs"){
  var midi = require("midi");
}

export function connect(deviceName){
  switch(Util.getEnv()){
  case "browser":
    return connectWebMidi(deviceName);
  case "nodejs":
    return connectNodeMidi(deviceName);
  }
}

function connectWebMidi(deviceName){
  debug(`connectWebMidi(${deviceName})`);
  return new Promise((resolve, reject) => {
    if(navigator && typeof navigator.requestMIDIAccess !== "function"){
      return reject(new Error("Web MIDI API is not supported"));
    }
    var devices = Devices.filter((i) => {
      return !deviceName || i.deviceName === deviceName;
    });
    navigator.requestMIDIAccess()
      .then(webMidi => {
        var it = webMidi.inputs.values();
        while(true){
          var input = it.next();
          if(input.done) break;
          var name = input.value.name;
          for(var i = 0; i < devices.length; i++){
            var Device = devices[i];
            if(Device.detect(name)){
              return resolve(new Device(input.value, name));
            }
          }
        }
        return reject("device not found");
      });
  });
}

function connectNodeMidi(deviceName){
  debug(`connectNodeMidi(${deviceName})`);
  return new Promise((resolve, reject) => {
    var input = new midi.input();
    var devices = Devices.filter(function(device){
      return !deviceName || device.deviceName === deviceName;
    });

    for(var i = 0; i < input.getPortCount(); i++){
      var name = input.getPortName(i);
      debug(`found device [${i}] "${name}"`);

      for(var j = 0; j < devices.length; j++){
        var Device = devices[j];
        debug(Device.deviceName);
        if(Device.detect(name)){
          debug(`detect "${Device.name}"`);
          debug(`openPort ${i}`);
          input.openPort(i);
          return resolve(new Device(input, name));
        }
      }
      return reject("device not found");
    }
  });
}
