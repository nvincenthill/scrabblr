import React from "react";
import moment from "moment";
import { times } from "lodash";
import classNames from "classnames";
import HTML5Backend from "react-dnd-html5-backend";
import { DragSource, DropTarget, DragDropContext } from "react-dnd";
import FlipMove from "react-flip-move";
import helpers from "./helpers.js";
import { MyContext } from "./App.js";

const squareTarget = {
  drop(props, monitor) {
    props.onDrop(props, monitor.getItem());
  }
};

@DropTarget("tile", squareTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
class BoardSquare extends React.Component {
  renderSquare() {
    const classes = classNames({
      "board-square": true,
      "dragged-over": this.props.isOver
    });

    return <div className={classes} />;
  }
  render() {
    if (this.props.tile) {
      // If this square already has a tile in it, we don't want to allow drops.
      return this.renderSquare();
    } else {
      return this.props.connectDropTarget(this.renderSquare());
    }
  }
}

export default BoardSquare;