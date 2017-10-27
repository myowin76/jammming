import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component{
	constructor(props){
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e){
		this.props.onNameChange = e.target.value;
	}

	render(){
		return(
			<div className="Playlist">
				<input defaultValue={ 'New Playlist' } 
					/>
				<TrackList 
					tracks={ this.props.playlistTracks }
					onRemove={ this.props.onRemove }
				/>
				<a className="Playlist-save" onChange={ this.handleNameChange }>
					SAVE TO SPOTIFY
				</a>
			</div>
		)
	}
}