import React, { Component }  from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends Component{
	constructor(props){
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e){
		this.props.onNameChange(e.target.value);
	}

	render(){
		return(
			<div className="Playlist">
				<input 
					value={this.props.inputText ? this.props.inputText : 'New Playlist'} 
					onChange={ this.handleNameChange } />
				<TrackList 
					tracks={ this.props.playlistTracks }
					onRemove={ this.props.onRemove }
					isRemoval={true}
				/>
				<a className="Playlist-save" onChange={ this.handleNameChange }
					onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</a>
			</div>
		)
	}
}