import React from "react";

//external components
import { Modal, Button } from "react-bootstrap";

//context from provider
import { MyContext } from "./App.js";

class ResultsModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.handleCloseResultsModal();
  }

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div>
            <Modal
              show={context.state.isModalDisplayed}
              onHide={this.handleClose}
              className="resultsmodal"
            >
              <Modal.Header>
                <Modal.Title className="resultsmodal-title">
                  RESULTS
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="resultsmodal-body">
                <div className="resultsmodal-scoreboard">
                  <div>
                    <h4 className="resultsmodal-subheader">FOUND</h4>
                    <p className="resultsmodal-finalscore">
                      {context.state.foundWords.length}
                    </p>
                  </div>
                  <div>
                    <h4 className="resultsmodal-subheader">FINAL SCORE</h4>
                    <p className="resultsmodal-finalscore">
                      {context.state.score}
                    </p>
                  </div>
                  <div>
                    <h4 className="resultsmodal-subheader">MISSED</h4>
                    <p className="resultsmodal-finalscore">
                      {context.state.remainingMatches.length}
                    </p>
                  </div>
                </div>

                <hr />
                <h4 className="resultsmodal-subheader">
                  WORDS FOUND |{" "}
                  {(
                    (context.state.foundWords.length /
                      (context.state.foundWords.length +
                        context.state.remainingMatches.length)) *
                    100
                  ).toFixed(2)}%
                </h4>
                <p className="resultsmodal-wordsfound">
                  {context.state.foundWords.length === 0
                    ? "When God rained intelligence all over his creations, you probably were holding an umbrella"
                    : context.state.foundWords.join(", ")}
                </p>

                <hr />
                <h4 className="resultsmodal-subheader">
                  WORDS MISSED |{" "}
                  {(
                    (context.state.remainingMatches.length /
                      (context.state.foundWords.length +
                        context.state.remainingMatches.length)) *
                    100
                  ).toFixed(2)}%
                </h4>
                <p className="resultsmodal-remainingwords">
                  {context.state.remainingMatches.length === 0
                    ? "You found all the possible words!"
                    : context.state.remainingMatches.join(", ")}
                </p>
              </Modal.Body>
              <Modal.Footer className="resultsmodal-footer">
                <Button
                  id="resultsmodal-footer-button"
                  onClick={this.handleClose}
                >
                  X
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default ResultsModal;
