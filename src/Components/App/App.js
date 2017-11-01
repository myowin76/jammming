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

        /* Bind $this to methods */
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    getAccessToken(){
        const client_id = '32f803599e424dfa889541229d8c5bc1'; // Your client id
// const client_secret = '192b745b4b5142c98d0948e8a5ff967f'; // Your secret
const redirect_uri = 'http://localhost:3000/';

// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

const spotifyPath = 'https://accounts.spotify.com/authorize?client_id=' + client_id +'&response_type=token' +
                            '&redirect_uri='+ redirect_uri + 
                            '&scope=user-read-private%20user-read-email&state=34fFs29kd09';

let accessToken, expiresIn;

    
        //localstorage
        var expires = 0 + localStorage.getItem('spotify_expires', '0');

        if ((new Date()).getTime() > expires) {

            window.location = spotifyPath;

            accessToken = (window.location.href).match(/access_token=([^&]*)/)[1];
            expiresIn = (window.location.href).match(/expires_in=([^&]*)/);
            console.log("I arrived here");
                localStorage.setItem('spotify_token', accessToken);
                localStorage.setItem('spotify_expires', (new Date()).getTime() + expiresIn);

        }else{
            accessToken = localStorage.getItem('spotify_token', '');
            console.log("GETHERE");
        }
        
        // if ((new Date()).getTime() > expires) {
        //  // get new token
        //  // window.location = spotifyPath;
            
        //  accessToken = (window.location.href).match(/access_token=([^&]*)/);
        //  expiresIn = (window.location.href).match(/expires_in=([^&]*)/);

        //  // window.location.href = redirect_uri;

        //  // if(access_token == null){
        //  //  return
        //  // }

        //  localStorage.setItem('spotify_token', accessToken);
        //  localStorage.setItem('spotify_expires', (new Date()).getTime() + expiresIn);

        // //   // window.location.href = redirect_uri;

        // }else{
        //  var accessToken = localStorage.getItem('spotify_token', '');
        //  console.log('Should not here!');
        // }
        console.log("TOKEN: " + accessToken);
        return accessToken;

        // if(accessToken){
        //  return new Promise(resolve => resolve(accessToken));
        // }else{

        //  window.location = spotifyPath;
        
        //  let AT = (window.location.href).match(/access_token=([^&]*)/);
        //  let EI = (window.location.href).match(/expires_in=([^&]*)/);

        //  if (AT != null) {
        //      accessToken = AT;
        //  }
        //  if (EI != null) {
        //      expiresIn = AT;
        //  }

        //  // window.location.href = redirect_uri;
            
        //  // window.setTimeout(() => accessToken = '', expiresIn * 1000);
        //  // window.history.pushState('Access Token', null, '/');

        //  if (!accessToken && !AT){

        //  }   

        //  return accessToken;
        // }

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
