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
          <header className="app-header">
            <div className="app-title-container">
              <p className={context.state.titleClass}>{context.state.title}</p>
            </div>
          </header>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Header;
