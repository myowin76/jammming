import React, { Component } from 'react';
import './PlaylistListItem.css';

export class PlaylistListItem extends Component{
	constructor(props){
		super(props);
		this.getTracks = this.getTracks.bind(this);
	}

	getTracks(){
		this.props.onClick(this.props.list.id);
	}

	render(){
		return(
			<div className="PlaylistListItem">
				<h3 onClick={this.getTracks}>{this.props.list.name}</h3>
			</div>
		)
	}
}