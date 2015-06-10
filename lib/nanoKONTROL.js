(function() {
  module.exports = {
    detect: /nano kontrol/i,
    input: [
      {
        control: 176,
        type: 'analog'
      }
    ]
  };

}).call(this);
