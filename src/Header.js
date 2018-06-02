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
            <h1 className="App-title animated fadeInLeft">{context.state.title}</h1>
            <div className="fake-ad"> YOUR AD HERE </div>
          </header>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Header;
