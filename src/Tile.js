import React from "react";
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
const SQUARE_SIZE = 56;
const TILE_OFFSET = 3;

const tileSource = {
  beginDrag(props) {
    return props;
  }
};

const tileTarget = {
  drop(props, monitor) {
    const tile1 = props;
    const tile2 = monitor.getItem();

    props.onDrop(tile1, tile2);
    props.onDrop(tile2, tile1);
  }
};

@DropTarget("tile", tileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
@DragSource("tile", tileSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Tile extends React.Component {
  render() {
    const {
      connectDropTarget,
      connectDragSource,
      isDragging,
      letter,
      x,
      y
    } = this.props;

    const styles = {
      left: x * SQUARE_SIZE - TILE_OFFSET,
      top: y * SQUARE_SIZE - TILE_OFFSET,
      zIndex: `${x + 1}${y + 1}`,
      opacity: isDragging ? 0.5 : 1
    };

    const classes = classNames({
      "tile": true,
      "tile animated infinite bounce": this.props.justDropped,
    });

    return connectDropTarget(
      connectDragSource(
        <div className={classes} style={styles}>
          <span className="tile-letter">{letter}</span>
          <span className="tile-points">{this.props.scoreHash[letter.toLowerCase()].points ? this.props.scoreHash[letter.toLowerCase()].points : 0}</span>
        </div>
      )
    );
  }
}

export default Tile;