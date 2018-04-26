import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

let greyText = 'grey'
let greyTextColor = {color: greyText}
let defaultStyle = {background: 'pink'}

let fakeServerData = {
  user: {
    name: 'Owen',
    playlists: [
      {
        name: 'top',
        songs: [{name: 'song uno', duration: 120},
                {name: 'song two', duration: 220},
                {name: 'songo three0', duration: 300}
               ]
      },
      {
        name: 'second to top',
        songs: [{name: 'song uno', duration: 120},
                {name: 'song two', duration: 220},
                {name: 'songo three0', duration: 300}
               ]
      },
      {
        name: 'last playlist',
        songs: [{name: 'song uno', duration: 120},
                {name: 'song two', duration: 220},
                {name: 'songo three0', duration: 300}
               ]
      }
    ]
  }
}

class Block extends Component {
  render() {
    return (
      <div style = {greyTextColor} className="block">
        <h3> A playlist sharing App </h3>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input type="text"/> Search for a song
      </div>
    );
  }
}

class SongLengths extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDurtaion = this.props.playlists.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div>
        <p> total song length: {allSongs.length/60}</p>
      </div>
    );
  }
}

class SongList extends Component {
  render() {
    return (
      <div style = {{...defaultStyle, width: '100px', height: '150px'}}>
        <h4>
          Songs {this.props.playlists.length}:
        </h4>
        <ul> <li>Song 1</li> <li>Song 2</li> <li>Song 3</li></ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000)

    //this.setState({serverData: fakeServerData});
  }
  render() {
    let black = '#fff'
    let headerStyle = {color: black, 'font-size': '50px'}
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1>
              Queuet for {this.state.serverData.user.name}
            </h1>
            <Block/>
            <Filter/>
            <SongList playlists={this.state.serverData.user.playlists}/>
            <SongLengths playlists={this.state.serverData.user.playlists}/>
          </div> : 'loading your (re)queuets...'
        }
      </div>
    );
  }
}

export default App;
