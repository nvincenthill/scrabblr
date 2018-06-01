import React, { Component, PropTypes } from "react";
import "./App.css";
import Dictionary from "./Dictionary.json";
import GameArea from "./GameArea.js";
import Scoreboard from "./Scoreboard.js";
import Footer from "./Footer";
import Header from "./Header";

import helpers from "./helpers.js";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "example",
      inGameLoop: false,
      title: "NICK'S WORD FLIPPR",
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
        { id: 1, letter: "W", x: 3, y: 4 },
        { id: 2, letter: "O", x: 4, y: 4 },
        { id: 3, letter: "R", x: 5, y: 4 },
        { id: 4, letter: "D", x: 6, y: 4 },
        { id: 5, letter: "F", x: 2, y: 5 },
        { id: 6, letter: "L", x: 3, y: 5 },
        { id: 7, letter: "I", x: 4, y: 5 },
        { id: 8, letter: "P", x: 5, y: 5 },
        { id: 9, letter: "P", x: 6, y: 5 },
        { id: 10, letter: "R", x: 7, y: 5 }
      ],
      startingTiles: [
        { id: 1, letter: "W", x: 3, y: 4 },
        { id: 2, letter: "O", x: 4, y: 4 },
        { id: 3, letter: "R", x: 5, y: 4 },
        { id: 4, letter: "D", x: 6, y: 4 },
        { id: 5, letter: "F", x: 2, y: 5 },
        { id: 6, letter: "L", x: 3, y: 5 },
        { id: 7, letter: "I", x: 4, y: 5 },
        { id: 8, letter: "P", x: 5, y: 5 },
        { id: 9, letter: "P", x: 6, y: 5 },
        { id: 10, letter: "R", x: 7, y: 5 }
      ],
      score: 0,
      time: 10,
      timer: null,
      scoreHash: {
        a: { points: 1, weight: 9 },
        b: { points: 3, weight: 2 },
        c: { points: 3, weight: 2 },
        d: { points: 2, weight: 4 },
        e: { points: 1, weight: 12 },
        f: { points: 4, weight: 2 },
        g: { points: 2, weight: 3 },
        h: { points: 4, weight: 2 },
        i: { points: 1, weight: 9 },
        j: { points: 8, weight: 1 },
        k: { points: 5, weight: 1 },
        l: { points: 1, weight: 4 },
        m: { points: 3, weight: 2 },
        n: { points: 1, weight: 6 },
        o: { points: 1, weight: 8 },
        p: { points: 3, weight: 2 },
        q: { points: 10, weight: 1 },
        r: { points: 1, weight: 6 },
        s: { points: 1, weight: 4 },
        t: { points: 1, weight: 6 },
        u: { points: 1, weight: 4 },
        v: { points: 4, weight: 2 },
        w: { points: 4, weight: 2 },
        x: { points: 8, weight: 1 },
        y: { points: 4, weight: 2 },
        z: { points: 10, weight: 1 }
      }
    };
  }

  // generate a random word of length n
  getRandomWord = (arr, n) => {
    let randomWord = [];
    for (let i = 0; i < n; i++) {
      let randomLetter = this.shuffleArray(arr)[0];
      randomWord.push(randomLetter);
      let temp = this.state.tiles;
      temp[i].letter = randomLetter;
      this.setState({ tiles: temp });
    }
    randomWord = randomWord.join("");
    return randomWord;
  };

  generateRandomWord = () => {
    let word = this.getRandomWord(this.state.alphabet, 10);
    this.save(word);
  };

  generateMatches = () => {
    let allPosible = this.permute__of_all_size(
      this.state.randomWord.toLowerCase()
    );
    let result = [];
    for (let i = 0; i < allPosible.length; i++) {
      if (Dictionary.hasOwnProperty(allPosible[i])) {
        result.push(allPosible[i]);
      }
    }
    result = result.sort((a, b) => b.length - a.length);
    console.log(result);
    return result;
  };

  //setState
  save = data => {
    this.setState({ randomWord: data });
  };

  //start timer
  startTimer = () => {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  };

  //tick timer
  tick = () => {

    this.setState({
      time: this.state.time - 1
    });
    if (this.state.time === 0) {
      this.endGameLoop();
      clearInterval(this.state.timer);
    }
  };

  //start gameloop
  startGameLoop = () => {
    this.startTimer();
    this.generateRandomWord();
  };

  //start gameloop
  endGameLoop = () => {
    alert(`You scored ${this.state.score}`)
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

  updateTiles = stateTiles => {
    this.setState({ tiles: stateTiles });
  };

  resetTiles = () => {
    this.setState({ tiles: this.state.startingTiles });
  };

  validateWords = () => {
    console.log("checking");
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
          validateWords: this.validateWords,
          startGameloop: this.startGameLoop,
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
              <Header />
              <GameArea />
              <Scoreboard />
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
