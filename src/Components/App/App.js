import React, { Component } from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { PlaylistList } from '../PlaylistList/PlaylistList';
import { Spotify } from '../util/Spotify';

class App extends Component {


    constructor(props){
        super(props);
        this.state = {
            searchResults: [],
            playlistTracks: [],
            playlistName: 'My Playlist',
            playlistId: null
        }

        /* Bind $this to methods */
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.selectPlaylist = this.selectPlaylist.bind(this);
    }

    

    componentDidMount() {
        Spotify.getAccessToken();
    }

    addTrack(track){
        
        if(!this.state.playlistTracks.includes(track)){
            
            this.setState(prevState => ({
                playlistTracks: prevState.playlistTracks.concat(track),
                // searchResults: prevState.searchResults.splice(prevState.playlistTracks.indexOf(track),1)
                searchResults: prevState.searchResults.filter(el => el.id !== track.id)
            }))
        }
    }

    removeTrack(track){
        
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(el => el.id !== track.id),
            searchResults: this.state.searchResults.concat(track)
        })
    }

    updatePlaylistName(name){
        this.setState({
            playlistName: name
        })
    }

    savePlaylist(){
        let uris = [];
        let trackURIs = this.state.playlistTracks;
        let name = this.state.playlistName;
        let id = this.state.playlistId;

        Object.keys(trackURIs).map((p)=>{
            return uris.push(trackURIs[p].uri);
        })      

        Spotify.savePlaylist(name, uris, id)
            .then(() => {
                // clear the search results and play list
                    this.setState({
                        searchResults: [],
                        playlistTracks: [],
                        playlistName: 'New Playlist',
                        playlistId: null
                    })

            });
    }

    selectPlaylist(id, name){
        
        Spotify.getPlayListBy(id).then(tracks => {
            
            this.setState({
                playlistTracks: tracks,
                playlistId: id,
                playlistName: name
            })
        })
    }

    updateInput(){
        
        return 'this';
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
                            searchResults={this.state.searchResults }  
                            onAdd={this.addTrack} />
                        <PlaylistList 
                            onClick={this.selectPlaylist} />
                        <Playlist playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            inputText={this.state.playlistName}
                            onSave={this.savePlaylist} />
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
