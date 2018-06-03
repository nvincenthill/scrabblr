import React from "react";

//internal components
import BoardSquare from "./BoardSquare.js";
import Tile from "./Tile.js";

import moment from "moment";
import { times } from "lodash";
import classNames from "classnames";
import HTML5Backend from "react-dnd-html5-backend";
import { DragSource, DropTarget, DragDropContext } from "react-dnd";
import FlipMove from "react-flip-move";
import helpers from "./helpers.js";
import { MyContext } from "./App.js";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 7;

@DragDropContext(HTML5Backend)
class Scrabble extends React.Component {
  constructor() {
    super();
    this.state = {

    };

    this.updateDroppedTilePosition = this.updateDroppedTilePosition.bind(this);
  }

  updateDroppedTilePosition({ x, y }, tile) {
    // Create a copy of the state, find the newly-dropped tile.
    let stateTiles = this.props.tiles.slice();
    const index = stateTiles.findIndex(stateTile => stateTile.id === tile.id);
    // Set it to a new copy of the tile, but with the new coords
    stateTiles[index] = { ...tile, x, y };
    this.props.updateTiles(stateTiles);
    // this.setState({justDropped: true})
    if (this.props.isInGameLoop) {
      this.props.checkForWords();
    }
  }

  renderTiles() {
    return this.props.tiles.map((tile, index) => {
      return (
        <Tile justDropped={this.state.justDropped} key={index} onDrop={this.updateDroppedTilePosition} scoreHash={this.props.scoreHash}{...tile} />
      );
    });
  }

  renderBoardSquares() {
    // Create a 2D array to represent the board
    // Array#matrix is a monkeypatched, custom method >:)
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);
    return matrix.map((row, rowIndex) =>
      row.map(index => {
        return (
          <BoardSquare
            x={index}
            y={rowIndex}
            onDrop={this.updateDroppedTilePosition}
            key={index}
            isOver={this.props.isOver}
          />
        );
      })
    );
  }

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div id="scrabble">
            <div className="board-border">
              <div className="board">
                <FlipMove duration={200} staggerDelayBy={150}>
                  {this.renderTiles()}
                </FlipMove>
                {this.renderBoardSquares()}
              </div>
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Scrabble;
