import React from "react";
import { MyContext } from "./App.js";

class Header extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <header className="App-header">
            <h1 className="App-title">{context.state.title}</h1>
            <div className="button-container">
              <button onClick={context.generateRandomWord}>
                Generate Word
              </button>
              <button onClick={context.validateWords}>Validate</button>
              <button onClick={context.generateMatches}>
                Generate Matches
              </button>
              <button onClick={context.resetTiles}>Reset</button>
            </div>
          </header>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Header;
