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
		let isRemoval = true;
		if(isRemoval){
			return '-!!!';
			// return '<a onClick={ this.addTrack } className="Track-action">-</a>';
		}else{
			return '+';
			// return '<a onClick={ this.removeTrack } className="Track-action">+</a>';
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
				<p>{ this.props.track.id } | { this.props.track.uri }</p>
				</div>
				
				{ this.renderAction }
			</div>
		)
	}
}