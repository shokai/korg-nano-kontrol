debug = require('debug')('korg-nano-kontrol:nanoKONTROL2')
{EventEmitter2} = require 'eventemitter2'

module.exports = class nanoKONTROL2 extends EventEmitter2

  constructor: (@input, @name) ->

    @input.on 'message', (deltaTime, message) =>
      debug message

      for name in [0..7]
        if message[1] is name
          @emit "slider:#{name}", message[2]
          @emit 'slider', name, message[2]
          return

      for name, i of Array.prototype.splice.call([16..23], 0)
        if message[1] is i
          @emit "knob:#{name}", message[2]
          @emit 'knob', name, message[2]
          return


