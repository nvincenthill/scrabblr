import React from "react";
import { MyContext } from "./App.js";

class Sidebar extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="sidebar">
            <button onClick={context.generateRandomWord}>Generate Word</button>
            <button onClick={context.validateWords}>Validate</button>
            <h2 className="Score">Score: {context.state.score}</h2>
            <button onClick={context.generateMatches}>Generate Matches</button>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Sidebar;
