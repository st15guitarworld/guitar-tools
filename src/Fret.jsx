import React, { Component } from "react";

export default class Fret extends Component {
  constructor(props) {
    super(props);
    this.onFretClick = this.onFretClick.bind(this);
    this.generateNoteBubble = this.generateNoteBubble.bind(this);
    this.drawX = this.drawX.bind(this);
  }
  drawX(){
    if(this.props.fret === 0 && !this.props.stringIsSet){
      return (<span id="x">X</span>)
    }
    return null;
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
      <td className="fret">
        {this.drawX()}
        <span className="fretArea" onClick={event => this.onFretClick(event)} />
        {this.generateNoteBubble()}
      </td>
    );
  }
}
