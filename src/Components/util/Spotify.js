const client_id = '32f803599e424dfa889541229d8c5bc1'; // Your client id
// const client_secret = '192b745b4b5142c98d0948e8a5ff967f'; // Your secret
const redirect_uri = 'http://localhost:3000/';

// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

const spotifyPath = 'https://accounts.spotify.com/authorize?client_id=' + client_id +'&response_type=token' +
							'&redirect_uri='+ redirect_uri + 
							'&scope=user-read-private%20user-read-email&state=34fFs29kd09';

let accessToken, expiresIn;

export let Spotify = {

	getAccessToken(){
		
		if(accessToken){
			return new Promise(resolve => resolve(accessToken));
		}else{
			console.log('getting token..');

			window.location = spotifyPath;
			// window.history.replaceState('URI', 'test', spotifyPath);
			let AT = (window.location.href).match(/access_token=([^&]*)/);
			let EI = (window.location.href).match(/expires_in=([^&]*)/);

			if (AT != null) {
				accessToken = AT;
			}
			if (EI != null) {
				expiresIn = AT;
			}

			// window.location.href = redirect_uri;
			
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');

			if (!accessToken && !AT){

			}	

			return accessToken;
		}
	},

	search(term){
		
		// return this.getAccessToken().then(()=>{
		
			return fetch('https://api.spotify.com/v1/search?q=' + term, {
				headers: {
					Authorization: 'Bearer' + this.getAccessToken()
				}

			}).then(response => {
				return response.json();

			}).then(jsonResponse => {
				
				if(jsonResponse){
					return jsonResponse.tracks.map(track => (
						{
							ID: track.id,
							Name: track.name,
							Artist: track.artist[0].name,
							Album: track.album,
							URI: track.uri
						}
					))
				}

			})
		// });
	},

	getUserID(){
		let userID;
		const headers = {
			Authorization: 'Bearer BQA7gRxdxZdGR1yZ6dr8Fy94JTHJrTFJ1J0LRtNmbB5m6q1s2kTPoagGeCBPPeGOsDFbYCshAMb-U6NT-mrIeKJ20HOExk4gpy-Kqth9sUj3t8KaT-ZB4lbtAVH9KliunohjPk6EMyoU0mIMPDhH8JZRz19O6W7qcLOx1dr08-lHcJMKcxc'
		}

		// Get Current Users ID
		return fetch('https://api.spotify.com/v1/me', {
				headers: headers
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				userID = jsonResponse.id
				console.log(userID);
			})
	},

	savePlaylist(name, trackUris){
		// check if there are values saved to the method's two arguments. If not, return.
		if(name ==null || trackUris.length < 0){
			return;
		}
		
		// Receive the playlist ID back from the request.

		
		let userID;
		let playlistID;

		const headers = {
			Authorization: 'Bearer' + this.getAccessToken()
		}

		// Get Current Users ID
		fetch('https://api.spotify.com/v1/me', {
				headers: headers
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				userID = jsonResponse.id
			})


		// POST a new playlist with the input name
		// POST the track URIs to the newly-created playlist, 
		// referencing the current user's account (ID) and the new playlist (ID)	
		return(
			fetch('/v1/users/${userID}/playlists', {
				method: 'POST',
				'Content-Type': 'application/json',
				body: JSON.stringify({
					name: name,
					playlist: trackUris
				})
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				playlistID = jsonResponse.access_token;
			})
		)

	}
}