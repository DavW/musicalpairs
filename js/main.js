(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require(["libpairs"], function(Pairs) {
    var audio, lastfm, records, showRecords;
    lastfm = new Pairs.Lastfm();
    audio = new Pairs.Audio();
    records = [];
    showRecords = function(records) {
      $("#cards").css("opacity", 1);
      return $("#cards").find("a").each(function(i, elem) {
        return $(this).click(function() {
          var url;
          url = lastfm.createPreviewUrl(records[i]);
          audio.playUrl(url);
          return false;
        });
      });
    };
    return $("#controlsForm").submit(function() {
      var user;
      user = $(this).find('[name="username"]').val();
      lastfm.getArtistsForUser(user, __bind(function(artists) {
        var a, waiting, _i, _len, _ref, _results;
        waiting = 0;
        records = [];
        _ref = artists.slice(0, 10);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          waiting++;
          _results.push(lastfm.getTracksForArtist(a.artist, __bind(function(tracks) {
            records.push(tracks[0]);
            records.push(tracks[1]);
            waiting--;
            if (waiting === 0) {
              return showRecords(records);
            }
          }, this)));
        }
        return _results;
      }, this));
      return false;
    });
  });
}).call(this);
