import React, { Component } from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

import { Spotify } from '../util/Spotify';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchResults: [
                {
                    name: 'Tiny Dancer',
                    artist: 'Elton John',
                    album: 'Madman across the water'
                },
                {
                    name: 'Tiny Dancer',
                    artist: 'Elton John',
                    album: 'Madman across the water'
                },
                {
                    name: 'Tiny Dancer',
                    artist: 'Elton John',
                    album: 'Madman across the water'
                }
            ],
            playlistName: 'My Playlist',
            playlistTracks: [
                {
                    id: 1,
                    name: 'Stronger',
                    artist: 'Britney Spears',
                    album: 'Oops! I Did It Again'
                },
                {
                    id: 2,
                    name: 'So Emotional',
                    artist: 'Whitney Houston',
                    album: 'Whitney'
                }
            ]
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        
    }

    addTrack(track){
        
        if(!this.state.playlistTracks.includes(track)){
            
            this.setState(prevState => ({
                playlistTracks: prevState.playlistTracks.concat(track)
            }))
        }
        
    }
    removeTrack(track){
        
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(el => el.id !== track.id)
        })
    }

    updatePlaylistName(name){
        this.setState({
            playlistName: name
        })
    }

    savePlaylist(){
        let trackURIs = this.state.playlistTracks;
        Spotify.savePlaylist();
    }

    search(term){
        
        Spotify.search(term).then(tracks => {
            this.setState({
                searchResults: tracks
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults 
                            searchResults={ this.state.searchResults }  
                            onAdd={ this.addTrack } />
                        <Playlist playlistName={ this.state.playlistName }
                            playlistTracks={ this.state.playlistTracks }
                            onRemove={ this.removeTrack }
                            onNameChange={ this.updatePlaylistName }
                            onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
