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
      isInGameLoop: false,
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
        { id: 1, letter: "S", x: 1, y: 3, class: "tile" },
        { id: 2, letter: "C", x: 2, y: 3, class: "tile" },
        { id: 3, letter: "R", x: 3, y: 3, class: "tile" },
        { id: 4, letter: "A", x: 4, y: 3, class: "tile" },
        { id: 5, letter: "B", x: 5, y: 3, class: "tile" },
        { id: 6, letter: "B", x: 6, y: 3, class: "tile" },
        { id: 7, letter: "L", x: 7, y: 3, class: "tile" },
        { id: 8, letter: "R", x: 8, y: 3, class: "tile" }
      ],
      startingTiles: [
        { id: 1, letter: "S", x: 1, y: 3, class: "tile" },
        { id: 2, letter: "C", x: 2, y: 3, class: "tile" },
        { id: 3, letter: "R", x: 3, y: 3, class: "tile" },
        { id: 4, letter: "A", x: 4, y: 3, class: "tile" },
        { id: 5, letter: "B", x: 5, y: 3, class: "tile" },
        { id: 6, letter: "B", x: 6, y: 3, class: "tile" },
        { id: 7, letter: "L", x: 7, y: 3, class: "tile" },
        { id: 8, letter: "R", x: 8, y: 3, class: "tile" }
      ],
      score: 0,
      time: 10,
      matches: [],
      foundWords: [],
      timer: null,
      wordsToCheck: [],
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
      temp[i].x = 1 + i;
      temp[i].y = 6;
      this.setState({ tiles: temp });
    }
  };

  //
  generateRandomWord = () => {
    let word = this.getRandomWord(this.state.alphabet, 8);
    this.save(word);
    this.generateMatches(word);
  };

  //find all valid English words for a string of characters
  generateMatches = string => {
    let allPosible = this.permute__of_all_size(string.toLowerCase());
    let results = [];
    for (let i = 0; i < allPosible.length; i++) {
      if (Dictionary.hasOwnProperty(allPosible[i])) {
        results.push(allPosible[i]);
      }
    }
    results = [...new Set(results)].sort((a, b) => b.length - a.length);
    this.setState({ matches: results });
    return results;
  };

  //setState
  save = data => {
    this.setState({ randomWord: data });
  };

  //start timer
  startTimer = () => {
    // let timer = setInterval(this.tick, 1000);
    // this.setState({ timer });
  };

  //tick timer
  tick = () => {
    // this.setState({
    //   time: this.state.time - 1
    // });
    // if (this.state.time === 0) {
    //   this.endGameLoop();
    //   clearInterval(this.state.timer);
    // }
  };

  //start gameloop
  startGameLoop = () => {
    // this.startTimer();
    this.generateRandomWord();
    this.resetTilePositions();
    this.setState({ isInGameLoop: true });
    this.playSound("shuffle");
  };

  //end gameloop
  endGameLoop = () => {
    alert(`You scored ${this.state.score}`);
  };

  //check if word is a valid english word
  validateWord = word => {
    console.log(`Validating ${word}`);
    let result = false;

    if (Dictionary.hasOwnProperty(word)) {
      result = true;
    }

    this.handleValidityCheck(result, word);
  };

  //check if word is a valid english word
  handleValidityCheck = (isValid, word) => {
    console.log(`The word is ${isValid ? "valid" : "invalid"}`);
    if (isValid && !this.state.foundWords.includes(word)) {
      this.scoreWord(word);
      this.addWordToFoundWords(word);
      this.playSound("shuffle");
      this.resetTilePositions();
    }
  };

  //add score of word to total score
  incrementScore = scoreOfWord => {
    let newScore = this.state.score + scoreOfWord;
    this.setState({ score: newScore });
  };

  // add a word to FoundWords
  addWordToFoundWords = word => {
    let newFoundWords = this.state.foundWords;
    newFoundWords.push(word);
    this.setState({ foundWords: newFoundWords });
  };

  //score word
  scoreWord = word => {
    let letters = word.split("");
    let result = 0;
    for (let i = 0; i < letters.length; i++) {
      result += this.state.scoreHash[letters[i]].points;
    }
    this.incrementScore(result);
  };

  //check for words in matrix
  checkForWords = () => {
    let capturedTiles = [];
    let tiles = this.state.tiles;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].y === 3) {
        capturedTiles.push(tiles[i]);
      }
    }

    let result = "";

    //TODO handle spaces on submission line

    // sort by x position in matrix
    capturedTiles.sort((a, b) => {
      return a.x > b.x ? 1 : b.x > a.x ? -1 : 0;
    });
    for (let j = 0; j < capturedTiles.length; j++) {
      result += capturedTiles[j].letter.toLowerCase();
    }
    this.validateWord(result);
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
    this.playSound("click");
  };

  // play a click sound
  playSound = sound => {
    var audio = new Audio(`${sound}.mp3`);
    let playPromise = audio.play();

    playPromise.then(function() {}).catch(function(error) {
      console.log(error);
    });
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
          startGameloop: this.startGameLoop,
          checkForWords: this.checkForWords
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
