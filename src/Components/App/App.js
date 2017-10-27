import React, { Component } from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

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
            playlistName: "My Playlist",
            playlistTracks: [
                {
                    name: 'Stronger',
                    artist: 'Britney Spears',
                    album: 'Oops! I Did It Again'
                },
                {
                    name: 'So Emotional',
                    artist: 'Whitney Houston',
                    album: 'Whitney'
                }
            ]
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

    addTrack(track){
        /* Use the track's id property to check if the current song is 
           in the playlistTracks state. */
        //If the id is new, add the song to the end of the playlist.
        //Set the new state of the playlist
        if(!this.state.playlistTracks.includes(track)){
            this.setState(prevState => ({
                playlistTracks: prevState.push(track)
            }))
        }
    }
    removeTrack(track){
        this.setState(prevState => ({
            playlistTracks: prevState.filter(el => el.id !== track.id)
        }))
    }

    updatePlaylistName(name){
        this.setState({
            playlistName: name
        })

    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults 
                            searchResults={ this.state.searchResults }  
                            onAdd={ this.addTrack }
                        />
                        <Playlist playlistName={ this.state.playlistName }
                            playlistTracks={ this.state.playlistName }
                            onRemove={ this.onRemove }
                            onNameChange={ this.updatePlaylistName }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
