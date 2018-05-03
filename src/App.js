import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'

let greyText = 'grey'
let greyTextColor = {color: greyText}
let defaultStyle = {background: 'pink'}

// let fakeServerData = {
//   user: {
//     name: 'Owen',
//     playlists: [
//       {
//         name: 'top',
//         songs: [{name: 'song 1', duration: 120},
//                 {name: 'song two', duration: 220},
//                 {name: 'songo 3', duration: 300}
//                ]
//       },
//       {
//         name: 'second to top',
//         songs: [{name: 'song uno', duration: 120},
//                 {name: 'song two', duration: 220},
//                 {name: 'songo three0', duration: 300}
//                ]
//       },
//       {
//         name: 'last playlist',
//         songs: [{name: 'song uno', duration: 120},
//                 {name: 'song two', duration: 220},
//                 {name: 'songo thr33', duration: 300}
//                ]
//       }
//     ]
//   }
// }

class Block extends Component {
  render() {
    let imgSrc = this.props.imgSrcData
    return (
      <div style = {greyTextColor} className="block">
        <img src={imgSrc} width='100px' height='100px' style={{'border-radius': '50%'}}/>
      </div>
    );
  }
}

class SongLengths extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    console.log(allSongs)
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + " " +eachSong.name
    }, '')
    return (
      <div>
        <p> total song length: {totalDuration}</p>
      </div>
    );
  }
}

class SongList extends Component {
  render() {
    return (
      <div style = {{...defaultStyle, width: '100px', height: '150px'}}>
        <h4>
          Songs:
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token

    if (!accessToken) {
      return
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      this.setState({serverData: {user: {name: data.display_name, img: data.images[0].url}}})
      console.log(data)
    })

  }
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ?
           <div>
            <h1>
              Queuet, Hello {this.state.serverData.user.name}
            </h1>
            <Block imgSrcData={this.state.serverData.user.img}/>
            {this.state.serverData.playlists &&
              <div>
                {this.state.serverData.user.playlists.map(playlist =>
                  <SongList />
                 )}
                <SongLengths playlists={this.state.serverData.user.playlists}/>
              </div>
            }

          </div> : <button onClick={() => {
                      window.location='http://localhost:8888/login'
                    }}> sign into Spotify </button>
        }
      </div>
    );
  }
}

export default App;
