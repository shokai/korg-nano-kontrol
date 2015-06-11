_         = require 'lodash'
midi      = require 'midi'
{Promise} = require 'es6-promise' if typeof Promise isnt 'function'
debug     = require('debug')('midi-control')

NanoKONTROL2 = require './nanoKONTROL2'
NanoKONTROL  = require './nanoKONTROL'

Devices = [NanoKONTROL2, NanoKONTROL]

module.exports =

  connect: (deviceName = null) ->
    return new Promise (resolve, reject) ->
      input = new midi.input
      for i in [0...input.getPortCount()]
        name = input.getPortName i
        debug "found device [#{i}] \"#{name}\""

        devices = Devices.filter (i) ->
          !deviceName? or i.deviceName is deviceName

        for device in devices
          if device.detect name
            debug "detect \"#{device.name}\""
            debug "openPort #{i}"
            input.openPort i
            return resolve new device input, name

      return reject "device not found : \"#{name}\""
