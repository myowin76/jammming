import React from 'react';
import './Track.css';

export class Track extends React.Component{

	constructor(props){
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.renderAction = this.renderAction.bind(this);
	}

	renderAction(){
		let isRemoval;
		if(isRemoval){
			return '-';
		}else{
			return '+';
		}
	}

	addTrack(){
		this.props.onAdd(this.props.track)
	}

	removeTrack(){
		this.props.onRemove(this.props.track)	
	}

	render(){
		return(
			<div className="Track">
				<div className="Track-information">
				<h3>{this.props.track.name}</h3>
				<p>{ this.props.track.artist } | { this.props.track.album }</p>
				</div>
				<a onClick={ this.addTrack } className="Track-action">{ this.renderAction }</a>
				<a onClick={ this.removeTrack } className="Track-action">{ this.renderAction }</a>
			</div>
		)
	}
}