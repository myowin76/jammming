let userID;
let playlistID;

export let Spotify = {

	getAccessToken(){

	},

	search(term){
			
		return fetch('https://api.spotify.com/v1/search?q=' + term +'&type=track', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('spotify_token', '')
			}

		}).then(response => {
			return response.json();

		}).then(jsonResponse => {
			
			if(jsonResponse){
				return jsonResponse.tracks.items.map(track => (
					{
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri
					}
				))
			}

		})
		
	},

	getUserID(){
		// Get Current Users ID
		return fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('spotify_token')
				}
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				userID = jsonResponse.id
			})
	},

	savePlaylist(name, trackUris){
		// check if there are values saved to the method's two arguments. If not, return.
		if(name == null || trackUris.length < 0){
			return;
		}
		// Receive the playlist ID back from the request.
		// POST a new playlist with the input name
		// POST the track URIs to the newly-created playlist, 
		// referencing the current user's account (ID) and the new playlist (ID)	
		return this.getUserID().then(()=>{
			if(userID){
				return(
					fetch('https://api.spotify.com/v1/users/' + userID +'/playlists', {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('spotify_token', ''),
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							name: name,
							public: false,
							collaborative: true
						})
					}).then(response => {
						return response.json();
					}).then(jsonResponse => {

						playlistID = jsonResponse.id;
						console.log("URIs" + trackUris);
						fetch('https://api.spotify.com/v1/users/' + userID +'/playlists/' + playlistID + '/tracks', {
							method: 'POST',
							headers: {
								'Authorization': 'Bearer ' + localStorage.getItem('spotify_token', ''),
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								uris: trackUris
							})					

						}).then(response => {
							console.log(response);
							// return response.json();
						}).then(jsonResponse => {
							
							console.log("FINALLY HERE");
						});
						
					})
				)
			}
		});
	},

	getPlayList(){
		return fetch('https://api.spotify.com/v1/users/' + userID +'/playlists', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('spotify_token', ''),
				'Content-Type': 'application/json'
			}
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			let playlist = jsonResponse.tracks.items;
			console.log(playlist);
		})
	}
}