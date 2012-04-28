(function() {
  var Lastfm;
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
          format: "json"
        },
        crossDomain: true,
        dataType: "json",
        success: function(response) {
          var a;
          return callback((function() {
            var _i, _len, _ref, _results;
            _ref = response.topartists.artist;
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
          user: user,
          format: "json"
        },
        crossDomain: true,
        dataType: "json",
        success: function(response) {
          var t;
          return callback((function() {
            var _i, _len, _ref, _results;
            _ref = response.toptracks.track;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              t = _ref[_i];
              if (t.streamable["#text"] === 1) {
                _results.push({
                  artist: artist,
                  track: t.name
                });
              }
            }
            return _results;
          })());
        }
      });
    };
    Lastfm.prototype.createPreviewUrl = function(artist, track) {
      return this.api_prefix + "track.getpreviewmp3" + $.param({
        api_key: this.api_key,
        artist: artist,
        track: track
      });
    };
    return Lastfm;
  })();
}).call(this);
