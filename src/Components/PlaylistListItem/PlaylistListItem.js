import React, { Component } from 'react';
import './PlaylistListItem.css';

export class PlaylistListItem extends Component{

	render(){
		return(
			<div className="PlaylistListItem">
				<h3>{this.props.list.name}</h3>
			</div>
		)
	}
}