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
            <h2 className="timer">Time : {context.state.timer}</h2>
            <p className="words">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
              nemo, ex quisquam voluptatum, molestiae maiores architecto. Ea,
              cumque, est. Suscipit architecto pariatur facere repellendus
              dolore nisi odit, atque est ex. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
              nemo, ex quisquam voluptatum, molestiae maiores architecto. Ea,
              cumque, est. Suscipit architecto pariatur facere repellendus
              dolore nisi odit, atque est ex. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            </p>
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Scoreboard;
