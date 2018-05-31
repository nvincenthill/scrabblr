import React, { Component, PropTypes } from "react";
import "./App.css";
import Dictionary from "./Dictionary.json";
import Scrabble from "./Scrabble.js";

import moment from "moment";
import { times } from "lodash";
import classNames from "classnames";
import HTML5Backend from "react-dnd-html5-backend";
import { DragSource, DropTarget, DragDropContext } from "react-dnd";
import FlipMove from "react-flip-move";
import Toggle from "./Toggle.js";
import helpers from "./helpers.js";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "example",
      randomWord: "",
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
      ],
      tiles: [
        { id: 1, letter: "F", points: 4, x: 0, y: 3 },
        { id: 2, letter: "L", points: 2, x: 1, y: 3 },
        { id: 3, letter: "I", points: 1, x: 2, y: 3 },
        { id: 4, letter: "P", points: 2, x: 3, y: 3 },
        { id: 5, letter: "M", points: 6, x: 4, y: 3 },
        { id: 6, letter: "O", points: 1, x: 5, y: 3 },
        { id: 7, letter: "V", points: 8, x: 6, y: 3 },
        { id: 8, letter: "E", points: 2, x: 7, y: 3 },
        { id: 9, letter: "E", points: 2, x: 8, y: 3 },
        { id: 10, letter: "E", points: 2, x: 9, y: 3 }
      ]
    };
  }

  // generate a random word of length n
  getRandomWord = (arr, n) => {
    let randomWord = [];
    for (let i = 0; i < n; i++) {
      let randomLetter = this.shuffleArray(arr)[0]
      randomWord.push(randomLetter);
      let temp = this.state.tiles;
      temp[i].letter = randomLetter; 
      this.setState({tiles: temp})
    }
    randomWord = randomWord.join("");
    return randomWord;
  };

  generateRandomWord = () => {
    let word = this.getRandomWord(this.state.alphabet, 10);
    this.save(word);
  };

  generateMatches = () => {
    let allPosible = this.permute__of_all_size(this.state.randomWord);
    let result = [];
    for (let i = 0; i < allPosible.length; i++) {
      if (Dictionary.hasOwnProperty(allPosible[i])) {
        result.push(allPosible[i]);
      }
    }
    result = result.reverse();
    console.log(result);
    return result;
  };

  //setState
  save = data => {
    this.setState({ randomWord: data });
  };

  //Durstenfeld shuffle
  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  //Find all permutations of an array
  swap = (array, i, j) => {
    if (i !== j) {
      let swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }
  };

  permute_rec = (res, str, array) => {
    if (array.length === 0) {
      res.push(str);
    } else {
      for (let i = 0; i < array.length; i++) {
        this.swap(array, 0, i);
        this.permute_rec(res, str + array[0], array.slice(1));
        this.swap(array, 0, i);
      }
    }
  };

  permute = array => {
    let res = [];
    this.permute_rec(res, "", array);
    return res;
  };

  xpermute_rec = (res, sub, array) => {
    if (array.length === 0) {
      if (sub.length > 0) this.permute_rec(res, "", sub);
    } else {
      this.xpermute_rec(res, sub, array.slice(1));
      this.xpermute_rec(res, sub.concat(array[0]), array.slice(1));
    }
  };

  permute__of_all_size = array => {
    let res = [];
    this.xpermute_rec(res, [], array);
    return res;
  };

  updateTiles = (stateTiles) => {
    this.setState({ tiles: stateTiles });
  }

  componentWillMount() {

  }

  render() {
    return (
      <MyContext.Provider
        value={{
          getRandomWord: this.getRandomWord,
          generateRandomWord: this.generateRandomWord,
          generateMatches: this.generateMatches,
          state: this.state,
          updateTiles: this.updateTiles
        }}
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
                <h1 className="App-title">WordFlippr</h1>
              </header>
              <p className="App-intro">{context.state.randomWord}</p>
              <button onClick={context.generateRandomWord}>
                Generate Word
              </button>
              <button onClick={context.generateMatches}>Generate Matchs</button>
              <Scrabble tiles={context.state.tiles} updateTiles={context.updateTiles}/>
            </div>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

export default App;

// export context
export { MyContext };
