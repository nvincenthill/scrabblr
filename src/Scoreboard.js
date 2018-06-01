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
              <h2 className="score">Score : {context.state.score}</h2>
              <h2 className="timer">Time : {context.state.time}</h2>

              <p className="scoreboard-instructions">
                This will be a brief summary of the main gameloop,
                instructions/directions, in a cute branded message!
              </p>
              {!context.state.inGameLoop ? <button className="scoreboard-start-button" onClick={context.startGameloop}>
                START
              </button> : null}
              
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Scoreboard;
