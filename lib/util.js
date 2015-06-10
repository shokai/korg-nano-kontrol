(function() {
  module.exports = {
    toArray: function(obj) {
      return Array.prototype.splice.call(obj, 0);
    }
  };

}).call(this);
