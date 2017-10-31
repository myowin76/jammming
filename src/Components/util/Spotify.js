const client_id = '32f803599e424dfa889541229d8c5bc1'; // Your client id
// const client_secret = '192b745b4b5142c98d0948e8a5ff967f'; // Your secret
const redirect_uri = 'http://localhost:3000/';

// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

const spotifyPath = 'https://accounts.spotify.com/authorize?client_id=' + client_id +'&response_type=token' +
							'&redirect_uri='+ redirect_uri + 
							'&scope=user-read-private%20user-read-email&state=34fFs29kd09';

const spotifySearchUrl = 'https://api.spotify.com/v1/search'							

let accessToken, expiresIn;
// let accessToken = 'BQAmA7OmEZV_eyHqCTPAODz7wk1hOS0KEj9WPkwetOgNWpmYCofa3Q0v99RxtezlFchGSGBS43xHSiQXF9s63HxD_hl5EJ7V80FjciVKkC36aonKCbcu5H8JXArVwHzQwj3iYaXnFla0vF2f9Ph4sv2LWgpcEgnbMc84PKwxjU814AoIZa0&token_type=Bearer&expires_in=3600&state=34fFs29kd09';

export let Spotify = {

	getAccessToken(){
		
		if(accessToken != null){
			return new Promise(resolve => resolve(accessToken));
		}else{
			console.log('getting token..');

			window.location.href = spotifyPath;
			let AT = (window.location.href).match(/access_token=([^&]*)/);
			let EI = (window.location.href).match(/expires_in=([^&]*)/);

			if (AT != null) {
				accessToken = AT;
			}
			if (EI != null) {
				expiresIn = AT;
			}

			window.location.href = redirect_uri;
			
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');

			if (!accessToken && !AT){

			}	

			return accessToken;
		}
		
		
	},

	search(term){
		

		// console.log("ATTT" + accessToken);
		// return this.getAccessToken().then(()=>{
		// 	console.log("ATTT" + accessToken);
			return fetch(spotifySearchUrl + '?q=' + term, {
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

	savePlaylist(name, trackUris){
		// check if there are values saved to the method's two arguments. If not, return.
		// GET current user's ID
		// POST a new playlist with the input name
		// to the current user's Spotify account. 
		// Receive the playlist ID back from the request.

		// POST the track URIs to the newly-created playlist, 
		// referencing the current user's account (ID) and the new playlist (ID)
		let userID;
		let playlistID;

		const headers = {
			Authorization: 'Bearer' + this.getAccessToken()
		}


		fetch('https://api.spotify.com/v1/me', {
				headers: headers
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				userID = jsonResponse.id
			})


		return(
			fetch('/v1/users/${userID}/playlists', {
				method: 'POST',
				'Content-Type': 'application/json',
				data: {
					name: name,
					playlist: trackUris
				}
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				playlistID = jsonResponse.access_token;
			})
		)

	}
}