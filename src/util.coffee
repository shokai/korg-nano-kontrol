module.exports =
  toArray: (obj) ->
    Array.prototype.splice.call obj, 0
