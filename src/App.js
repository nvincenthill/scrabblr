import React from "react";

//data
import Dictionary from "./Dictionary.json";
import InitialState from "./InitialState.json";

//internal components
import GameArea from "./GameArea.js";
import Scoreboard from "./Scoreboard.js";
import Footer from "./Footer";
import Header from "./Header";
import ResultsModal from "./ResultsModal";

//external components
import GithubCorner from "react-github-corner";

// Make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  // set tiles at starting position
  resetTilePositions = () => {
    for (let i = 0; i < this.state.tiles.length; i++) {
      let temp = this.state.tiles;
      temp[i].x = 1 + i;
      temp[i].y = 6;
      this.setState({ tiles: temp });
    }
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
    this.setState({ matches: results, remainingMatches: results });
    return results;
  };

  //start gameloop
  startGameLoop = () => {
    let word = this.getWord();
    this.resetTilePositions();
    this.generateMatches(word);
    this.setState({ isInGameLoop: true, foundWords: [], score: 0 });
    this.playSound("woodshuffle");
  };

  //get a word
  getWord = () => {
    let wordLength = 8;
    let word = this.getWordFromDictionary(wordLength);
    console.log(word);
    word = this.shuffleArray(word.split("")).join("");
    console.log(word);
    this.setState({ randomWord: word });
    for (let i = 0; i < word.length; i++) {
      let temp = this.state.tiles;
      temp[i].letter = word[i].toUpperCase();
      this.setState({ tiles: temp });
    }
    return word;
  };

  //end gameloop
  endGameLoop = () => {
    this.setState({
      isInGameLoop: false,
      tiles: this.state.startingTiles
    });
    this.playSound("wood1");
    this.handleShowResultsModal();
  };

  //check if word is a valid english word
  validateWord = word => {
    let result = false;

    if (Dictionary.hasOwnProperty(word)) {
      result = true;
    }

    this.handleValidityCheck(result, word);
  };

  //check if word is a valid english word
  handleValidityCheck = (isValid, word) => {
    if (isValid && !this.state.foundWords.includes(word)) {
      this.scoreWord(word);
      this.addWordToFoundWords(word);
      this.playSound("door");
    }
  };

  //add score of word to total score
  incrementScore = scoreOfWord => {
    let newScore = this.state.score + scoreOfWord;
    this.setState({ score: newScore });
    this.checkVictoryConditions();
  };

  checkVictoryConditions = () => {
    if (this.state.remainingMatches.length === 0) {
      this.endGameLoop();
    } else {
      return;
    }
  };

  // add a word to FoundWords
  addWordToFoundWords = word => {
    let newFoundWords = this.state.foundWords;
    newFoundWords.push(word);
    this.setState({ foundWords: newFoundWords });
    this.removeFromRemaining(word);
  };

  // remove word from remaining matches

  removeFromRemaining = word => {
    let array = this.state.remainingMatches;
    let index = array.indexOf(word);
    if (index > -1) {
      array.splice(index, 1);
      this.setState({ remainingMatches: array });
    }
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

  // get random word from dictionary with length of n
  getWordFromDictionary = lengthOfWord => {
    let words = Object.keys(Dictionary);
    let arrayOfNLengthStrings = words.filter(
      word => word.length === lengthOfWord
    );
    let shuffledArray = this.shuffleArray(arrayOfNLengthStrings);
    return shuffledArray[0];
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

  //show results modal
  handleShowResultsModal = () => {
    this.setState({ isModalDisplayed: true });
  };

  //close results modal
  handleCloseResultsModal = () => {
    this.setState({ isModalDisplayed: false });
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
    this.playSound("wood3");
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
          generateMatches: this.generateMatches,
          state: this.state,
          updateTiles: this.updateTiles,
          resetTiles: this.resetTiles,
          validateWord: this.validateWord,
          startGameloop: this.startGameLoop,
          checkForWords: this.checkForWords,
          endGameLoop: this.endGameLoop,
          handleCloseResultsModal: this.handleCloseResultsModal
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
                size={100}
              />
              <div className="App">
                <Header />
                <GameArea />
                <Scoreboard />
                <Footer />
              </div>
              <ResultsModal
                handleCloseResultsModal={context.handleCloseResultsModal}
              />
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
