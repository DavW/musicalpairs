(function() {
  var Audio, Lastfm;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Audio = (function() {
    function Audio() {
      this.sounds = {};
    }
    Audio.prototype.preloadUrl = function(url) {
      return this.sounds[btoa(url)] = soundManager.createSound({
        id: id,
        url: url
      });
    };
    Audio.prototype.playUrl = function(url) {
      var id;
      soundManager.stopAll();
      id = btoa(url);
      if (__indexOf.call(this.sounds, id) < 0) {
        this.sounds[id] = soundManager.createSound({
          id: id,
          url: url
        });
      }
      return this.sounds[id].play();
    };
    return Audio;
  })();
  Lastfm = (function() {
    function Lastfm() {
      this.api_key = "202ece1f999e55ce1c3aaabbbad6ae40";
      this.api_prefix = "http://ws.audioscrobbler.com/2.0/?method=";
    }
    Lastfm.prototype.getArtistsForUser = function(user, callback) {
      return $.ajax(this.api_prefix + "user.gettopartists", {
        data: {
          api_key: this.api_key,
          user: user,
          "format": "json"
        },
        crossDomain: true,
        dataType: "json",
        success: function(response) {
          var a;
          return callback((function() {
            var _i, _len, _ref, _results;
            _ref = response.topartists.artist.slice(0, 11);
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              a = _ref[_i];
              _results.push({
                artist: a.name,
                image: a.image[a.image.length - 1]["#test"]
              });
            }
            return _results;
          })());
        }
      });
    };
    Lastfm.prototype.getTracksForArtist = function(artist, callback) {
      return $.ajax(this.api_prefix + "artist.gettoptracks", {
        data: {
          api_key: this.api_key,
          artist: artist,
          format: "json"
        },
        crossDomain: true,
        dataType: "json",
        success: __bind(function(response) {
          var t;
          return callback((function() {
            var _i, _len, _ref, _results;
            _ref = response.toptracks.track;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              t = _ref[_i];
              if (t.streamable["#text"] === "1") {
                _results.push({
                  artist: artist,
                  track: t.name
                });
              }
            }
            return _results;
          })());
        }, this)
      });
    };
    Lastfm.prototype.createPreviewUrl = function(record) {
      return this.api_prefix + "track.getpreviewmp3&" + $.param({
        api_key: this.api_key,
        artist: record.artist,
        track: record.track
      });
    };
    return Lastfm;
  })();
  define({
    "Audio": Audio,
    "Lastfm": Lastfm
  });
}).call(this);
