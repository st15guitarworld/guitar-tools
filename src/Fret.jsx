import React, { Component } from "react";
export default class Fret extends Component {
  constructor(props) {
    super(props);
    this.onFretClick = this.onFretClick.bind(this);
    this.generateNoteBubble = this.generateNoteBubble.bind(this);
  }
  generateNoteBubble() {
    if (this.props.isActiveFret) {
      return (
        <span className="note-bubble">
          {this.props.note}
        </span>
      );
    }
    return null;
  }
  onFretClick(event) {
    this.props.noteSelected(this.props.string, this.props.fret);
  }
  render() {
    return (
      <td>
        <span className="fretArea" onClick={event => this.onFretClick(event)} />
        {this.generateNoteBubble()}
      </td>
    );
  }
}
