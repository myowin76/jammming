const client_id = '32f803599e424dfa889541229d8c5bc1'; // Your client id
const redirect_uri = 'http://localhost:3000/';
// const redirect_uri = 'http://aung-myo.win/';
const spotifyPath = 'https://accounts.spotify.com/authorize?client_id=' + client_id +'&response_type=token' +
                    '&redirect_uri='+ redirect_uri + 
                    '&scope=playlist-read-private%20playlist-modify%20playlist-modify-private&state=34fFs29kd09';



let accessToken, expiresIn;
let userID;
let playlistID;


export let Spotify = {

	getAccessToken(){
        
        // save in localstorage //still need to do it right
        var expires = 0 + localStorage.getItem('spotify_expires', '0');

        if (new Date().getTime() > expires) {
            window.location = spotifyPath;

            accessToken = (window.location.href).match(/access_token=([^&]*)/)[1];
            expiresIn = (window.location.href).match(/expires_in=([^&]*)/);

            localStorage.setItem('spotify_token', accessToken);
            localStorage.setItem('spotify_expires', (new Date()).getTime() + expiresIn);

        }else{
            accessToken = localStorage.getItem('spotify_token', '');
        }
        
        return accessToken;
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

	updatePlaylist(name,trackUris, playlistId){

        return fetch('https://api.spotify.com/v1/users/' + userID +'/playlists/' + playlistId + '/tracks', {
			method: 'PUT',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('spotify_token', ''),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uris: trackUris
			})					

		}).then(response => {
			return response.json();

		}).then(jsonResponse => {
			return jsonResponse.snapshot_id;
		});
    },

	savePlaylist(name, trackUris, playlistId){
		
		if(name == null || trackUris.length < 0){
			return;
		}

		return this.getUserID().then(()=>{
			
			if(userID){
				if(playlistId){	
					// Playlist ID existed / need to update
					this.updatePlaylist(name, trackUris, playlistId);
					
				}else{
					// Create a new playlist
					return fetch('https://api.spotify.com/v1/users/' + userID +'/playlists', {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('spotify_token', ''),
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							name: name
						})
		
					}).then(response => {
						return response.json();

					}).then(jsonResponse => {

						playlistID = jsonResponse.id;
						if(playlistID){

							return fetch('https://api.spotify.com/v1/users/' + userID +'/playlists/' + playlistID + '/tracks', {
								method: 'POST',
								headers: {
									'Authorization': 'Bearer ' + localStorage.getItem('spotify_token', ''),
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									uris: trackUris
								})					

							}).then(response => {
								return response.json();

							}).then(jsonResponse => {
								return jsonResponse.snapshot_id;
							});
						}
						
					})
				}
			}
		});				
			
	},

	getUserPlaylists(){
		return this.getUserID().then(()=>{
			if(userID){
				return fetch('https://api.spotify.com/v1/users/' + userID +'/playlists', {
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('spotify_token', ''),
						'Content-Type': 'application/json'
					}
				}).then(response => {
					return response.json();

				}).then(jsonResponse => {
					let playlist = [];

					jsonResponse.items.map(list => {
						playlist.push({
							id: list.id,
							name: list.name
						})
					})
					
					return playlist;
				})
			}
		});
	},

	getPlayListBy(id){

		return this.getUserID().then(()=>{

			return fetch('https://api.spotify.com/v1/users/' + userID + '/playlists/'+ id + '/tracks', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('spotify_token', ''),
					'Content-Type': 'application/json'
				}
			}).then(response => {
				return response.json();

			}).then(jsonResponse => {
				if(jsonResponse){
					
					return jsonResponse.items.map(track => (
						{
							id: track.track.id,
							name: track.track.name,
							artist: track.track.artists[0].name,
							album: track.track.album.name,
							uri: track.track.uri
						}
					))
				}
				return jsonResponse.items;



			})
		});
	}	
}