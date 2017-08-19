import React, { Component } from "react";
import Constants from './Constants';

export default class Fret extends Component {
  constructor(props) {
    super(props);
    this.onFretClick = this.onFretClick.bind(this);
    this.generateNoteBubble = this.generateNoteBubble.bind(this);
    this.drawX = this.drawX.bind(this);
    this.drawFretNumber = this.drawFretNumber.bind(this);
    this.drawFretAccent = this.drawFretAccent.bind(this);
  }
  drawFretNumber(){
    if (this.props.string == 6) {
      return <i className="fret-number">{this.props.fret}</i>
    }
  }
drawFretAccent(){
  let fretAccent = <div className="fret-accent circle"></div>
  if(this.props.fret == 12 && (this.props.string == 3 || this.props.string == 5)) {
  return fretAccent;
  }

  if(Constants.fretsWithAccents.indexOf(this.props.fret) > -1 && this.props.string == 4){
    return fretAccent;
  }
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
        {this.drawFretNumber()}
        {this.drawFretAccent()}
        {this.drawX()}
        <span className="fretArea" onClick={event => this.onFretClick(event)} />
        {this.generateNoteBubble()}
      </td>
    );
  }
}
