debug = require('debug')('korg-nano-kontrol:nanoKONTROL')

Device = require './device'
Util   = require './util'

module.exports = class nanoKONTROL extends Device

  constructor: (@input, @name) ->

    super @input, @name
    @input.ignoreTypes false, false, true
    @setScene 1

    @input.on 'message', (deltaTime, msg) =>
      if msg.length is 11 and
         msg[0] is 240 and
         msg[10] is 247
        @setScene msg[9]+1
        @emit 'button:scene', msg[9]+1

    @button [176,44], 'rec'
    @button [176,45], 'play'
    @button [176,46], 'stop'
    @button [176,47], 'prev'
    @button [176,48], 'next'
    @button [176,49], 'loop'

  setScene: (@scene) ->
    debug "scene:#{@scene}"
    switch @scene
      when 1
        for index, code of [2..6].concat [8,9,12,13]
          @slider [176,code], index

        for index, code of Util.toArray [14..22]
          @knob [176,code], index

        for index, code of Util.toArray [23..31]
          @button [176,code], "a:#{index}"

        for index, code of Util.toArray [33..41]
          @button [176,code], "b:#{index}"
      when 2
        for index, code of [42,43].concat [50,51,52,53,54,55,56]
          @slider [176,code], index

        for index, code of [57..63].concat [65,66]
          @knob [176,code], index

        for index, code of Util.toArray [67..75]
          @button [176,code], "a:#{index}"

        for index, code of Util.toArray [76..84]
          @button [176,code], "b:#{index}"
      when 3
        for index, code of Util.toArray [85..93]
          @slider [176,code], index

        for index, code of [94..97].concat [102..106]
          @knob [176,code], index

        for index, code of Util.toArray [107..115]
          @button [176,code], "a:#{index}"

        for index, code of Util.toArray [116..124]
          @button [176,code], "b:#{index}"
      when 4
        for index, code of Util.toArray [176..184]
          @slider [code,7], index

        for index, code of Util.toArray [176..184]
          @knob [code,10], index

        for index, code of Util.toArray [176..184]
          @button [code,16], "a:#{index}"

        for index, code of Util.toArray [176..184]
          @button [code,17], "b:#{index}"
