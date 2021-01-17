"use strict";

import {Promise} from "es6-promise";
const debug = require("debug")("korg-nano-kontrol");

import {getEnv} from "./util";

import nanoKONTROL from "./devices/nanoKONTROL";
import nanoKONTROL2 from "./devices/nanoKONTROL2";

const Devices = [
  nanoKONTROL,
  nanoKONTROL2
];

module.exports.connect = function(deviceName){
  switch(getEnv()){
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
              debug(`detect ${Device.name}`);
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
    const output = new midi.output();
    const devices = Devices.filter(function(device){
      return !deviceName || device.deviceName === deviceName;
    });

    let recognizedInput = null;
    let recognizedOutput = null;
    let recognizedName = null;
    let recognizedDevice = null;

    for(let i = 0; i < input.getPortCount(); i++){
      let name = input.getPortName(i);
      debug(`found device [${i}] "${name}"`);

      for(let Device of devices){
        if(Device.detect(name)){
          debug(`detected valid name "${Device.name}"`);
          recognizedName = name;
          recognizedInput = i;
          recognizedDevice = Device;
        }
      }
    }

    if(!recognizedDevice) {
      return reject("device not found");
    }

    for(let i = 0; i < output.getPortCount(); i++) {
      if(recognizedDevice.detect(output.getPortName(i))) {
        debug(`detected valid output name "${recognizedDevice.name}`);
        recognizedOutput = i;
      }
    }

    if(!recognizedDevice) {
      return reject("device not found");
    }

    debug(`open input ${recognizedInput}`);
    input.openPort(recognizedInput);
    debug(`open output ${recognizedOutput}`);
    output.openPort(recognizedOutput);

    return resolve(new recognizedDevice(input, output, recognizedName));
  });
}
