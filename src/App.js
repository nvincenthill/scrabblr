import React from "react";

//data
import Dictionary from "./Dictionary.json";

//internal components
import GameArea from "./GameArea.js";
import Scoreboard from "./Scoreboard.js";
import Footer from "./Footer";
import Header from "./Header";

//external components
import GithubCorner from "react-github-corner";

// Make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "example",
      inGameLoop: false,
      title: "SCRABBLR",
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
      startingBlock: ["C", "O", "D", "E", "B", "E", "T", "T", "E", "R"],
      tiles: [
        { id: 1, letter: "C", x: 3, y: 2, class: "tile" },
        { id: 2, letter: "O", x: 4, y: 2, class: "tile" },
        { id: 3, letter: "D", x: 5, y: 2, class: "tile" },
        { id: 4, letter: "E", x: 6, y: 2, class: "tile" },
        { id: 5, letter: "B", x: 2, y: 3, class: "tile" },
        { id: 6, letter: "E", x: 3, y: 3, class: "tile" },
        { id: 7, letter: "T", x: 4, y: 3, class: "tile" },
        { id: 8, letter: "T", x: 5, y: 3, class: "tile" },
        { id: 9, letter: "E", x: 6, y: 3, class: "tile" },
        { id: 10, letter: "R", x: 7, y: 3, class: "tile" }
      ],
      startingTiles: [
        { id: 1, letter: "C", x: 3, y: 2, class: "tile" },
        { id: 2, letter: "O", x: 4, y: 2, class: "tile" },
        { id: 3, letter: "D", x: 5, y: 2, class: "tile" },
        { id: 4, letter: "E", x: 6, y: 2, class: "tile" },
        { id: 5, letter: "B", x: 2, y: 3, class: "tile" },
        { id: 6, letter: "E", x: 3, y: 3, class: "tile" },
        { id: 7, letter: "T", x: 4, y: 3, class: "tile" },
        { id: 8, letter: "T", x: 5, y: 3, class: "tile" },
        { id: 9, letter: "E", x: 6, y: 3, class: "tile" },
        { id: 10, letter: "R", x: 7, y: 3, class: "tile" }
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

  // set tiles at starting position
  resetTilePositions = () => {
    for (let i = 0; i < this.state.tiles.length; i++) {
      let temp = this.state.tiles;
      temp[i].x = 0 + i;
      temp[i].y = 6;
      this.setState({ tiles: temp });
    }
  };

  //
  generateRandomWord = () => {
    let word = this.getRandomWord(this.state.alphabet, 10);
    this.save(word);
  };

  //find all valid English words for a string of characters
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
    this.setState({ timer });
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
    this.resetTilePositions();
    this.setState({ inGameLoop: true });
  };

  //end gameloop
  endGameLoop = () => {
    alert(`You scored ${this.state.score}`);
  };

  //check if word is a valid english word
  validateWord = () => {
    console.log("Validating Word");
  };

  //check for words in matrix
  checkForWords = () => {
    console.log("Checking for words");
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

  // update tile position
  updateTiles = stateTiles => {
    this.setState({ tiles: stateTiles });
    console.log(this.state.tiles);
  };

  resetTiles = () => {
    this.setState({ tiles: this.state.startingTiles });
  };

  componentWillMount() {}

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
          validateWord: this.validateWord,
          startGameloop: this.startGameLoop
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <GithubCorner
                href="https://github.com/nvincenthill/word-flipper"
                octoColor="#222"
                bannerColor="#ffd959"
                className="corner"
              />
              <div className="App">
                <Header />
                <GameArea />
                <Scoreboard />
                <Footer />
              </div>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

export default App;

// export context
export { MyContext };
