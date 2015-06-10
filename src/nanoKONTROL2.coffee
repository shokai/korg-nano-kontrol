debug = require('debug')('korg-nano-kontrol:nanoKONTROL2')

Device = require './device'

module.exports = class nanoKONTROL2 extends Device

  constructor: (@input, @name) ->

    super @input, @name

    for code in [0..7]
      @slider code, code

    for index, code of Array.prototype.splice.call([16..23], 0)
      @knob code, index

    for index, code of Array.prototype.splice.call([32..39], 0)
      @button code, "s:#{index}"

    for index, code of Array.prototype.splice.call([48..55], 0)
      @button code, "m:#{index}"

    for index, code of Array.prototype.splice.call([64..71], 0)
      @button code, "r:#{index}"

    @button 41, 'play'
    @button 42, 'stop'
    @button 43, 'prev'
    @button 44, 'next'
    @button 45, 'rec'
    @button 46, 'cycle'
    @button 60, 'marker:set'
    @button 61, 'marker:prev'
    @button 62, 'marker:next'
    @button 58, 'track:prev'
    @button 59, 'track:next'


