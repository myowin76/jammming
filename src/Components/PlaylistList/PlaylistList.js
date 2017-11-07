import React, { Component } from 'react';
import './PlaylistList.css';
import { Spotify } from '../util/Spotify';

export class PlaylistList extends Component{

	constructor(props){
		super(props);
		this.state = {
			playlist: []
		}
	}

	componentWillMount(){
		Spotify.getUserPlaylists().then((list)=>{

			this.setState({
				playlist: list
			})
		});
	}

	render(){
		return(
			<div className="PlaylistList">
				<h2>Local Playlist</h2>
				{
					this.state.playlist.map((list,i) => {
						return <h3>{list.name}</h3>
					})
				}
				
			
				
			</div>
		)
	}
}