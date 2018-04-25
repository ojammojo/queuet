import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let greyText = 'grey'
let greyTextColor = {color: greyText}
let defaultStyle = {background: 'pink'}

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
      <div style = {{}}>
        <input type="text"/> Search for a song
      </div>
    );
  }
}

class SongList extends Component {
  render() {
    return (
      <div style = {{...defaultStyle, width: '100px', height: '150px'}}>
        <h4> Songs: </h4>
        <ul> <li>Song 1</li> <li>Song 2</li> <li>Song 3</li></ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    let black = '#fff'
    let headerStyle = {color: black, 'font-size': '50px'}
    return (
      <div className="App">
        <h1> Queuet </h1>
        <Block/>
        <Filter/>
        <SongList/>
      </div>
    );
  }
}

export default App;
