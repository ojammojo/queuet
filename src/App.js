import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'


let greyText = 'grey'
let greyTextColor = {color: greyText}
let defaultStyle = {background: 'pink'}


class Block extends Component {
  render() {
    let imgSrc = this.props.imgSrcData
    return (
      <div style = {greyTextColor} className="block">
        <img src={imgSrc} width='100px' height='100px' style={{'borderRadius': '50%'}}/>
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

class AddEmail extends Component {
  constructor() {
    super()
    this.state = {severData: {}}
  }
  componentDidMount() {
    console.log('testing other calls to the server')
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token

    if (!accessToken) {
      return
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      this.setState({serverData: {user: {email: data.email}}})
    })

  }
  render() {
    let userEmail = this.props.userEmail
    return (
      <h1> {userEmail}</h1>
    )
  }
}

class ImgDisplay extends Component {
  render() {
    return (
      <div>
        <img src={this.props.searchImg.url} />
      </div>
    )
  }
}

//form styling
let seachFormStyle = {
  backgroundColor: 'transparent',
  border: '0px',
  fontSize: '50px',
  fontFamily: 'helvetica',
  color: 'white',
  'margin-left': '30px',
  'margin-top': '30px',
  outline: 0
}

let itemReturnStyle = {width: '80px', height: '80px', 'borderRadius': '50%', zIndex: '100'}

//returns a list of artists relevant to the search
class ItemReturn extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <img style={itemReturnStyle} src={this.props.imgSrcURL} />
        <p> {this.props.artistTitle} </p>
      </div>
    )
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchReturn: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    console.log('querying a song')
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token


    if (!accessToken) {
      return
    }

    fetch(`https://api.spotify.com/v1/search?q=${this.state.value}%20&type=artist`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      this.setState({searchReturn: data.artists.items})
      console.log(data)
    })

    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    console.log('rendering search image')
    return (
      <div style={{position: 'absolute', left: '300px'}}>
        <form onSubmit={this.handleSubmit}>
          <input style={seachFormStyle} type="text" placeholder="search..." value={this.state.value} onChange={this.handleChange} />
        </form>
        <div>
          { this.state.searchReturn[0] &&
            <div>
            {
              this.state.searchReturn.map(artist => {
                let imgResult = artist.images[0]
                /*console.log(res)*/
                if (imgResult && artist.name) {
                  return(
                    <ItemReturn imgSrcURL={imgResult.url} artistTitle={artist.name}/>
                  )
                } else {
                  return (
                    <ItemReturn imgSrcURL={null} artistTitle={artist.name}/>
                  )
                }

              }
              )}

            </div>
          }
        </div>
      </div>
    );
  }
}

let sideMenu = {
  position: 'fixed',
  width: '300px',
  height: '100%',
  top: '0px',
  left: '0px',
  backgroundColor: '#141414',
  fontFamily: 'Raleway',
  fontSize: '35px',
  fontWeight: 900
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      email: '',
      imgUrl: ''
    }
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

  emailSearch() {
    console.log('button clicked')
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token

    if (!accessToken) {
      return
    }

    fetch('https://api.spotify.com/v1/search?q=bob%20year:2014&type=album', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      this.setState({email: data.country})
      console.log(data)
    })
  }

  songSearch(query) {
    console.log('querying a song')
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token


    if (!accessToken) {
      return
    }

    fetch(`https://api.spotify.com/v1/search?q=${query}%20&type=artist`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      this.setState({imgUrl: data.artists.items[0].images[0].url})
      console.log(data)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
           <div>
           <div className="sideMenu" style={sideMenu}>
            <h1> Queuet </h1>
            <Block imgSrcData={this.state.serverData.user.img}/>
            <h3 style={{fontFamily: 'open sans', fontSize: '14px'}}>
              Hey there, {this.state.serverData.user.name}
            </h3>
           </div>
            <ImgDisplay searchImg={this.state.imgUrl} />
            <NameForm />
            {this.state.email &&
              <AddEmail userEmail={this.state.email}/>
            }
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


// NOT IN USE //
//
// two lines below used for testing button states in App component
// <button onClick={() => this.emailSearch()}> where are you from? </button>
// <button onClick={() => this.songSearch('hendrix')}> Jimi Hendrix Test </button>
