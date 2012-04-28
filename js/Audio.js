(function() {
  var Audio;
  Audio = (function() {
    function Audio() {
      var sounds;
      sounds = [];
    }
    Audio.prototype.playUrl = function(url) {
      var sound;
      this.stopAll;
      sound = soundManager.createSound({
        id: url,
        url: url
      });
      sound.play();
      return sounds.push(sound);
    };
    Audio.prototype.stopAll = function() {
      var s, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = sounds.length; _i < _len; _i++) {
        s = sounds[_i];
        _results.push(s.destroy());
      }
      return _results;
    };
    return Audio;
  })();
  define({
    "Audio": Audio
  });
}).call(this);
