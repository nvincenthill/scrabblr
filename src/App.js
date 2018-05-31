import React, { Component } from "react";
import "./App.css";
let checkWord = require("check-word");

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "example",
      alphabet: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ]
    };
  }

  // generate a random word of length n
  getRandomWord = (arr, n) => {
    let shuffledArray = this.shuffleArray(arr);
    console.log(shuffledArray.slice(0, n).join(''));
    return shuffledArray.slice(0, n).join('');
  };

  //Durstenfeld shuffle
  shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  render() {
    return (
      <MyContext.Provider
        value={
          {
            getRandomWord: this.getRandomWord,
            state: this.state
          }
        }
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">WordFlipper</h1>
              </header>
              <p className="App-intro">
                {checkWord("en") ? context.getRandomWord(context.state.alphabet, 10) : "FAIL"}
              </p>
            </div>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

export default App;
