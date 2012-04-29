(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require(["libpairs"], function(Pairs) {
    var audio, currentRecordElement, lastfm, pairFound, pairNotFound, records, score, showRecords, updateScore;
    lastfm = new Pairs.Lastfm();
    audio = new Pairs.Audio();
    records = [];
    score = {
      tries: 0,
      pairs: 0,
      points: 0
    };
    currentRecordElement = null;
    updateScore = function() {
      $("#score_tries").text(score.tries.toString());
      $("#score_pairs").text(score.pairs.toString());
      return $("#score_points").text(score.points.toString());
    };
    pairFound = function(elem1, elem2) {
      audio.playUrl("audio/yay1.mp3", false);
      score.tries++;
      score.pairs++;
      score.points += 100;
      return updateScore();
    };
    pairNotFound = function(elem1, elem2) {
      audio.playUrl("audio/doh1.mp3", false);
      score.tries++;
      score.points -= 10;
      return updateScore();
    };
    showRecords = function(records) {
      if (currentRecordElement === null) {
        console.log("" + records.length + " records found");
      }
      $("#cards").css("opacity", 1);
      return $("#cards").find("li").each(function(i, elem) {
        console.log("Assigning record " + records[i] + " to slot " + i);
        elem.record = records[i];
        return $(this).find("a").click(function() {
          console.log("User clicked on record " + elem.record);
          audio.playUrl(lastfm.createPreviewUrl(elem.record));
          if (currentRecordElement !== null) {
            console.log("Selected as item B");
            if (elem.record.artist === currentRecordElement.record.artist) {
              pairFound(elem, currentRecordElement);
              currentRecordElement = null;
            } else {
              pairNotFound(elem, currentRecordElement);
              currentRecordElement = null;
            }
          } else {
            console.log("Selected as item A");
            currentRecordElement = elem;
          }
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
