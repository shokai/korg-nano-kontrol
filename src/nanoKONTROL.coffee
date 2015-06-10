debug = require('debug')('korg-nano-kontrol:nanoKONTROL')

Device = require './device'
Util   = require './util'

module.exports = class nanoKONTROL extends Device

  constructor: (@input, @name) ->

    super @input, @name

    for index, code of [2,3,4,5,6,8,9,12,13]
      @slider code, index

    for index, code of Util.toArray [14..22]
      @knob code, index

    for index, code of Util.toArray [23..31]
      @button code, "a:#{index}"

    for index, code of Util.toArray [33..41]
      @button code, "b:#{index}"

    @button 44, 'rec'
    @button 45, 'play'
    @button 46, 'stop'
    @button 47, 'prev'
    @button 48, 'next'
    @button 49, 'loop'

