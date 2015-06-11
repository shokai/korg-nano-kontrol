{EventEmitter2} = require 'eventemitter2'
Debug = require 'debug'

Util = require './util'

module.exports = class Device extends EventEmitter2

  constructor: (@input, @name) ->
    super
      wildcard: true
      delimiter: ':'

    @debug = Debug("korg-nano-kontrol:device:#{@name}")

    @codes = {}
    @default =
      type: 'analog'

    if window? # for browser
      @input.onmidimessage = (msg) =>
        msg = msg.data
        if opts = @codes["#{msg[0]},#{msg[1]}"]
          if opts.type is 'digital'
            @emit opts.name, msg[2] > 0
          else
            @emit opts.name, msg[2]
    else
      @input.on 'message', (deltaTime, msg) =>
        @debug msg
        if opts = @codes[msg[0..1].join(',')]
          if opts.type is 'digital'
            @emit opts.name, msg[2] > 0
          else
            @emit opts.name, msg[2]

  close: ->
    @debug 'closePort'
    @input.closePort()

  register: (code, opts) ->
    for k, v of @default
      unless opts[k]?
        opts[k] = v
    if code instanceof Array
      code = code.join(',')
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
