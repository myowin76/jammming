import React, { Component } from 'react';
import './PlaylistList.css';

import { PlaylistListItem } from '../PlaylistListItem/PlaylistListItem';
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
						return <PlaylistListItem
									key={'id' + i}
									list={list}
									onClick={this.props.onClick}
								/>
					})
				}
				
			</div>
		)
	}
}