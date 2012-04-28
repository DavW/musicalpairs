require ["libpairs"], (Pairs) ->
	lastfm = new Pairs.Lastfm()
	audio = new Pairs.Audio()
	records=[]
	showRecords = (records) ->
		$("#cards").css("opacity",1);
		$("#cards").find("a").each (i,elem)->
			$(this).click ->
				url = lastfm.createPreviewUrl records[i]
				audio.playUrl url
				false
	
	$("#controlsForm").submit ->
		user = $(this).find('[name="username"]').val()
		lastfm.getArtistsForUser user,(artists) =>
			waiting=0
			records=[]
			for a in artists[0..9]
				waiting++
				lastfm.getTracksForArtist a.artist, (tracks) =>
					records.push(tracks[0])
					records.push(tracks[1])
					waiting--
					if waiting==0
						showRecords records
		false


