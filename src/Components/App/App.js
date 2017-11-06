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
            searchResults: [],
            playlistName: 'My Playlist',
            playlistTracks: []
        }

        /* Bind $this to methods */
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    getAccessToken(){
        const client_id = '32f803599e424dfa889541229d8c5bc1'; // Your client id
        const redirect_uri = 'http://localhost:3000/';
        const spotifyPath = 'https://accounts.spotify.com/authorize?client_id=' + client_id +'&response_type=token' +
                            '&redirect_uri='+ redirect_uri + 
                            '&scope=playlist-read-private%20playlist-modify%20playlist-modify-private&state=34fFs29kd09';



        let accessToken, expiresIn;
        // save in localstorage
        var expires = 0 + localStorage.getItem('spotify_expires', '0');

        if ((new Date()).getTime() > expires) {

            window.location = spotifyPath;

            accessToken = (window.location.href).match(/access_token=([^&]*)/)[1];
            expiresIn = (window.location.href).match(/expires_in=([^&]*)/);

            localStorage.setItem('spotify_token', accessToken);
            localStorage.setItem('spotify_expires', (new Date()).getTime() + expiresIn);

        }else{
            accessToken = localStorage.getItem('spotify_token', '');
        }
        
        return accessToken;
    }

    componentDidMount() {
        this.getAccessToken()
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
        let uris = [];
        let trackURIs = this.state.playlistTracks;
        let name = this.state.playlistName;

        Object.keys(trackURIs).map((p)=>{
            uris.push(trackURIs[p].uri);
        })
        // console.log(uris);return;

        Spotify.savePlaylist(name, uris);
    }

    showPlaylist(){
        Spotify.getPlayList();
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
                            // playlistTracks={this.showPlaylist}
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
