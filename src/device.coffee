{EventEmitter2} = require 'eventemitter2'
debug = require('debug')("korg-nano-kontrol:device")

module.exports = class Device extends EventEmitter2

  constructor: (@input, @name) ->
    super
      wildcard: true
      delimiter: ':'

    @codes = {}
    @default =
      type: 'analog'

    @input.on 'message', (deltaTime, msg) =>
      debug msg
      return if msg[0] isnt 176

      if opts = @codes[msg[1]]
        if opts.type is 'digital'
          @emit opts.name, msg[2] > 0
        else
          @emit opts.name, msg[2]

  register: (code, opts) ->
    for k, v of @default
      unless opts[k]?
        opts[k] = v
    @codes[code] = opts

  button: (code, name) ->
    opts =
      name: "button:#{name}"
      type: 'digital'
    @register code, opts

  knob: (code, name) ->
    opts =
      name: "knob:#{name}"
    @register code, opts

  slider: (code, name) ->
    opts =
      name: "slider:#{name}"
    @register code, opts
