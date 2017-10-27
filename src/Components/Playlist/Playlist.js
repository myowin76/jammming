import React from 'react';
import './Playlist.css';

export class Playlist extends React.Component{

	render(){
		return(
			<div class="Playlist">
			  <input defaultValue={'New Playlist'}/>
			  //<Tracklist />
			  <a className="Playlist-save">SAVE TO SPOTIFY</a>
			</div>
		)
	}
}