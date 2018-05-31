import React, { Component, PropTypes } from "react";
import "./App.css";
import Dictionary from "./Dictionary.json";
import GameArea from "./GameArea.js";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer";

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
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      tiles: [
        { id: 1, letter: "W", points: 4, x: 3, y: 4 },
        { id: 2, letter: "O", points: 2, x: 4, y: 4 },
        { id: 3, letter: "R", points: 1, x: 5, y: 4 },
        { id: 4, letter: "D", points: 2, x: 6, y: 4 },
        { id: 5, letter: "F", points: 6, x: 2, y: 5 },
        { id: 6, letter: "L", points: 1, x: 3, y: 5 },
        { id: 7, letter: "I", points: 8, x: 4, y: 5 },
        { id: 8, letter: "P", points: 2, x: 5, y: 5 },
        { id: 9, letter: "P", points: 2, x: 6, y: 5 },
        { id: 10, letter: "R", points: 2, x: 7, y: 5 }
      ],
      startingTiles: [
        { id: 1, letter: "W", points: 4, x: 3, y: 4 },
        { id: 2, letter: "O", points: 2, x: 4, y: 4 },
        { id: 3, letter: "R", points: 1, x: 5, y: 4 },
        { id: 4, letter: "D", points: 2, x: 6, y: 4 },
        { id: 5, letter: "F", points: 6, x: 2, y: 5 },
        { id: 6, letter: "L", points: 1, x: 3, y: 5 },
        { id: 7, letter: "I", points: 8, x: 4, y: 5 },
        { id: 8, letter: "P", points: 2, x: 5, y: 5 },
        { id: 9, letter: "P", points: 2, x: 6, y: 5 },
        { id: 10, letter: "R", points: 2, x: 7, y: 5 }
      ],
    score: 0,
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
  };

  resetTiles = () => {
    this.setState({ tiles: this.state.startingTiles });
  }

  validateWords = () => {
    console.log('checking');
  };

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
          updateTiles: this.updateTiles,
          resetTiles: this.resetTiles,
          validateWords: this.validateWords
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
                <h1 className="App-title">Word Flippr</h1>
              </header>
                <GameArea />
                <Sidebar />
              <Footer />
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
