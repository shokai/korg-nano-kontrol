debug = require('debug')('korg-nano-kontrol:nanoKONTROL2')
{EventEmitter2} = require 'eventemitter2'

module.exports = class nanoKONTROL2 extends EventEmitter2

  constructor: (@input, @name) ->

    super
      wildcard: true
      delimiter: ':'

    @input.on 'message', (deltaTime, message) =>
      debug message

      ## slider
      for index in [0..7]
        if message[1] is index
          @emit "slider:#{index}", message[2]
          return

      ## knob
      for index, code of Array.prototype.splice.call([16..23], 0)
        if message[1] is code
          @emit "knob:#{index}", message[2]
          return

      ## button on right side
      for index, code of Array.prototype.splice.call([32..39], 0)
        if message[1] is code
          @emit "button:s:#{index}", message[2] > 0
          return

      for index, code of Array.prototype.splice.call([48..55], 0)
        if message[1] is code
          @emit "button:m:#{index}", message[2] > 0
          return

      for index, code of Array.prototype.splice.call([64..71], 0)
        if message[1] is code
          @emit "button:r:#{index}", message[2] > 0
          return

      ## buttons on left side
      buttons =
        41: 'play'
        42: 'stop'
        43: 'prev'
        44: 'next'
        45: 'rec'
        46: 'cycle'
        60: 'marker:set'
        61: 'marker:prev'
        62: 'marker:next'
        58: 'track:prev'
        59: 'track:next'

      for code, name of buttons
        if message[1] is code-0
          @emit "button:#{name}", message[2] > 0
          return
