require ["libpairs"], (Pairs) ->
	lastfm = new Pairs.Lastfm()
	audio = new Pairs.Audio()
	records=[]
	score = 
		tries:0
		pairs:0
		points:0
	currentRecordElement=null
	updateScore = ->
		$("#score_tries").text score.tries.toString()
		$("#score_pairs").text score.pairs.toString()
		$("#score_points").text score.points.toString()
	pairFound = (elem1, elem2)->
		audio.playUrl "audio/yay1.mp3",false
		score.tries++
		score.pairs++
		score.points+=100
		updateScore()
	pairNotFound = (elem1, elem2)->
		audio.playUrl "audio/doh1.mp3",false
		score.tries++
		score.points-=10
		updateScore()
	showRecords = (records) ->
		if currentRecordElement==null then console.log "#{records.length} records found"
		$("#cards").css("opacity",1);
		$("#cards").find("li").each (i,elem)->
			console.log "Assigning record #{records[i]} to slot #{i}"
			elem.record = records[i]
			$(this).find("a").click ->
				console.log "User clicked on record #{elem.record}"
				audio.playUrl lastfm.createPreviewUrl elem.record
				if currentRecordElement!=null
					console.log "Selected as item B"
					if elem.record.artist==currentRecordElement.record.artist
						pairFound elem,currentRecordElement
						currentRecordElement=null
					else
						pairNotFound elem,currentRecordElement
						currentRecordElement=null
				else
					console.log "Selected as item A"
					currentRecordElement=elem
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


