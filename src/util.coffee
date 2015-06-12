module.exports =
  toArray: (obj) ->
    Array.prototype.splice.call obj, 0

  getEnv: ->
    if window?
      'browser'
    else
      'nodejs'
