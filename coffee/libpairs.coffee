class Audio
	constructor: ->
		@sounds={}
	preloadUrl: (url) ->
		@sounds[btoa(url)] = soundManager.createSound({id: id, url: url})
	playUrl: (url, stopOthers=true) ->
		if stopOthers then soundManager.stopAll()
		id=btoa(url)
		if id not in @sounds
			@sounds[id] = soundManager.createSound({id: id, url: url})
		@sounds[id].play()

class Lastfm
	constructor: ->
		@api_key="202ece1f999e55ce1c3aaabbbad6ae40"
		@api_prefix="http://ws.audioscrobbler.com/2.0/?method="
	
	getArtistsForUser: (user, callback) ->
		$.ajax @api_prefix+"user.gettopartists",
			data:
				api_key:@api_key
				user:user
				"format":"json"
			crossDomain: true
			dataType: "json"
			success: (response) ->
				callback({artist:a.name, image:a.image[a.image.length-1]["#test"]} for a in response.topartists.artist[0..10])
	
	getTracksForArtist: (artist, callback) ->
		$.ajax @api_prefix+"artist.gettoptracks",
			data:
				api_key:@api_key
				artist:artist
				format:"json"
			crossDomain: true
			dataType: "json"
			success: (response) =>
				callback({artist:artist, track:t.name} for t in response.toptracks.track when t.streamable["#text"]=="1")
	
	createPreviewUrl: (record) ->
		@api_prefix+"track.getpreviewmp3&"+$.param({api_key:@api_key,artist:record.artist,track:record.track})

define(
	"Audio":Audio
	"Lastfm":Lastfm
	)


				
		
