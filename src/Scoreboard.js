import React from "react";
import { MyContext } from "./App.js";

class Scoreboard extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="scoreboard-wrapper">
            <div className="scoreboard">
              <h2 className="scoreboard-score">Score : {context.state.score}</h2>

              {context.state.isInGameLoop ? (
                <h2 className="scoreboard-found-words">
                  Words Found : {context.state.foundWords.length}
                </h2>
              ) : null}

              {context.state.isInGameLoop ? (
                <h2 className="scoreboard-words-left">
                  Words Left : {context.state.matches.length - context.state.foundWords.length}
                </h2>
              ) : null}

              {/* <h2 className="timer">Time : {context.state.time}</h2> */}

              <p className="scoreboard-instructions">
                This will be a brief summary of the main gameloop,
                instructions/directions, in a cute branded message!
              </p>
              {!context.state.isInGameLoop ? (
                <button
                  className="scoreboard-start-button"
                  onClick={context.startGameloop}
                >
                  START
                </button>
              ) : null}
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Scoreboard;
