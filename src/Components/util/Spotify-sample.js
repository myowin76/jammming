const client_id = 'CLIENT_ID'; // Your client id
const client_secret = 'CLIENT_SECRET'; // Your secret
const redirect_uri = 'REDIRECT_URI'; // Your redirect uri

const spotifyPath = 'https://accounts.spotify.com/authorize';

let accessToken = '';

export let Spotify = {

	getAccessToken(){
		if(accessToken){
			return new Promise(resolve => resolve(accessToken));
		}
		return(
			fetch(spotifyPath, {
				method: 'POST'
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				accessToken = jsonResponse.access_token
			})
		)
	}
}
