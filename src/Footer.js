import React from "react";
import { MyContext } from "./App.js";

class Footer extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="footer">
            {/* <p id="footer-name" className="animated fadeInUp">
              Created in 2018 by {" "}
              <a href="http://nvincenthill.herokuapp.com/">
                Nicholas Vincent-Hill
              </a>
            </p> */}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Footer;
