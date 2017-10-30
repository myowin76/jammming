const client_id = '32f803599e424dfa889541229d8c5bc1'; // Your client id
const client_secret = '192b745b4b5142c98d0948e8a5ff967f'; // Your secret
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

const spotifyPath = corsAnywhere + 'https://accounts.spotify.com/authorize?client_id=' + client_id +'&response_type=token' +
							'&redirect_uri='+ window.location.href + 
							'&scope=user-read-private%20user-read-email&state=34fFs29kd09';

const spotifySearchUrl = 'https://api.spotify.com/v1/search'							

let accessToken;
// let accessToken = 'BQAmA7OmEZV_eyHqCTPAODz7wk1hOS0KEj9WPkwetOgNWpmYCofa3Q0v99RxtezlFchGSGBS43xHSiQXF9s63HxD_hl5EJ7V80FjciVKkC36aonKCbcu5H8JXArVwHzQwj3iYaXnFla0vF2f9Ph4sv2LWgpcEgnbMc84PKwxjU814AoIZa0&token_type=Bearer&expires_in=3600&state=34fFs29kd09';

export let Spotify = {

	getAccessToken(){
		// if(accessToken){
		// 	return new Promise(resolve => resolve(accessToken));
		// }
		console.log('getting token..');
		return(
			fetch(spotifyPath, {
				headers: {
					"X-Requested-With": "Accept"
				}
			}).then(response => {
				console.log("ATTT " + response);
				console.log("Path" + spotifyPath);
				// accessToken = response.access_token
			})
		)
	},

	search(term){


		return this.getAccessToken().then(()=>{
			console.log('Fetching...from ');
			console.log(corsAnywhere + spotifySearchUrl + '?q=' + term + '&type=artist');
			return fetch(corsAnywhere + spotifySearchUrl + '?q=' + term + '&type=artist', {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
		})
	}
}
// "Authorization: Bearer NgCXRKc...MzYjw" https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V