"use strict";

import {Promise} from "es6-promise";
const debug = require("debug")("korg-nano-kontrol");

import * as Util from "./util";

import nanoKONTROL from "./devices/nanoKONTROL";
import nanoKONTROL2 from "./devices/nanoKONTROL2";

const Devices = [
  nanoKONTROL,
  nanoKONTROL2
];

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
    const devices = Devices.filter((i) => {
      return !deviceName || i.deviceName === deviceName;
    });
    navigator.requestMIDIAccess()
      .then(webMidi => {
        for(let input of webMidi.inputs.values()){
          for(let Device of devices){
            if(Device.detect(input.name)){
              return resolve(new Device(input, input.name));
            }
          }
        }
        return reject("device not found");
      });
  });
}

function connectNodeMidi(deviceName){
  const midi = require("midi");
  debug(`connectNodeMidi(${deviceName})`);
  return new Promise((resolve, reject) => {
    const input = new midi.input();
    const devices = Devices.filter(function(device){
      return !deviceName || device.deviceName === deviceName;
    });

    for(let i = 0; i < input.getPortCount(); i++){
      let name = input.getPortName(i);
      debug(`found device [${i}] "${name}"`);

      for(let j = 0; j < devices.length; j++){
        let Device = devices[j];
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
