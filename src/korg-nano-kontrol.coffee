_         = require 'lodash'
midi      = require 'midi'
{Promise} = require 'es6-promise' if typeof Promise isnt 'function'
debug     = require('debug')('midi-control')

nanoKONTROL2 = require './nanoKONTROL2'

module.exports =

  connect: ->
    return new Promise (resolve, reject) ->
      input = new midi.input
      for i in [0...input.getPortCount()]
        name = input.getPortName i
        debug "found device [#{i}] \"#{name}\""
        continue unless /nanoKONTROL2/i.test name
        debug "openPort #{i}"
        input.openPort i
        return resolve new nanoKONTROL2 input, name

      return reject "device not found : \"#{name}\""
