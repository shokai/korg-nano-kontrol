debug = require('debug')('korg-nano-kontrol:nanoKONTROL2')

Device = require './device'
Util   = require './util'

module.exports = class nanoKONTROL2 extends Device

  constructor: (@input, @name) ->

    super @input, @name

    for index,code of Util.toArray [0..7]
      @slider [176,code], index

    for index, code of Util.toArray [16..23]
      @knob [176,code], index

    for index, code of Util.toArray [32..39]
      @button [176,code], "s:#{index}"

    for index, code of Util.toArray [48..55]
      @button [176,code], "m:#{index}"

    for index, code of Util.toArray [64..71]
      @button [176,code], "r:#{index}"

    @button [176,41], 'play'
    @button [176,42], 'stop'
    @button [176,43], 'prev'
    @button [176,44], 'next'
    @button [176,45], 'rec'
    @button [176,46], 'cycle'
    @button [176,60], 'marker:set'
    @button [176,61], 'marker:prev'
    @button [176,62], 'marker:next'
    @button [176,58], 'track:prev'
    @button [176,59], 'track:next'


